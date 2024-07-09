import jsPDF from "jspdf";
import "jspdf-autotable";

const EgresosPDF = (dataTotalEgreso) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Zafra",
    "Total egreso",
  ];
  const tableRows = [];

  dataTotalEgreso.forEach((egreso) => {
    const egresoData = [
      egreso.zafra,
      egreso.total_egreso
    ];

    tableRows.push(egresoData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de egresos por zafra (${date})`, 14, 15);

  doc.save(`Reporteegresos_${date}.pdf`);
};

export default EgresosPDF;