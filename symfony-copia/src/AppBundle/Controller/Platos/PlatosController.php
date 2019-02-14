<?php

namespace AppBundle\Controller\Platos;

/**
 * Description of PlatosController
 *
 * @author Nahum Martinez
 */
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use BackendBundle\Entity\TblPlato;
use BackendBundle\Entity\TblEvaluacionCocinaPractica;

class PlatosController extends Controller {

    /**
     * @Route("/all-list-platos", name="all-list-platos")
     * Creacion del Controlador: Listado de todos los Platos
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.1
     */
    public function ActiveAllPlatosListAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        // Query para Obtener todos los Platos de la Tabla: TblPlato
        $platosAllList = $em->getRepository("BackendBundle:TblPlato")->findAll();

        // Condicion de la Busqueda
        if (count($platosAllList) >= 1) {
            $data = array(
                "status" => "success",
                "code" => 200,
                "data" => $platosAllList
            );
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "No existe Datos en la Tabla de Platos !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN | FND00001.1

    /**
     * @Route("/platos/all-list-plato", name="/platos/all-list-plato")
     * Creacion del Controlador: Listado de la Informacion del Plato
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.1.2
     * Funcion: FND00001.1.2
     */
    public function ActiveAllAlumnoPagosListAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        //Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            //Convertimos los Parametros POSt a Json
            $json = $request->get("json", null);

            // Comprobamos que Json no es Null
            if ($json != null) {
                // Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla                
                $id_Plato = ($params->idPlato != null) ? $params->idPlato : 0;

                $em = $this->getDoctrine()->getManager();

                // Query para Obtener todos los Platos de la Tabla: TblPlato
                $platosConsulta = $em->getRepository("BackendBundle:TblPlato")->findAll();

                // Condicion de la Busqueda
                if ($platosConsulta >= 1) {
                    $data = array(
                        "status" => "success",
                        "code" => 200,
                        "totalRecord" => $countPagosAlumno,
                        "msg" => "Se han encontrado el Plato: " . $platosConsulta->getNombrePlato() . " encontrado.",
                        "data" => $platosConsulta
                    );
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "No existe Datos en la Tabla de Platos con el Codigo identificado !!"
                    );
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Plato no encontrado, falta ingresar los parametros !!"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "desc" => "El Token, es invalido",
                "code" => 400,
                "msg" => "Autorizacion de Token no valida, tu sesion ha expirado, cierra y vuelve a iniciar. !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN | FND00001.1.1

    /**
     * @Route("/platos/all-list-tipo-platos", name="/platos/all-list-tipo-platos")
     * Creacion del Controlador: Listado de todos los Tipos de Platos
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.2
     */
    public function ActiveAllTiposPlatosListAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        // Query para Obtener todos los Platos de la Tabla: TblTipoPlato
        $platosAllList = $em->getRepository("BackendBundle:TblTipoPlato")->findAll();

        // Condicion de la Busqueda
        if (count($platosAllList) >= 1) {
            $data = array(
                "status" => "success",
                "code" => 200,
                "data" => $platosAllList
            );
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "No existe Datos en la Tabla de Platos !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN | FND00001.2

    /**
     * @Route("/new-plato", name="new-plato")
     * Creacion del Controlador: Nuevo Ingreso de Plato
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.2
     */
    public function NewPlatoAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        //Recoger el Hash
        //Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);

        //Convertimos los Parametros POSt a Json
        $json = $request->get("json", null);

        //Array de Mensajes
        $data = array(
            "status" => "success",
            "code" => 200,
            "msg" => "No se ha podido ingresar el Plato, presenta problemas",
            "validToken" => $checkToken,
            "json" => $json
        );

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            //Comprobamos que Json no es Null
            if ($json != null) {
                //Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla                             
                $cod_plato = ($params->codPlato != null) ? $params->codPlato : null;

                // Datos Generales
                $id_Plato = ($params->idPlato != null) ? $params->idPlato : null;
                $nombre_Plato = ($params->nombrePlato != null) ? $params->nombrePlato : null;
                $descripcion_Plato = ($params->descripcionPlato != null) ? $params->descripcionPlato : null;
                $id_Tipo_Plato = ($params->idTipoPlato != null) ? $params->idTipoPlato : null;
                $estrellas = ($params->calificacionPlato != null) ? $params->calificacionPlato : null;

                $fecha_ingreso = new \DateTime('now');

                $hora_ingreso = new \DateTime('now');
                $hora_ingreso->format('H:i');

                // Evaluamos que el Plato no se vacio
                if ($nombre_Plato != NULL && $id_Tipo_Plato != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Instanciamos de la Clase TblSecuenciales | Plato
                    $secuenciaUsar = 'SEC-PLA';

                    $secuenciaPlato = $em->getRepository("BackendBundle:TblSecuenciales")->findOneBy(
                            array(
                                "codSecuencia" => $secuenciaUsar
                    ));
                    $cod_sec_plato = $secuenciaUsar . $secuenciaPlato->getValor1();

                    // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                    $isset_plato = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                            array(
                                "codPlato" => $cod_sec_plato
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_plato == NULL) {
                        // Seteo de Datos Generales de la tabla: TblPlato
                        $ingresoPlatoNew = new TblPlato();

                        // Buscamos el Id de la Secuencia y Generamos el Codigo
                        $ingresoPlatoNew->setCodPlato($cod_sec_plato);
                        // Aumentamos el Valor de l Secuencia
                        $secuenciaPlato->setValor1($secuenciaPlato->getValor1() + 1);

                        $ingresoPlatoNew->setNombrePlato($nombre_Plato);
                        $ingresoPlatoNew->setDescripcionPlato($descripcion_Plato);
                        $ingresoPlatoNew->setEstrellas($estrellas);

                        // Variables de Otras Tablas, las Buscamos para saber si hay Integridad                
                        $platoEvaluacion = $em->getRepository("BackendBundle:TblTipoPlato")->findOneBy(
                                array(
                                    "idTipoPlato" => $id_Tipo_Plato
                        ));
                        $ingresoPlatoNew->setIdTipoPlato($platoEvaluacion);  // Set Entidad de Tipo Plato
                        // Datos de Bitacora
                        /* $ingresoEvaluacionNew->setFechaIngreso($fecha_ingreso);
                          $ingresoEvaluacionNew->setHoraIngreso($hora_ingreso);
                         */
                        // Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($ingresoPlatoNew);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();


                        //Consulta de la Evaluacion recien Ingresado *******************
                        $platoConsulta = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                                array(
                                    "codPlato" => $cod_plato
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha ingresado el Plato con el Codigo: " . $cod_plato,
                            "data" => $platoConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, ya existe un Plato con este Codigo: " . $cod_plato,
                            "data" => $isset_plato
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Plato no creado, falta ingresar los parametros !!"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "desc" => "El Token, es invalido",
                "code" => 400,
                "msg" => "Autorizacion de Token no valida, tu sesion ha expirado, cierra y vuelve a iniciar. !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN | FND00001.2

    /**
     * @Route("/edit-plato", name="edit-plato")
     * Creacion del Controlador: Nuevo Ingreso de Plato
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.3
     */
    public function EditPlatoAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        //Recoger el Hash
        //Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);

        //Convertimos los Parametros POSt a Json
        $json = $request->get("json", null);

        //Array de Mensajes
        $data = array(
            "status" => "success",
            "code" => 200,
            "msg" => "No se ha podido actualizar el Plato, presenta problemas",
            "validToken" => $checkToken,
            "json" => $json
        );

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            //Comprobamos que Json no es Null
            if ($json != null) {
                //Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla                             
                $id_Plato = ($params->idPlato != null) ? $params->idPlato : null;
                $cod_plato = ($params->codPlato != null) ? $params->codPlato : null;
                $nombre_Plato = ($params->nombrePlato != null) ? $params->nombrePlato : null;
                $descripcion_Plato = ($params->descripcionPlato != null) ? $params->descripcionPlato : null;
                $id_Tipo_Plato = ($params->idTipoPlato != null) ? $params->idTipoPlato : null;
                $estrellas = ($params->calificacionPlato != null) ? $params->calificacionPlato : null;

                $fecha_ingreso = new \DateTime('now');

                $hora_ingreso = new \DateTime('now');
                $hora_ingreso->format('H:i');

                // Evaluamos que el Plato no se vacio
                if ($nombre_Plato != NULL && $id_Tipo_Plato != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                    $isset_plato = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                            array(
                                "codPlato" => $cod_plato
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_plato !== NULL) {
                        // Seteo de Datos Generales de la tabla: TblPlato
                        // $ingresoPlatoNew = new TblPlato();
                        $actualizaPlato = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                                array(
                                    "codPlato" => $cod_plato
                        ));

                        // Buscamos el Id de la Secuencia y Generamos el Codigo
                        $actualizaPlato->setNombrePlato($nombre_Plato);
                        $actualizaPlato->setDescripcionPlato($descripcion_Plato);
                        $actualizaPlato->setEstrellas($estrellas);

                        // Variables de Otras Tablas, las Buscamos para saber si hay Integridad                
                        $platoEvaluacion = $em->getRepository("BackendBundle:TblTipoPlato")->findOneBy(
                                array(
                                    "idTipoPlato" => $id_Tipo_Plato
                        ));
                        $actualizaPlato->setIdTipoPlato($platoEvaluacion);  // Set Entidad de Tipo Plato
                        // Datos de Bitacora
                        /* $ingresoEvaluacionNew->setFechaIngreso($fecha_ingreso);
                          $ingresoEvaluacionNew->setHoraIngreso($hora_ingreso);
                         */
                        // Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($actualizaPlato);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();


                        //Consulta de la Evaluacion recien Ingresado *******************
                        $platoConsulta = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                                array(
                                    "codPlato" => $cod_plato
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha actualizado el Plato con el Codigo: " . $cod_plato,
                            "data" => $platoConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, no existe un Plato con este Codigo: " . $cod_plato,
                            "data" => $isset_plato
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Plato no creado, falta ingresar los parametros !!"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "desc" => "El Token, es invalido",
                "code" => 400,
                "msg" => "Autorizacion de Token no valida, tu sesion ha expirado, cierra y vuelve a iniciar. !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN | FND00001.3
}
