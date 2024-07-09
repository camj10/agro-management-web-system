import jsPDF from "jspdf";
import "jspdf-autotable";

const ProductosPDF = (data) => {
  const doc = new jsPDF();
  const tableColumn = [
    "Descripcion",
    "Tipo",
    "PrincipiosActivos",
    "Dosis",
    "Marca",
    "Proveedor",
    "Stock",
    "UdMed",
    "Precio",
    "CostoHa",
  ];
  const tableRows = [];

  data.forEach((producto) => {
    const productoData = [
      producto.descripcion,
      producto.tipo_producto,
      producto.principios_activos,
      producto.dosis,
      producto.marca,
      producto.empresa_proveedora,
      producto.stock,
      producto.unidad_medida,
      producto.precio,
      producto.costo_por_hectarea,
    ];

    tableRows.push(productoData);
  });

  doc.autoTable(tableColumn, tableRows, { startY: 20 });

  const date = new Date().toISOString().slice(0, 10);
  doc.text(`Reporte de productos (${date})`, 14, 15);

  doc.save(`ReporteProductos_${date}.pdf`);
};

export default ProductosPDF;