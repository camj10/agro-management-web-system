// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { format, parseISO } from 'date-fns';

// function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
// axios.defaults.withCredentials = true;

// const [error, setError] = useState('');
// const [productoData, setProductoData] = useState([]);
// const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
// const [parcelaData, setParcelaData] = useState([]);

// const [selectedProducto, setSelectedProducto] = useState(null); 
// const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
// const [selectedParcela, setSelectedParcela] = useState(null);
// const [editedData, setEditedData] = useState({}); // Estado para los datos editados

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
//           axios.get('http://localhost:8081/productos'),
//           axios.get('http://localhost:8081/listarTipo_Trabajo'),
//           axios.get('http://localhost:8081/parcelas'),
//         ]);

//         setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
//         setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
//         setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []); 

//   useEffect(() => {
//     if (datosEdicion) {
//       setEditedData(datosEdicion);
//       const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
//       datosEdicion.fecha = fechaFormateada
//       setSelectedProducto(datosEdicion.id_producto ? { value: datosEdicion.id_producto, label: datosEdicion.producto } : null);
//       setSelectedTipo_trabajo(datosEdicion.id_tipo_trabajo ? { value: datosEdicion.id_tipo_trabajo, label: datosEdicion.tipo_trabajo } : null);
//       setSelectedParcela(datosEdicion.id_parcela ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela } : null);
//     }
//   }, [datosEdicion]);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("editedData: ",editedData)
//     onSave(editedData);
//   };
//   return (
//     <>
//     <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//                 <label htmlFor="fecha"><strong>fecha:</strong></label>
//                 <input type="date" placeholder='fecha' name='fecha' 
//                 value={editedData.fecha || ''} onChange={handleInputChange} className='form-control rounded-0' autoComplete='off'/>
//         </div>
//         <div>
//             <label htmlFor="id_producto"><strong>Producto:</strong></label>
//             <Select
//             options={(productoData) ? productoData.map((producto) => ({ //Mapea productoData (les da otro nombre) y guarda en "options" 
//                 value: producto.id_producto,
//                 label: producto.descripcion,
//             })) : [] }
//             value={selectedProducto}
//             onChange={(selectedOption) => setSelectedProducto(selectedOption)}
//             placeholder='Selecciona un producto' 
//             />
//         </div>
//         <div className='mb-3'>
//                 <label htmlFor="cantidad"><strong>Cantidad:</strong></label>
//                 <input type="text" placeholder='Principios activos' name='cantidad'
//                 value={editedData.cantidad || ''} onChange={handleInputChange} className='form-control rounded-0' />
//         </div>
//         <div>
//             <label htmlFor="id_tipo_trabajo"><strong>Tipo de trabajo:</strong></label>
//             <Select
//             options={(tipo_trabajoData) ? tipo_trabajoData.map((tipo_trabajo) => ({ //Mapea tipo_trabajoData (les da otro nombre) y guarda en "options" 
//                 value: tipo_trabajo.id_tipo_trabajo,
//                 label: tipo_trabajo.descripcion,
//             })) : [] }
//             value={selectedTipo_trabajo}
//             onChange={(selectedOption) => setSelectedTipo_trabajo(selectedOption)}
//             placeholder='Selecciona un tipo de trabajo' 
//             />
//         </div>
//         <div>
//             <label htmlFor="id_parcela"><strong>Parcela:</strong></label>
//             <Select
//             options={(parcelaData) ? parcelaData.map((parcela) => ({ //Mapea parcelaData (les da otro nombre) y guarda en "options"
//                 value: parcela.id_parcela,
//                 label: parcela.descripcion,
//             })) : [] }
//             value={selectedParcela}
//             onChange={(selectedOption) => setSelectedParcela(selectedOption)}
//             placeholder='Selecciona una parcela' 
//             />
//         </div>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={onCancel}>Cancelar</button>
//         <Link to="/" className='btn btn-primary'>Home</Link>
//     </form>
//   </>
//    )
// }

// export default Edit_producto_parcela;

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { format, parseISO } from 'date-fns';

// function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
//   axios.defaults.withCredentials = true;

//   const [error, setError] = useState('');
//   const [productoData, setProductoData] = useState([]);
//   const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
//   const [parcelaData, setParcelaData] = useState([]);

//   const [selectedProducto, setSelectedProducto] = useState(null);
//   const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
//   const [selectedParcela, setSelectedParcela] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
//           axios.get('http://localhost:8081/productos'),
//           axios.get('http://localhost:8081/listarTipo_Trabajo'),
//           axios.get('http://localhost:8081/parcelas'),
//         ]);

