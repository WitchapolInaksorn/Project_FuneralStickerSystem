import template from "../templates/funeral-template.png";

function StickerCanvas({ name, date }) {
  const total = 50;

  return (
    <div
      id="print-area"
      className="
    bg-white
    w-[794px]
    h-auto
    p-[20px]
    shadow-xl
    rounded-xl
    overflow-visible
  "
    >
      {/* GRID */}
      <div
        className="
          grid
          grid-cols-4
          gap-2
        "
      >
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className="
              relative

              w-[180px]
              h-[80px]

              overflow-hidden
            "
          >
            {/* TEMPLATE */}
            <img
              src={template}
              alt="sticker"
              className="
                w-full
                h-full
                object-fill
                block
              "
            />

            {/* TEXT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center font-charmonman">
              <p className="text-[13px] font-semibold">ที่ระลึกงานฌาปนกิจศพ</p>
              <h1 className="text-[13px] font-semibold">{name}</h1>
              <p className="text-[13px] font-semibold mb-[3px]">{date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StickerCanvas;
