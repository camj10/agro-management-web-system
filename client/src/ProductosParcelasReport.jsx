import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductosParcelasGeneratePDF from "./ProductosParcelasGeneratePDF";

const ProductosParcelasReport = () => {
  const [productosParcelas, setProductosParcelas] = useState([]);

  useEffect(() => {
    const getAllProductosParcelas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/productosParcelas"
        );
        setProductosParcelas(response.data.data);
      } catch (err) {
        console.log("error");
      }
    };

    getAllProductosParcelas();
  }, [productosParcelas]);
  return (
    <div>
      <button
        className="btn btn-info ml-10"
        onClick={() => ProductosParcelasGeneratePDF(productosParcelas)}
      >
        Generar reporte
      </button>
    </div>
  );
};

export default ProductosParcelasReport;