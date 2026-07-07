/*
  Server-side proxy to GitHub's GraphQL API using a personal access token
  (GITHUB_TOKEN env var, never exposed to the browser). Querying `viewer`
  with your own token surfaces private-repo contributions too, unlike the
  public contributions API the client falls back to when this route 501s.
*/
const QUERY = `
  query {
    viewer {
      followers { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return Response.json({ error: "GITHUB_TOKEN not configured" }, { status: 501 });
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return Response.json({ error: "GitHub API error" }, { status: 502 });
  }

  const json = await res.json();
  const viewer = json?.data?.viewer;
  if (!viewer) {
    return Response.json({ error: "no viewer data" }, { status: 502 });
  }

  const byDate: Record<string, number> = {};
  for (const week of viewer.contributionsCollection.contributionCalendar.weeks) {
    for (const day of week.contributionDays) {
      byDate[day.date] = day.contributionCount;
    }
  }

  return Response.json({
    byDate,
    repos: viewer.repositories.totalCount,
    followers: viewer.followers.totalCount,
  });
}
