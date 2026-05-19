import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const A4_W = 794;
const A4_H = 1123;

function Toolbar() {
  const capture = async () => {
    const element = document.getElementById("print-area");
    await document.fonts.ready;

    const clone = element.cloneNode(true);
    Object.assign(clone.style, {
      position: "fixed",
      top: "0",
      left: "-9999px",
      width: `${A4_W}px`,
      height: `${A4_H}px`,
      overflow: "hidden",
      boxShadow: "none",
      borderRadius: "0",
      transform: "none",
    });
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: A4_W,
      height: A4_H,
      windowWidth: A4_W,
      windowHeight: A4_H,
    });

    document.body.removeChild(clone);
    return canvas;
  };

  const downloadPDF = async () => {
    const canvas = await capture();
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [A4_W, A4_H],
      hotfixes: ["px_scaling"],
    });
    pdf.addImage(imgData, "PNG", 0, 0, A4_W, A4_H);
    pdf.save("funeral-stickers.pdf");
  };

  const handlePrint = async () => {
    const canvas = await capture();
    const imgData = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
  <html><head><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { margin: 0; size: 794px 1123px; }
    html, body { margin: 0; padding: 0; width: 794px; height: 1123px; }
    html { -webkit-print-color-adjust: exact; zoom: 1; }
    img { width: 794px; height: 1123px; display: block; margin: 0; padding: 0; }
  </style></head>
      <body>
        <img src="${imgData}" />
        <script>window.onload = () => { window.print(); window.close(); }<\/script>
      </body></html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="mt-3">
      <h3 className="text-sm font-semibold text-[#3f3424] mb-3">
        รูปแบบการดาวน์โหลดและพิมพ์
      </h3>
      <div className="flex gap-3">
        <button
          onClick={downloadPDF}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Print
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
