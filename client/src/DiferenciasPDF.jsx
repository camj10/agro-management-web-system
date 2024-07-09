import jsPDF from "jspdf";
import "jspdf-autotable";
// import { format } from 'date-fns';

const DiferenciasPDF = (dataDiferencias) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Zafra",
    "Ingreso-Egreso",
  ];
  const tableRows = [];

  dataDiferencias.forEach((diferencia) => {
    const diferenciaData = [
      diferencia.zafra,
      diferencia.diferencia
    ];

    tableRows.push(diferenciaData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de diferencias por zafra (${date})`, 14, 15);

  doc.save(`ReporteDiferencias_${date}.pdf`);
};

export default DiferenciasPDF;