//         setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
//         setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
//         setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (datosEdicion) {
//       const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
//       const editedDataCopy = {
//         ...datosEdicion,
//         fecha: fechaFormateada,
//         id_producto: selectedProducto ? selectedProducto.value : null,
//         id_tipo_trabajo: selectedTipo_trabajo ? selectedTipo_trabajo.value : null,
//         id_parcela: selectedParcela ? selectedParcela.value : null,
//       };

//       setEditedData(editedDataCopy);
//     }
//   }, [datosEdicion, selectedProducto, selectedTipo_trabajo, selectedParcela]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("editedData: ", editedData);
//     onSave(editedData);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label htmlFor="fecha"><strong>fecha:</strong></label>
//           <input
//             type="date"
//             placeholder='fecha'
//             name='fecha'
//             value={editedData.fecha || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//             autoComplete='off'
//           />
//         </div>
//         <div>
//           <label htmlFor="id_producto"><strong>Producto:</strong></label>
//           <Select
//             options={(productoData) ? productoData.map((producto) => ({
//               value: producto.id_producto,
//               label: producto.descripcion,
//             })) : []}
//             value={selectedProducto}
//             onChange={(selectedOption) => setSelectedProducto(selectedOption)}
//             placeholder='Selecciona un producto'
//           />
//         </div>
//         <div className='mb-3'>
//           <label htmlFor="cantidad"><strong>Cantidad:</strong></label>
//           <input
//             type="text"
//             placeholder='Principios activos'
//             name='cantidad'
//             value={editedData.cantidad || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//           />
//         </div>
//         <div>
//           <label htmlFor="id_tipo_trabajo"><strong>Tipo de trabajo:</strong></label>
//           <Select
//             options={(tipo_trabajoData) ? tipo_trabajoData.map((tipo_trabajo) => ({
//               value: tipo_trabajo.id_tipo_trabajo,
//               label: tipo_trabajo.descripcion,
//             })) : []}
//             value={selectedTipo_trabajo}
//             onChange={(selectedOption) => setSelectedTipo_trabajo(selectedOption)}
//             placeholder='Selecciona un tipo de trabajo'
//           />
//         </div>
//         <div>
//           <label htmlFor="id_parcela"><strong>Parcela:</strong></label>
//           <Select
//             options={(parcelaData) ? parcelaData.map((parcela) => ({
//               value: parcela.id_parcela,
//               label: parcela.descripcion,
//             })) : []}
//             value={selectedParcela}
//             onChange={(selectedOption) => setSelectedParcela(selectedOption)}
//             placeholder='Selecciona una parcela'
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={onCancel}>Cancelar</button>
//         <Link to="/" className='btn btn-primary'>Home</Link>
//       </form>
//     </>
//   );
// }

// export default Edit_producto_parcela;


// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { format, parseISO } from 'date-fns';

// function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
//   axios.defaults.withCredentials = true;

//   const [error, setError] = useState('');
//   const [productoData, setProductoData] = useState([]);
//   const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
//   const [parcelaData, setParcelaData] = useState([]);

//   const [selectedProducto, setSelectedProducto] = useState(null);
//   const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
//   const [selectedParcela, setSelectedParcela] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
//           axios.get('http://localhost:8081/productos'),
//           axios.get('http://localhost:8081/listarTipo_Trabajo'),
//           axios.get('http://localhost:8081/parcelas'),
//         ]);

//         setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
//         setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
//         setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (datosEdicion) {
//       // Copia de los datos iniciales
//       const editedDataCopy = { ...datosEdicion };

//       // Formatear la fecha si existe
//       if (editedDataCopy.fecha) {
//         editedDataCopy.fecha = format(parseISO(editedDataCopy.fecha), 'yyyy-MM-dd');
//       }

//       // Asignar valores seleccionados de los dropdowns
//       editedDataCopy.id_producto = selectedProducto ? selectedProducto.value : null;
//       editedDataCopy.id_tipo_trabajo = selectedTipo_trabajo ? selectedTipo_trabajo.value : null;
//       editedDataCopy.id_parcela = selectedParcela ? selectedParcela.value : null;

