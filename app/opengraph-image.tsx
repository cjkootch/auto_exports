import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Vector Auto Exports — US vehicle sourcing & export. Houston-based.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Manifest-tag styled OG image: dark strip with mono code, notched tag on paper.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F5F0",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 1000,
            background: "#FFFFFF",
            border: "2px solid #14212B",
            clipPath:
              "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#14212B",
              color: "#F7F5F0",
              padding: "20px 40px",
              fontSize: 26,
              letterSpacing: 6,
            }}
          >
            <span>VAE · SOURCING MANIFEST</span>
            <span
              style={{
                background: "#E8A33D",
                color: "#14212B",
                padding: "6px 16px",
                fontSize: 22,
                letterSpacing: 3,
              }}
            >
              HOUSTON · US
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "50px 40px 60px",
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#14212B",
                textTransform: "uppercase",
                letterSpacing: 2,
                lineHeight: 1.05,
              }}
            >
              Vector Auto Exports
            </div>
            <div
              style={{
                marginTop: 28,
                fontSize: 30,
                color: "#22333F",
                lineHeight: 1.4,
              }}
            >
              US vehicle sourcing &amp; export. Container &amp; RoRo to the
              Caribbean, Gulf, and Caucasus.
            </div>
            <div
              style={{
                marginTop: 40,
                fontSize: 22,
                color: "#8C9BA5",
                letterSpacing: 4,
              }}
            >
              SEDANS · PICKUPS · VANS · REBUILDABLE UNITS
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
