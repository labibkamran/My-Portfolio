/*
  Shared 1200x630 social card used by the site Open Graph image.
*/
import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const ogSize = { width: 1200, height: 630 };

export function ogCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(900px 520px at 0% 0%, rgba(233,180,76,0.22), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(95,159,224,0.16), transparent 60%), #0f1216",
          color: "#ece9e3",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.06)",
              color: "#e9b44c",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            LK
          </div>
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#e9b44c" }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 70, fontWeight: 700, lineHeight: 1.08, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9aa1ac" }}>
          <span>{footer}</span>
          <span>{site.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    ogSize
  );
}