//       // Actualizar el estado editedData
//       setEditedData(editedDataCopy);
//     }
//   }, [datosEdicion, selectedProducto, selectedTipo_trabajo, selectedParcela]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("editedData: ", editedData);
//     onSave(editedData);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label htmlFor="fecha"><strong>fecha:</strong></label>
//           <input
//             type="date"
//             placeholder='fecha'
//             name='fecha'
//             value={editedData.fecha || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//             autoComplete='off'
//           />
//         </div>
//         <div>
//           <label htmlFor="id_producto"><strong>Producto:</strong></label>
//           <Select
//             options={(productoData) ? productoData.map((producto) => ({
//               value: producto.id_producto,
//               label: producto.descripcion,
//             })) : []}
//             value={selectedProducto}
//             onChange={(selectedOption) => setSelectedProducto(selectedOption)}
//             placeholder='Selecciona un producto'
//           />
//         </div>
//         <div className='mb-3'>
//           <label htmlFor="cantidad"><strong>Cantidad:</strong></label>
//           <input
//             type="text"
//             placeholder='Principios activos'
//             name='cantidad'
//             value={editedData.cantidad || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//           />
//         </div>
//         <div>
//           <label htmlFor="id_tipo_trabajo"><strong>Tipo de trabajo:</strong></label>
//           <Select
//             options={(tipo_trabajoData) ? tipo_trabajoData.map((tipo_trabajo) => ({
//               value: tipo_trabajo.id_tipo_trabajo,
//               label: tipo_trabajo.descripcion,
//             })) : []}
//             value={selectedTipo_trabajo}
//             onChange={(selectedOption) => setSelectedTipo_trabajo(selectedOption)}
//             placeholder='Selecciona un tipo de trabajo'
//           />
//         </div>
//         <div>
//           <label htmlFor="id_parcela"><strong>Parcela:</strong></label>
//           <Select
//             options={(parcelaData) ? parcelaData.map((parcela) => ({
//               value: parcela.id_parcela,
//               label: parcela.descripcion,
//             })) : []}
//             value={selectedParcela}
//             onChange={(selectedOption) => setSelectedParcela(selectedOption)}
//             placeholder='Selecciona una parcela'
//           />
//         </div>
//         <button type="submit">Submit</button>
//         <button type="button" onClick={onCancel}>Cancelar</button>
//         <Link to="/" className='btn btn-primary'>Home</Link>
//       </form>
//     </>
//   );
// }

// export default Edit_producto_parcela;


// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { format, parseISO } from 'date-fns';

// function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
//   axios.defaults.withCredentials = true;

//   const [error, setError] = useState('');
//   const [productoData, setProductoData] = useState([]);
//   const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
//   const [parcelaData, setParcelaData] = useState([]);

//   const [selectedProducto, setSelectedProducto] = useState(null);
//   const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
//   const [selectedParcela, setSelectedParcela] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
//           axios.get('http://localhost:8081/productos'),
//           axios.get('http://localhost:8081/listarTipo_Trabajo'),
//           axios.get('http://localhost:8081/parcelas'),
//         ]);

//         setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
//         setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
//         setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (datosEdicion) {
//       const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
//       setEditedData({ ...datosEdicion, fecha: fechaFormateada });

