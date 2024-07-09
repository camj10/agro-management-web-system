import con from '../config/database.js';

const totalIngresos = async(req, res)=>{
    const sql = "SELECT SUM(total_ingreso) AS total_ingreso,  id_ingreso, ingresos.id_zafra, z.descripcion as zafra FROM ingresos INNER JOIN zafras z ON ingresos.id_zafra = z.id_zafra WHERE ingresos.estado = 1 GROUP BY ingresos.id_zafra ";
    const values = [ req.body.descripcion ]
    con.query(sql,[values], (err, data) => {
        if(err){ return res.json({Error:"totalIngresos error in Server", err}) } 
        console.log("data: ",data)
        return res.json({Status:"Success",data: data})
    })
}

const totalEgresos = async(req, res)=>{
    const sql = "SELECT SUM(monto_egreso) AS total_egreso,  id_egreso, zafra FROM egresos GROUP BY zafra ";
    const values = [ req.body.descripcion ]
    con.query(sql,[values], (err, data) => {
        if(err){ return res.json({Error:"totalEgresos error in Server", err}) } 
        console.log("data: ",data)
        return res.json({Status:"Success",data: data})
    })
}

// const totalDiferencias = async(req, res)=>{
//     const sql = "SELECT SUM(monto_egreso) AS total_egreso,  id_egreso, zafra FROM egresos GROUP BY zafra ";
//     const values = [ req.body.descripcion ]
//     con.query(sql,[values], (err, data) => {
//         if(err){ return res.json({Error:"totalEgresos error in Server", err}) } 
//         const dataEgreso = data
//         console.log("dataEgreso: ",dataEgreso)
//         const sql = "SELECT SUM(total_ingreso) AS total_ingreso,  id_ingreso, ingresos.id_zafra, z.descripcion as zafra FROM ingresos INNER JOIN zafras z ON ingresos.id_zafra = z.id_zafra WHERE ingresos.estado = 1 GROUP BY ingresos.id_zafra ";
//         const values = [ req.body.descripcion ]
//         con.query(sql,[values], (err, data) => {
//             if(err){ return res.json({Error:"totalIngresos error in Server", err}) } 
//             const dataIngreso = data
//             console.log("dataIngreso: ",dataIngreso)
//             return res.json({Status:"Success"})
//         })
//     })
// }
const totalDiferencias = async (req, res) => {
    // Obtener los datos de egresos
    const sqlEgresos = "SELECT SUM(monto_egreso) AS total_egreso, zafra FROM egresos GROUP BY zafra";
    con.query(sqlEgresos, (errEgresos, dataEgresos) => {
      if (errEgresos) {
        return res.json({ Error: "totalEgresos error in Server", err: errEgresos });
      }
  
      // Obtener los datos de ingresos
      const sqlIngresos = "SELECT SUM(total_ingreso) AS total_ingreso, ingresos.id_zafra, z.descripcion as zafra FROM ingresos INNER JOIN zafras z ON ingresos.id_zafra = z.id_zafra WHERE ingresos.estado = 1 GROUP BY ingresos.id_zafra";
      con.query(sqlIngresos, (errIngresos, dataIngresos) => {
        if (errIngresos) {
          return res.json({ Error: "totalIngresos error in Server", err: errIngresos });
        }
  
        // Mapear los datos de ingresos y egresos
        const mappedDataIngreso = dataIngresos.map((item) => ({
          zafra: item.zafra,
          totalIngreso: item.total_ingreso,
        }));
  
        const mappedDataEgreso = dataEgresos.map((item) => ({
          zafra: item.zafra,
          totalEgreso: item.total_egreso,
        }));
  
        // Encontrar las diferencias
        const dataDiferencias = mappedDataIngreso.map((ingreso) => {
          const egresoCorrespondiente = mappedDataEgreso.find((egreso) => egreso.zafra === ingreso.zafra);
  
          if (egresoCorrespondiente) {
            return {
              zafra: ingreso.zafra,
              diferencia: ingreso.totalIngreso - egresoCorrespondiente.totalEgreso,
            };
          } else {
            return null;
          }
        }).filter(Boolean);
  
        return res.json({ Status: "Success", dataDiferencias });
      });
    });
  };
  
export default {
    totalIngresos,
    totalEgresos,
    totalDiferencias
}