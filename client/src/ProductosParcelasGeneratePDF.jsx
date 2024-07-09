import jsPDF from "jspdf";
import "jspdf-autotable";
// import { format } from 'date-fns';

const ProductosParcelasGeneratePDF = (productosParcelas) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Fecha",
    "Producto",
    "Parcela",
    "Tipo de trabajo",
    "Cantidad",
  ];
  const tableRows = [];

  productosParcelas.forEach((productoParcela) => {
    const productoParcelaData = [
      productoParcela.fecha,
      productoParcela.producto,
      productoParcela.parcela,
      productoParcela.tipo_trabajo,
      productoParcela.cantidad,
    ];

    tableRows.push(productoParcelaData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de productos en parcelas (${date})`, 14, 15);

  doc.save(`ReporteProductosParcelas_${date}.pdf`);
};

export default ProductosParcelasGeneratePDF;