//       // Asignar valores seleccionados de los dropdowns
//       setSelectedProducto(
//         datosEdicion.id_producto
//           ? { value: datosEdicion.id_producto, label: datosEdicion.producto }
//           : null
//       );
//       setSelectedTipo_trabajo(
//         datosEdicion.id_tipo_trabajo
//           ? { value: datosEdicion.id_tipo_trabajo, label: datosEdicion.tipo_trabajo }
//           : null
//       );
//       setSelectedParcela(
//         datosEdicion.id_parcela
//           ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela }
//           : null
//       );
//     }
//   }, [datosEdicion]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('editedData: ', editedData);
//     onSave(editedData);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label htmlFor='fecha'>
//             <strong>fecha:</strong>
//           </label>
//           <input
//             type='date'
//             placeholder='fecha'
//             name='fecha'
//             value={editedData.fecha || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//             autoComplete='off'
//           />
//         </div>
//         <div>
//           <label htmlFor='id_producto'>
//             <strong>Producto:</strong>
//           </label>
//           <Select
//             options={(productoData || []).map((producto) => ({
//               value: producto.id_producto,
//               label: producto.descripcion,
//             }))}
//             value={selectedProducto}
//             onChange={(selectedOption) => setSelectedProducto(selectedOption)}
//             placeholder='Selecciona un producto'
//           />
//         </div>
//         <div className='mb-3'>
//           <label htmlFor='cantidad'>
//             <strong>Cantidad:</strong>
//           </label>
//           <input
//             type='text'
//             placeholder='Principios activos'
//             name='cantidad'
//             value={editedData.cantidad || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//           />
//         </div>
//         <div>
//           <label htmlFor='id_tipo_trabajo'>
//             <strong>Tipo de trabajo:</strong>
//           </label>
//           <Select
//             options={(tipo_trabajoData || []).map((tipo_trabajo) => ({
//               value: tipo_trabajo.id_tipo_trabajo,
//               label: tipo_trabajo.descripcion,
//             }))}
//             value={selectedTipo_trabajo}
//             onChange={(selectedOption) => setSelectedTipo_trabajo(selectedOption)}
//             placeholder='Selecciona un tipo de trabajo'
//           />
//         </div>
//         <div>
//           <label htmlFor='id_parcela'>
//             <strong>Parcela:</strong>
//           </label>
//           <Select
//             options={(parcelaData || []).map((parcela) => ({
//               value: parcela.id_parcela,
//               label: parcela.descripcion,
//             }))}
//             value={selectedParcela}
//             onChange={(selectedOption) => setSelectedParcela(selectedOption)}
//             placeholder='Selecciona una parcela'
//           />
//         </div>
//         <button type='submit'>Submit</button>
//         <button type='button' onClick={onCancel}>
//           Cancelar
//         </button>
//         <Link to='/' className='btn btn-primary'>
//           Home
//         </Link>
//       </form>
//     </>
//   );
// }

// export default Edit_producto_parcela;


// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { format, parseISO } from 'date-fns';

// function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
//   axios.defaults.withCredentials = true;

//   const [error, setError] = useState('');
//   const [productoData, setProductoData] = useState([]);
//   const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
//   const [parcelaData, setParcelaData] = useState([]);

//   const [selectedProducto, setSelectedProducto] = useState(null);
//   const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
//   const [selectedParcela, setSelectedParcela] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
//           axios.get('http://localhost:8081/productos'),
//           axios.get('http://localhost:8081/listarTipo_Trabajo'),
//           axios.get('http://localhost:8081/parcelas'),
//         ]);

//         setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
//         setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
//         setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (datosEdicion) {
//       const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
//       setEditedData({ ...datosEdicion, fecha: fechaFormateada });

//       // Asignar valores seleccionados de los dropdowns
//       setSelectedProducto(
//         datosEdicion.id_producto
//           ? { value: datosEdicion.id_producto, label: datosEdicion.producto }
//           : null
//       );
//       setSelectedTipo_trabajo(
//         datosEdicion.id_tipo_trabajo
//           ? { value: datosEdicion.id_tipo_trabajo, label: datosEdicion.tipo_trabajo }
//           : null
//       );
//       setSelectedParcela(
//         datosEdicion.id_parcela
//           ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela }
//           : null
//       );
//     }
//   }, [datosEdicion]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Agregar lógica de actualización utilizando la función onSave
//       await onSave(editedData);
//       console.log('Datos actualizados correctamente:', editedData);
//     } catch (error) {
//       console.error('Error al actualizar datos:', error);
//       // Manejar errores según sea necesario
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         {/* ... Resto del formulario ... */}
//         <button type='submit'>Submit</button>
//         <button type='button' onClick={onCancel}>
//           Cancelar
//         </button>
//         <Link to='/' className='btn btn-primary'>
//           Home
//         </Link>
//       </form>
//     </>
//   );
// }

// export default Edit_producto_parcela;

// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import { format, parseISO } from 'date-fns';

// function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
//   axios.defaults.withCredentials = true;

//   const [error, setError] = useState('');
//   const [productoData, setProductoData] = useState([]);
//   const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
//   const [parcelaData, setParcelaData] = useState([]);

//   const [selectedProducto, setSelectedProducto] = useState(null);
//   const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
//   const [selectedParcela, setSelectedParcela] = useState(null);
//   const [editedData, setEditedData] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
//           axios.get('http://localhost:8081/productos'),
//           axios.get('http://localhost:8081/listarTipo_Trabajo'),
//           axios.get('http://localhost:8081/parcelas'),
//         ]);

//         setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
//         setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
//         setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);

//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (datosEdicion) {
//       const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
//       setEditedData({ ...datosEdicion, fecha: fechaFormateada });

