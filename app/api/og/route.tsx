import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  // load local PNG from /public
  const iconBuffer = await fetch(
    new URL("../../../public/image.png", import.meta.url)
  ).then(res => res.arrayBuffer());

  // 🔥 convert to base64 data URL
  const iconBase64 = Buffer.from(iconBuffer).toString("base64");
  const iconSrc = `data:image/png;base64,${iconBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          // 🔥 pick ONE background
          background: "#131214",
          // background: "linear-gradient(to bottom right, #020617, #1e293b)",
        }}
      >
        <img
          src={iconSrc}
          width="260"
          height="260"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}