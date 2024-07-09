import { Router } from "express"
const router = Router()

import marcaController from '../controllers/Marca.controller.js';
const { addMarca, listarMarcas, borrarMarca, editMarca, actualizarMarca } = marcaController;

import parcelaController from '../controllers/Parcela.controller.js';
const { parcelas, listarparcelas, addParcela, borrarParcela, editParcela, parcelaPorId, savePolygon, getCoordinates } = parcelaController;

import barrrioController from '../controllers/Barrio.controller.js';
const { insertarBarrio, listarBarrios, editBarrio } = barrrioController;

import calidad_granoController from '../controllers/Calidad_grano.controller.js';
const { calidades_granos, addCalidadGrano, listarCalidadesGranos } = calidad_granoController;

import ciudadController from '../controllers/Ciudad.controller.js';
const { insertarCiudad, listarCiudades, editCiudad } = ciudadController;

import departamentoController from '../controllers/Departamento.controller.js';
const { insertarDepartamento, listarDepartamentos } = departamentoController;

import empresa_proveedoraController from '../controllers/Empresa_proveedora.controller.js';
const { addEmpresaProveedora, empresasProveedoras } = empresa_proveedoraController;

import empresa_siloController from '../controllers/Empresa_silo.controller.js';
const { empresas_silos, addEmpresaSilo, empresasSilos } = empresa_siloController;

import entrega_cargaController from '../controllers/Entrega_carga.controller.js';
const { addEntrega_cargas, entrega_cargas, entrega_cargasInfo, entrega_cargasUpdate, entrega_cargasDelete, AddVendidoEntregaCarga,entrega_cargasParaIngreso } = entrega_cargaController;

import paisController from '../controllers/Pais.controller.js';
const {  insertarPais, listarPaises } = paisController;

import producto_parcelaController from '../controllers/Producto_parcela.controller.js';
const { productosParcelas, addProductoParcela, productoParcelaEdit, productoParcela, productoParcelaUpdate, eliminarProductoParcela } = producto_parcelaController;

import productoController from '../controllers/Producto.controller.js';
const { addProducto, productos, productoEdit, producto, productoUpdate, eliminarProducto, addStockProducto } = productoController;

import tipo_productoController from '../controllers/Tipo_producto.controller.js';
const { tiposProductos } = tipo_productoController;

import unidad_medidaController from '../controllers/Unidad_medida.controller.js';
const { unidadesMedida } = unidad_medidaController;

import tipo_trabajoController from '../controllers/Tipo_trabajo.controller.js';
const { editTipoTrabajo, addTipoTrabajo, listarTipo_Trabajo, borrarTipo_Trabajo, editTipo_Trabajo, infoTipo_Trabajo } = tipo_trabajoController;

import zafraController from '../controllers/Zafra.controller.js';
const { addZafra, listarZafra, borrarZafra, editZafra, editZafraInfo } = zafraController;

import stock_siloController from '../controllers/Stock_silo.controller.js';
const { AddStockSilo, VerStockSilo, VerStockSiloPorId, VerStockSiloPorEmpresa, AddCantidadStockSilo } = stock_siloController;

import ingresoController from '../controllers/Ingreso.controller.js';
const { AddIngreso, ListarIngreso, ingresoEdit, ingreso, ingresoDelete } = ingresoController;

import egresoController from '../controllers/Egreso.controller.js';
const { ListarEgresos } = egresoController;

import totalController from '../controllers/Totales.controller.js';
const { totalIngresos, totalEgresos, totalDiferencias } = totalController;

import auditoriaController from '../controllers/Auditoria.controller.js';
const { insertarAuditoria, listarAuditoria } = auditoriaController;