//       // Asignar valores seleccionados de los dropdowns
//       setSelectedProducto(
//         datosEdicion.id_producto
//           ? { value: datosEdicion.id_producto, label: datosEdicion.producto }
//           : null
//       );
//       setSelectedTipo_trabajo(
//         datosEdicion.id_tipo_trabajo
//           ? { value: datosEdicion.id_tipo_trabajo, label: datosEdicion.tipo_trabajo }
//           : null
//       );
//       setSelectedParcela(
//         datosEdicion.id_parcela
//           ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela }
//           : null
//       );
//     }
//   }, [datosEdicion]);
//   console.log("selectedProducto: ",selectedProducto)
//   console.log("datosEdicion: ",datosEdicion)
//   console.log("editedData: ",editedData)


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Agregar lógica de actualización utilizando la función onSave
//       await onSave(editedData);
//       console.log('Datos actualizados correctamente:', editedData);
//     } catch (error) {
//       console.error('Error al actualizar datos:', error);
//       // Manejar errores según sea necesario
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <div className='mb-3'>
//           <label htmlFor='fecha'>
//             <strong>fecha:</strong>
//           </label>
//           <input
//             type='date'
//             placeholder='fecha'
//             name='fecha'
//             value={editedData.fecha || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//             autoComplete='off'
//           />
//         </div>
//         <div>
//           <label htmlFor='id_producto'>
//             <strong>Producto:</strong>
//           </label>
//           <Select
//             options={(productoData || []).map((producto) => ({
//               value: producto.id_producto,
//               label: producto.descripcion,
//             }))}
//             value={selectedProducto}
//             onChange={(selectedOption) => setSelectedProducto(selectedOption)}
//             placeholder='Selecciona un producto'
//           />
//         </div>
//         <div className='mb-3'>
//           <label htmlFor='cantidad'>
//             <strong>Cantidad:</strong>
//           </label>
//           <input
//             type='text'
//             placeholder='Principios activos'
//             name='cantidad'
//             value={editedData.cantidad || ''}
//             onChange={handleInputChange}
//             className='form-control rounded-0'
//           />
//         </div>
//         <div>
//           <label htmlFor='id_tipo_trabajo'>
//             <strong>Tipo de trabajo:</strong>
//           </label>
//           <Select
//             options={(tipo_trabajoData || []).map((tipo_trabajo) => ({
//               value: tipo_trabajo.id_tipo_trabajo,
//               label: tipo_trabajo.descripcion,
//             }))}
//             value={selectedTipo_trabajo}
//             onChange={(selectedOption) => setSelectedTipo_trabajo(selectedOption)}
//             placeholder='Selecciona un tipo de trabajo'
//           />
//         </div>
//         <div>
//           <label htmlFor='id_parcela'>
//             <strong>Parcela:</strong>
//           </label>
//           <Select
//             options={(parcelaData || []).map((parcela) => ({
//               value: parcela.id_parcela,
//               label: parcela.descripcion,
//             }))}
//             value={selectedParcela}
//             onChange={(selectedOption) => setSelectedParcela(selectedOption)}
//             placeholder='Selecciona una parcela'
//           />
//         </div>
//         <button type='submit'>Submit</button>
//         <button type='button' onClick={onCancel}>
//           Cancelar
//         </button>
//         <Link to='/' className='btn btn-primary'>
//           Home
//         </Link>
//       </form>
//     </>
//   );
// }

// export default Edit_producto_parcela;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { format, parseISO } from 'date-fns';

