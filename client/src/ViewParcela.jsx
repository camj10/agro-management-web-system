// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Edit_parcelas from './edit_parcelas';
// import { Link } from 'react-router-dom';
// import DisplayPolygons from './DisplayPolygons';
// import { useLocation } from 'react-router-dom';

// function ViewParcela() {
//   const { search } = useLocation();
//   const params = new URLSearchParams(search);
//   const coordenadas = params.get('coordenadas');

//   const [auth, setAuth] = useState(false);
//   axios.defaults.withCredentials = true;
//   const handleDelete = () => {
//     axios.get('http://localhost:8081/logout')
//       .then(res => {
//         location.reload(true);
//     }).catch(err => console.log(err));
//   }
//   useEffect(()=>{//Verifica si está autenticado 
//     axios.get('http://localhost:8081')
//     .then(res => {
//         if(res.data.Status === 'Success') {
//           setAuth(true)
//         } else {
//           setAuth(false)
//         }
//     })
//   }, [])
//   const coordenadasArray = JSON.parse(coordenadas || "[]");
//   return (
//     <>
//       <div className='container-lista-gral'>
//         {
//           auth ?
//                 <>
//                     <div className='container-lista'>
//                         <DisplayPolygons polygons={coordenadasArray}/>
//                     </div>
//                 </>
//           : 
//                 <div>
//                     <h3>No estás autenticado</h3>
//                     <Link to="/login" className='btn btn-primary'>Login</Link>
//                 </div>
//           }
//         </div>
//     </>
//   );
// }

// export default ViewParcela;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DisplayPolygons from './DisplayPolygons';
import { useLocation } from 'react-router-dom';

function ViewParcela() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const coordenadas = params.get('coordenadas');
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {// Verifica si está autenticado
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.Status === 'Success') {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch(err => console.log(err));
  }, []);
  console.log("coordenadas: ",coordenadas)

  return (
    <>
      <div className='container-lista-gral'>
        {
          auth ? (
            <>
              <div className='container-lista'>
                <DisplayPolygons coordenadas={coordenadas} />
              </div>
            </>
          ) : (
            <div>
              <h3>No estás autenticado</h3>
              <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
          )
        }
      </div>
    </>
  );
}

export default ViewParcela;
