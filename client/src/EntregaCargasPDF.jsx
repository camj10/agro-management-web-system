import jsPDF from "jspdf";
import "jspdf-autotable";
// import { format } from 'date-fns';

const EntregaCargasPDF = (productosParcelas) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Fecha",
    "T",
    "N°",
    "Silo",
    "Calidad",
    "Parcela",
    "Zafra",
    "Vendido"
  ];
  const tableRows = [];

  productosParcelas.forEach((productoParcela) => {
    const productoParcelaData = [
      productoParcela.fecha,
      productoParcela.toneladas_entregadas,
      productoParcela.numero_de_entrega,
      productoParcela.empresa_silo,
      productoParcela.calidad_grano,
      productoParcela.parcela,
      productoParcela.zafra,
      productoParcela.vendido==0? 'No':'Si',
    ];

    tableRows.push(productoParcelaData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de entrega de cargas (${date})`, 14, 15);

  doc.save(`ReporteEntregaCargas_${date}.pdf`);
};

export default EntregaCargasPDF;