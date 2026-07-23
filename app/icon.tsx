import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14212B",
          color: "#E8A33D",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        VA
      </div>
    ),
    { ...size }
  );
}
