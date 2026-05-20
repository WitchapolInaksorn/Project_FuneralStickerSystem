import template from "../templates/funeral-template.png";

function StickerCanvas({ name, date, pattern }) {
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
                justifyContent: "flex-start",
                textAlign: "center",
                paddingTop: `${cellH * 0.12}px`,
                paddingLeft: "4px",
                paddingRight: "4px",
                lineHeight: lineH,
              }}
              className="font-charmonman font-semibold"
            >
              <p style={{ fontSize, margin: 0 }}>ที่ระลึกงานฌาปนกิจศพ</p>
              <p style={{ fontSize, margin: 0 }}>{name}</p>
              <p style={{ fontSize, margin: 0 }}>{date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerCanvas;
