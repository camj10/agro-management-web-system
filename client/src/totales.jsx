import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DiferenciasPDF from "./DiferenciasPDF";
import EgresosPDF from "./EgresosPDF";
import IngresosPDF from "./IngresosPDF";

function Totales() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 
  const [dataTotal, setDataTotal] = useState([]);
  const [dataTotalEgreso, setDataTotalEgreso] = useState([]);
  const [dataDiferencias, setDataDiferencias] = useState([]);

  useEffect(() => { 
    axios.get('http://localhost:8081/totalIngresos')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setDataTotal(res.data.data)
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh])

  useEffect(() => { 
    axios.get('http://localhost:8081/totalEgresos')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setDataTotalEgreso(res.data.data)
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh])

  useEffect(() => { 
    axios.get('http://localhost:8081/totalDiferencias')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setDataDiferencias(res.data.dataDiferencias)
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh])

  return (
    <>
      <div className='container-lista-gral'>
            <div className='container-lista'>
              <div>
                  <button
                    className="btn btn-info ml-10"
                    onClick={() => IngresosPDF(dataTotal)} 
                  >
                    Generar reporte
                  </button>
              </div>
              <div className='nav-lista'>
              <h2>Totales hasta la fecha:</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Zafra:</th>
                      <th scope="col">Total ingreso:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTotal? dataTotal.map((item) => ( 
                      <tr key={item.id_ingreso}> 
                        <th scope="row">{item.id_ingreso}</th> 
                        <td>{item.zafra}</td>
                        <td>{item.total_ingreso}</td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>

                <div className='tab-lista'>
                <div>
                  <button
                    className="btn btn-info ml-10"
                    onClick={() => EgresosPDF(dataTotalEgreso)}
                  >
                    Generar reporte
                  </button>
                </div>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Zafra:</th>
                      <th scope="col">Total egreso:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataTotalEgreso? dataTotalEgreso.map((item) => ( 
                      <tr key={item.id_ingreso}> 
                        <th scope="row">{item.id_egreso}</th> 
                        <td>{item.zafra}</td>
                        <td>{item.total_egreso}</td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>


                <div className='tab-lista'>      
                <div>
                  <button
                    className="btn btn-info ml-10"
                    onClick={() => DiferenciasPDF(dataDiferencias)}
                  >
                    Generar reporte
                  </button>
                </div>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col"></th>
                      <th scope="col">Zafra:</th>
                      <th scope="col">Diferencias:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataDiferencias? dataDiferencias.map((item) => ( 
                      <tr key={item.zafra}> 
                        <th scope="row"></th> 
                        <td>{item.zafra}</td>
                        <td>{item.diferencia}</td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
        </div>
    </>
  );
} 

export default Totales;
