import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Toolbar() {
  const capture = async () => {
    const element = document.getElementById("print-area");

    await document.fonts.ready;

    const clone = element.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = "0";
    clone.style.left = "-9999px";
    clone.style.width = "794px";
    clone.style.height = element.scrollHeight + "px";
    clone.style.overflow = "visible";
    clone.style.boxShadow = "none";
    clone.style.borderRadius = "0";
    clone.style.transform = "none";
    clone.style.zoom = "1";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 794,
      height: clone.scrollHeight,
      windowWidth: 794,
      windowHeight: clone.scrollHeight,
    });

    document.body.removeChild(clone);

    return canvas;
  };

  const downloadPDF = async () => {
    const element = document.getElementById("print-area");
    const h = element.scrollHeight;
    const canvas = await capture();
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [794, h],
      hotfixes: ["px_scaling"],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 794, h);
    pdf.save("funeral-stickers.pdf");
  };

  const handlePrint = async () => {
    const element = document.getElementById("print-area");
    const h = element.scrollHeight;
    const canvas = await capture();
    const imgData = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { width: 794px; }
            img { width: 794px; height: ${h}px; display: block; }
            @media print {
              @page { margin: 0; size: 794px ${h}px; }
            }
          </style>
        </head>
        <body>
          <img src="${imgData}" />
          <script>
            window.onload = () => { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex gap-3 mt-5">
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
  );
}

export default Toolbar;