function Edit_producto_parcela({ datosEdicion, onCancel, onSave }) {
  axios.defaults.withCredentials = true;

  const [error, setError] = useState('');
  const [productoData, setProductoData] = useState([]);
  const [tipo_trabajoData, setTipo_trabajoData] = useState([]);
  const [parcelaData, setParcelaData] = useState([]);
  const [zafraData, setZafraData] = useState([]);

  const [selectedProducto, setSelectedProducto] = useState(null);
  const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null);
  const [selectedParcela, setSelectedParcela] = useState(null);
  const [selectedZafra, setSelectedZafra] = useState(null);

  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productoRes, tipo_trabajoRes, parcelaRes] = await Promise.all([
          axios.get('http://localhost:8081/productos'),
          axios.get('http://localhost:8081/listarTipo_Trabajo'),
          axios.get('http://localhost:8081/parcelas'),
          axios.get('http://localhost:8081/listarZafra'),
        ]);

        setProductoData(productoRes.data.Status === 'Success' ? productoRes.data.data : []);
        setTipo_trabajoData(tipo_trabajoRes.data.Status === 'Success' ? tipo_trabajoRes.data.data : []);
        setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
        setZafraData(zafraRes.data.Status === 'Success' ? zafraRes.data.data : []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (datosEdicion) {
      const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
      setEditedData({ ...datosEdicion, fecha: fechaFormateada, cantidadAntigua: datosEdicion.cantidad });

      // Asignar valores seleccionados de los dropdowns
      setSelectedProducto(
        datosEdicion.id_producto
          ? { value: datosEdicion.id_producto, label: datosEdicion.producto }
          : null
      );
      setSelectedTipo_trabajo(
        datosEdicion.id_tipo_trabajo
          ? { value: datosEdicion.id_tipo_trabajo, label: datosEdicion.tipo_trabajo }
          : null
      );
      setSelectedParcela(
        datosEdicion.id_parcela
          ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela }
          : null
      );
      setSelectedZafra(
        datosEdicion.id_zafra
          ? { value: datosEdicion.id_zafra, label: datosEdicion.zafra }
          : null
      );
    }
  }, [datosEdicion]);


  useEffect(() => {
    console.log('editedData:', editedData);
  }, [editedData]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Agregar lógica de actualización utilizando la función onSave
      //Tomar el valor de cantidad de datosEdicion y editedData, hacer la diferencia y ese valor asignar al onsave con el objeto de editedData
      await onSave(editedData);
      console.log('Datos actualizados correctamente:', datosEdicion);
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      // Manejar errores según sea necesario
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='fecha'>
            <strong>fecha:</strong>
          </label>
          <input
            type='date'
            placeholder='fecha'
            name='fecha'
            value={editedData.fecha || ''}
            onChange={handleInputChange}
            className='form-control rounded-0'
            autoComplete='off'
          />
        </div>
        <div>
          <label htmlFor='id_producto'>
            <strong>Producto:</strong>
          </label>
          <Select
            options={(productoData || []).map((producto) => ({
              value: producto.id_producto,
              label: producto.descripcion,
            }))}
            value={selectedProducto}
            onChange={(selectedOption) => {
                setSelectedProducto(selectedOption);
                setEditedData((prevData) => ({
                ...prevData,
                id_producto: selectedOption ? selectedOption.value : null,
                }));
            }}
            placeholder='Selecciona un producto'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cantidad'>
            <strong>Cantidad:</strong>
          </label>
          <input
            type='text'
            placeholder='Principios activos'
            name='cantidad'
            value={editedData.cantidad || ''}
            onChange={handleInputChange}
            className='form-control rounded-0'
          />
        </div>
        <div>
          <label htmlFor='id_tipo_trabajo'>
            <strong>Tipo de trabajo:</strong>
          </label>
          <Select
            options={(tipo_trabajoData || []).map((tipo_trabajo) => ({
              value: tipo_trabajo.id_tipo_trabajo,
              label: tipo_trabajo.descripcion,
            }))}
            value={selectedTipo_trabajo}
            onChange={(selectedOption) => {
                setSelectedTipo_trabajo(selectedOption);
                setEditedData((prevData) => ({
                ...prevData,
                id_tipo_trabajo: selectedOption ? selectedOption.value : null,
                }));
            }}
            placeholder='Selecciona un tipo de trabajo'
          />
        </div>
        <div>
          <label htmlFor='id_parcela'>
            <strong>Parcela:</strong>
          </label>
          <Select
                options={(parcelaData || []).map((parcela) => ({
                    value: parcela.id_parcela,
                    label: parcela.descripcion,
                }))}
                value={selectedParcela}
                onChange={(selectedOption) => {
                    setSelectedParcela(selectedOption);
                    setEditedData((prevData) => ({
                    ...prevData,
                    id_parcela: selectedOption ? selectedOption.value : null,
                    }));
                }}
                placeholder='Selecciona una parcela'
            />
        </div>
        <div>
          <label htmlFor='id_zafra'>
            <strong>Zafra:</strong>
          </label>
          <Select
                options={(zafraData || []).map((zafra) => ({
                    value: zafra.id_zafra,
                    label: zafra.descripcion,
                }))}
                value={selectedZafra}
                onChange={(selectedOption) => {
                    setSelectedZafra(selectedOption);
                    setEditedData((prevData) => ({
                    ...prevData,
                    id_zafra: selectedOption ? selectedOption.value : null,
                    }));
                }}
                placeholder='Selecciona una zafra'
            />
        </div>
        <button type='submit'>Guardar</button>
        <button type='button' onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </>
  );
}

export default Edit_producto_parcela;
