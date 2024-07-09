import jsPDF from "jspdf";
import "jspdf-autotable";

const IngresosPDF = (dataTotal) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Zafra",
    "Total ingreso",
  ];
  const tableRows = [];

  dataTotal.forEach((ingreso) => {
    const ingresoData = [
      ingreso.zafra,
      ingreso.total_ingreso
    ];

    tableRows.push(ingresoData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de ingresos por zafra (${date})`, 14, 15);

  doc.save(`Reporte ingresos_${date}.pdf`);
};

export default IngresosPDF;