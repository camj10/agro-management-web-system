import jsPDF from "jspdf";
import "jspdf-autotable";

const StockSiloPDF = (data) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Empresa silo",
    "Stock"
  ];
  const tableRows = [];

  data.forEach((stockSilo) => {
    const stockSiloData = [
      stockSilo.empresa_silo,
      stockSilo.cantidad
    ];

    tableRows.push(stockSiloData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de stock silo (${date})`, 14, 15);

  doc.save(`ReporteStockSilo_${date}.pdf`);
};

export default StockSiloPDF;