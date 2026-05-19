function TextEditor({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          p-3
          outline-none
        "
      />
    </div>
  );
}

export default TextEditor;
