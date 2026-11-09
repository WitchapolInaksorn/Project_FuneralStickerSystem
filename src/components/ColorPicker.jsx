import "./ColorPicker.css";

const PRESETS = [
  { label: "ทอง", value: "#C9A84C" },
  { label: "ดำ", value: "#1a1a1a" },
  { label: "น้ำเงิน", value: "#1e3a8a" },
];

function ColorPicker({ value, onChange }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-[#3f3424] mb-3">สีกรอบ</h3>

      <div className="flex flex-wrap items-center gap-3">
        {PRESETS.map((item) => (
          <button
            key={item.value}
            type="button"
            title={item.label}
            onClick={() => onChange(item.value)}
            style={{ backgroundColor: item.value }}
            className={`w-9 h-9 rounded-full border-2 transition ${
              value === item.value
                ? "border-[#3f3424] scale-110"
                : "border-white shadow"
            }`}
          />
        ))}

        <input
          type="color"
          value={value || "#444444"}
          onChange={(e) => onChange(e.target.value)}
          className="color-input"
          title="เลือกสีเอง"
        />

        <button
          type="button"
          onClick={() => onChange(null)}
          className={`rounded-xl border px-3 py-2 text-sm transition ${
            value === null
              ? "bg-[#c9a84c] text-white border-[#c9a84c]"
              : "bg-white text-[#5e513d] border-[#dccfb6] hover:bg-[#f8f3e8]"
          }`}
        >
          สีปกติ
        </button>
      </div>
    </div>
  );
}

export default ColorPicker;
