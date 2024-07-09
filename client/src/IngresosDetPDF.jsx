import jsPDF from "jspdf";
import "jspdf-autotable";

const IngresosDetPDF = (dataTotalIngreso) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Fecha",
    "Costo ha",
    "Cant ha",
    "Ingreso",
    "Producto",
    "Parcela",
    "Zafra"
  ];
  const tableRows = [];

  dataTotalIngreso.forEach((ingreso) => {
    const ingresoData = [
      ingreso.fecha,
      ingreso.costo_por_hectarea,
      ingreso.cantidad_hectareas,
      ingreso.monto_ingreso,
      ingreso.producto,
      ingreso.parcela,
      ingreso.zafra
    ];

    tableRows.push(ingresoData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte detallado de ingresos(${date})`, 14, 15);

  doc.save(`ReporteDetalladoIngresos_${date}.pdf`);
};

export default IngresosDetPDF;