import {verifyUser} from '../middleware/verifyUser.js';
//Marca 
router.post('/addMarca',verifyUser, addMarca) 
router.get('/listarMarcas',verifyUser, listarMarcas)
router.put('/borrarMarca/:id',verifyUser, borrarMarca)
router.get('/EditMarca/:id',verifyUser, editMarca)
router.put('/EditMarca/:id', verifyUser,actualizarMarca, verifyUser,)
//Parcela
router.get('/parcelas', verifyUser, parcelas) 
router.get('/Listarparcelas', verifyUser, listarparcelas)
router.post('/addParcela', verifyUser, addParcela)
router.put('/borrarParcela/:id', verifyUser, borrarParcela)
router.put('/EditParcela/:id', verifyUser, editParcela) 
router.get('/parcelaPorId/:id', verifyUser, parcelaPorId) 
router.post('/savePolygon', verifyUser, savePolygon) 
router.get('/getCoordinates', verifyUser, getCoordinates) 
//Barrio
router.post('/insertarBarrio', verifyUser, insertarBarrio)
router.get('/listarBarrios', verifyUser, listarBarrios)
router.put('/EditBarrio/:id', verifyUser, editBarrio)
//Calidad_grano
router.get('/calidades_granos', verifyUser, calidades_granos)
router.post('/addCalidadGrano', verifyUser, addCalidadGrano)
router.get('/listarCalidadesGranos', verifyUser, listarCalidadesGranos)
//Ciudad
router.post('/insertarCiudad', verifyUser, insertarCiudad)
router.get('/listarCiudades', verifyUser, listarCiudades)
router.put('/EditCiudad/:id', verifyUser, editCiudad)
//Departamento
router.post('/insertarDepartamento', verifyUser, insertarDepartamento)
router.get('/listarDepartamentos', verifyUser, listarDepartamentos)
//Empresa_proveedora
router.post('/AddEmpresaProveedora', verifyUser, addEmpresaProveedora)
router.get('/empresasProveedoras', verifyUser, empresasProveedoras)
//Empresa silo
router.get('/empresas_silos', verifyUser, empresas_silos)//No 
router.post('/AddEmpresaSilo', verifyUser, addEmpresaSilo)
router.get('/empresasSilos', verifyUser, empresasSilos)
//Entrega_carga
router.post('/entrega_cargas', verifyUser, addEntrega_cargas)
router.get('/entrega_cargas', verifyUser, entrega_cargas)
router.get('/entrega_cargas/:id', verifyUser, entrega_cargasInfo)
router.put('/entrega_cargas/:id', verifyUser, entrega_cargasUpdate)
router.put('/entrega_cargasDelete/:id', verifyUser, entrega_cargasDelete)
router.put('/AddVendidoEntregaCarga/:id', verifyUser, AddVendidoEntregaCarga)
router.get('/entrega_cargasParaIngreso', verifyUser, entrega_cargasParaIngreso)
//Pais
router.post('/insertarPais', verifyUser, insertarPais)
router.get('/listarPaises', verifyUser, listarPaises)
//Producto_parcela
router.get('/productosParcelas', verifyUser, productosParcelas)
router.post('/AddProductoParcela', verifyUser, addProductoParcela)
router.get('/productoParcelaEdit/:id', verifyUser, productoParcelaEdit)
router.get('/productoParcela', verifyUser, productoParcela)
router.put('/productoParcela/:id', verifyUser, productoParcelaUpdate)
router.put('eliminarProductoParcela/:id', verifyUser, eliminarProductoParcela)
//Producto
router.post('/AddProducto', verifyUser, addProducto)
router.get('/productos', verifyUser, productos)
router.get('/productoEdit/:id', verifyUser, productoEdit)
router.get('/producto/:id', verifyUser, producto)
router.put('/producto/:id', verifyUser, productoUpdate)
router.put('/eliminarProducto/:id', verifyUser, eliminarProducto)
router.post('/AddStockProducto', verifyUser, addStockProducto)
//Tipo_producto
router.get('/tiposProductos', verifyUser, tiposProductos)
//Tipo_trabajo
router.put('/EditTipoTrabajo/:id', verifyUser, editTipoTrabajo)
router.post('/AddTipoTrabajo', verifyUser, addTipoTrabajo)
router.get('/listarTipo_Trabajo', verifyUser, listarTipo_Trabajo)
router.put('/borrarTipo_Trabajo/:id', verifyUser, borrarTipo_Trabajo)
router.put('/EditTipo_Trabajo/:id', verifyUser, editTipo_Trabajo)
router.get('/InfoTipo_Trabajo/:id', verifyUser, infoTipo_Trabajo)
//Unidad_medida
router.get('/unidadesMedida', verifyUser, unidadesMedida)
//Zafra
router.post('/AddZafra', verifyUser, addZafra)
router.get('/listarZafra', verifyUser, listarZafra)
router.put('/borrarZafra/:id', verifyUser, borrarZafra)
router.put('/EditZafra/:id', verifyUser, editZafra)
router.get('/EditZafra/:id', verifyUser, editZafraInfo)
//Stock_silo
router.post('/AddStockSilo', verifyUser, AddStockSilo)
router.get('/VerStockSilo', verifyUser, VerStockSilo)
router.get('/VerStockSiloPorId',verifyUser,VerStockSiloPorId)
router.get('/VerStockSiloPorEmpresa/:id',verifyUser,VerStockSiloPorEmpresa)
router.put('/AddCantidadStockSilo/:id', verifyUser, AddCantidadStockSilo)
//Ingreso
router.post('/AddIngreso', verifyUser, AddIngreso)
router.get('/ListarIngreso', verifyUser, ListarIngreso)
router.get('/ingresoEdit/:id', verifyUser, ingresoEdit)
router.put('/ingreso/:id', verifyUser, ingreso)
router.put('/ingresoDelete/:id', verifyUser, ingresoDelete)
//Egreso
router.get('/ListarEgresos', verifyUser, ListarEgresos)
//Total
router.get('/totalIngresos', verifyUser, totalIngresos)
router.get('/totalEgresos', verifyUser, totalEgresos)
router.get('/totalDiferencias', verifyUser, totalDiferencias)
//Auditoria
router.post('/insertarAuditoria', verifyUser, insertarAuditoria)
router.get('/listarAuditoria', verifyUser, listarAuditoria)



export default router
