import jsPDF from "jspdf";
import "jspdf-autotable";

const EgresosDetPDF = (dataTotalEgreso) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Fecha",
    "Costo ha",
    "Cant ha",
    "Egreso",
    "Producto",
    "Parcela",
    "Zafra"
  ];
  const tableRows = [];

  dataTotalEgreso.forEach((egreso) => {
    const egresoData = [
      egreso.fecha,
      egreso.costo_por_hectarea,
      egreso.cantidad_hectareas,
      egreso.monto_egreso,
      egreso.producto,
      egreso.parcela,
      egreso.zafra
    ];

    tableRows.push(egresoData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte detallado de egresos(${date})`, 14, 15);

  doc.save(`ReporteDetalladoEgresos_${date}.pdf`);
};

export default EgresosDetPDF;