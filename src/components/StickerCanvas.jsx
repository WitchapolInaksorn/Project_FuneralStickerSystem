import template from "../templates/funeral-template.png";

function StickerCanvas({ name, date, pattern, mode, line1, line2 }) {
  const A4_W = 794;
  const A4_H = 1123;

  const patterns = {
    "5x15": { cols: 5, rows: 15, gapX: 0 },
    "4x15": { cols: 4, rows: 15, gapX: 0 },
    "5x20": { cols: 5, rows: 20, gapX: 0 },
  };

  const current = patterns[pattern];
  const cellW = Math.floor(A4_W / current.cols);
  const cellH = Math.floor(A4_H / current.rows);
  const total = current.cols * current.rows;

  const refArea = 198 * 74;
  const cellArea = cellW * cellH;
  const scale = Math.sqrt(cellArea / refArea);
  const fontSize = `${Math.min(13, Math.max(8, Math.round(12 * scale)))}px`;
  const lineH = cellH < 55 ? "1.1" : "1.25";

  const isTwoLine = mode === "twoLine";
  const lines = isTwoLine
    ? [line1, line2]
    : ["ที่ระลึกงานฌาปนกิจศพ", name, date];

  return (
    <div
      id="print-area"
      style={{
        width: `${A4_W}px`,
        height: `${A4_H}px`,
        background: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${current.cols}, 1fr)`,
          width: `${A4_W}px`,
          height: `${A4_H}px`,
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: `${cellW}px`,
              height: `${cellH}px`,
              position: "relative",
            }}
          >
            <img
              src={template}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: isTwoLine ? "center" : "flex-start",
                gap: isTwoLine ? `${cellH * 0.04}px` : 0,
                textAlign: "center",
                paddingTop: isTwoLine ? 0 : `${cellH * 0.12}px`,
                paddingBottom: isTwoLine ? `${cellH * 0.14}px` : 0,
                paddingLeft: "4px",
                paddingRight: "4px",
                lineHeight: isTwoLine ? "1.3" : lineH,
              }}
              className="font-charmonman font-semibold"
            >
              {lines.map((text, idx) => (
                <p key={idx} style={{ fontSize, margin: 0 }}>
                  {text}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerCanvas;
