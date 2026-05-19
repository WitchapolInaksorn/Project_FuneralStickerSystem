import { useState } from "react";

import StickerCanvas from "../components/StickerCanvas";
import TextEditor from "../components/TextEditor";
import Toolbar from "../components/Toolbar";

function Home() {
  const [name, setName] = useState("ชื่อผู้เสียชีวิต");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [pattern, setPattern] = useState("5x15");

  const formatThaiDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#f7f4ee]">
      {/* HEADER */}
      <header
        className="
          border-b border-[#d8c8a5]
          bg-white/90
          backdrop-blur
          sticky top-0 z-50
        "
      >
        <div
          className="
            max-w-[1600px]
            mx-auto
            px-4 sm:px-6 lg:px-8
            py-4
            flex items-center gap-4
          "
        >
          <div className="shrink-0">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 24C14 24 5 17 5 10.5C5 7 8 5 11 6C11 6 12 3 14 3C16 3 17 6 17 6C20 5 23 7 23 10.5C23 17 14 24 14 24Z"
                stroke="#C9A84C"
                strokeWidth="1.2"
              />
              <path
                d="M14 24C14 24 9 15 9 10.5C9 8 11 7 13 8C13 8 13.5 5.5 14 5.5C14.5 5.5 15 8 15 8C17 7 19 8 19 10.5C19 15 14 24 14 24Z"
                stroke="#C9A84C"
                strokeWidth="1.2"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-[#3f3424]">
              ระบบสติ๊กเกอร์งานศพ
            </h1>

            <p className="text-sm text-[#8a7a60]">Funeral Sticker System</p>
          </div>
        </div>
      </header>

      {/* ORNAMENT */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center gap-3">
          <div className="flex-1 h-[1px] bg-[#d7c49c]" />

          <span className="text-[#c9a84c] text-sm">✦</span>

          <div className="flex-1 h-[1px] bg-[#d7c49c]" />
        </div>
      </div>

      {/* MAIN */}
      <main className="px-4 sm:px-6 lg:px-8 pb-10">
        <div
          className="
            max-w-[1600px]
            mx-auto

            grid
            grid-cols-1
            xl:grid-cols-[460px_minmax(0,1fr)]

            gap-6
            items-start
          "
        >
          {/* LEFT PANEL */}
          <div className="space-y-6">
            {/* STICKER INFO */}
            <div
              className="
                bg-white
                rounded-2xl
                border border-[#e7dcc7]
                shadow-sm
                p-5 sm:p-6
              "
            >
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#3f3424]">
                  ข้อมูลสติ๊กเกอร์
                </h2>

                <p className="text-sm text-[#8a7a60] mt-1">
                  กรอกข้อมูลที่ต้องการแสดงบนสติ๊กเกอร์
                </p>
              </div>

              <div className="space-y-4">
                <TextEditor
                  label="ชื่อ"
                  value={name}
                  onChange={setName}
                  placeholder="ชื่อผู้เสียชีวิต"
                />

                <TextEditor
                  label="วันที่"
                  type="date"
                  value={date}
                  onChange={setDate}
                />
              </div>
            </div>

            {/* TOOLBAR */}
            <div
              className="
                bg-white
                rounded-2xl
                border border-[#e7dcc7]
                shadow-sm
                p-5 sm:p-6
              "
            >
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-[#3f3424]">
                  ตัวเลือกเพิ่มเติม
                </h2>

                <p className="text-sm text-[#8a7a60] mt-1">
                  ปรับแต่งการแสดงผลเพิ่มเติม
                </p>
              </div>

              {/* PATTERN */}
              <div>
                <h3 className="text-sm font-semibold text-[#3f3424] mb-3">
                  รูปแบบการจัดเรียง
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "5 × 15", value: "5x15" },
                    { label: "4 × 15", value: "4x15" },
                    { label: "5 × 20", value: "5x20" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      onClick={() => setPattern(item.value)}
                      className={`
          rounded-xl
          border
          px-4
          py-3
          text-sm
          font-medium
          transition

          ${
            pattern === item.value
              ? "bg-[#c9a84c] text-white border-[#c9a84c]"
              : "bg-white text-[#5e513d] border-[#dccfb6] hover:bg-[#f8f3e8]"
          }
        `}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <Toolbar />
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div
            className="
              bg-white
              rounded-2xl
              border border-[#e7dcc7]
              shadow-sm

              p-4 sm:p-6

              overflow-hidden
            "
          >
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-[#3f3424]">
                ตัวอย่างสติ๊กเกอร์
              </h2>

              <p className="text-sm text-[#8a7a60] mt-1">
                แสดงตัวอย่างก่อนพิมพ์
              </p>
            </div>

            <div
              className="
                overflow-auto
                rounded-xl
                bg-[#f8f5ef]
                p-3 sm:p-5
              "
            >
              <div className="min-w-max flex justify-center">
                <StickerCanvas
                  name={name}
                  date={formatThaiDate(date)}
                  uploadedImage={uploadedImage}
                  pattern={pattern}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
