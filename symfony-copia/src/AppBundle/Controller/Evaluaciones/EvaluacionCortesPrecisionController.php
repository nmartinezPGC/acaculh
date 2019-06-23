<?php

namespace AppBundle\Controller\Evaluaciones;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
use BackendBundle\Entity\TblEvaluacionCortePrecision;

/**
 * Description of EvaluacionAlumnoController
 *
 * @author Nahum Martinez
 */
class EvaluacionCortesPrecisionController extends Controller {

    /**
     * @Route("/evaluaciones/all-list-evaluaciones", name="/evaluaciones/all-list-evaluaciones")
     * Creacion del Controlador: Listado de todas las Evaluaciones Registradas
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001
     */
    public function EvaluacionAllListAction(Request $request) {
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

            $em = $this->getDoctrine()->getManager();

            $dql = $em->createQuery('SELECT DISTINCT B.idAlumno, B.codAlumno, '
                    . 'B.celular, B.telefono, B.email, '
                    . "CONCAT( B.nombre1, ' ', B.nombre2) as nombres, "
                    . "CONCAT( B.apellido1, ' ', B.apellido2) as apellidos, "
                    . " ( CASE WHEN A.notaFinal IS NULL THEN 0 ELSE A.notaFinal  END ) as EvaluacionCocinaPractica, "
                    . " ( CASE WHEN C.notaFinal IS NULL THEN 0 ELSE C.notaFinal  END ) as EvaluacionCortePrecision, "
                    . " ( CASE WHEN D.notaFinal IS NULL THEN 0 ELSE D.notaFinal  END ) as EvaluacionPlato, "
                    . " ( CASE WHEN E.notaFinal IS NULL THEN 0 ELSE E.notaFinal  END ) as EvaluacionQueso "
                    //. "A.notaFinal as EvaluacionCocinaPractica, "
                    //. "C.notaFinal as EvaluacionCortePrecision "
                    . 'FROM BackendBundle:TblEvaluacionCocinaPractica A '
                    . 'LEFT JOIN BackendBundle:TblAlumno B WITH B.idAlumno = A.idAlumno '
                    . 'LEFT JOIN BackendBundle:TblEvaluacionCortePrecision C WITH C.idAlumno = B.idAlumno '
                    . 'LEFT JOIN BackendBundle:TblEvaluacionPlato D WITH D.idAlumno = B.idAlumno '
                    . 'LEFT JOIN BackendBundle:TblEvaluacionQueso E WITH E.idAlumno = B.idAlumno '
                    // . 'WHERE A.idAlumno = B.idAlumno '
                    // . 'AND A.idEstadoPago IN (3, 5, 6 ) '
                    // . 'GROUP BY A.idAlumno '
                    . 'ORDER BY A.idAlumno ');

            // Ejecucion del Query
            $evaluacionesAllList = $dql->getResult();

            // Total de Alumnos
            $countEvaluaciones = count($evaluacionesAllList);

            // Condicion de la Busqueda
            if ($countEvaluaciones >= 1) {
                $data = array(
                    "status" => "success",
                    "code" => 200,
                    "totalRecord" => $countEvaluaciones,
                    "msg" => "Detalle de todas las Evaluaciones Practicas de los Alumnos",
                    "data" => $evaluacionesAllList
                );
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "No existe Datos en la Tabla de Evaluaciones !!"
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

// FIN | FND00001

    /**
     * @Route("/evaluaciones/list-evaluacion-corte-precision", name="/evaulaciones/list-evaluacion-corte-precision")
     * Creacion del Controlador: Listado de la Informacion de la Evaluacion del Alumno
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.1
     * Funcion: FND00001.1
     */
    public function EvaluacionCortePrecisionByAlumnoListAction(Request $request) {
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
                $id_Alumno = ($params->idAlumno != null) ? $params->idAlumno : 0;

                $em = $this->getDoctrine()->getManager();

                // Query para Obtener la Evaluacion Practica del Alumno de la Tabla: TblEvaluacionCortePrecision
                $evalCorteConsulta = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findBy(
                        array(
                            "idAlumno" => $id_Alumno
                        )
                );

                $countEvalCortes = count($evalCorteConsulta);

                // Condicion de la Busqueda
                if ($countEvalCortes >= 1) {
                    $data = array(
                        "status" => "success",
                        "code" => 200,
                        "totalRecord" => $countEvalCortes,
                        "msg" => "Se han encontrado informacion de Evaluacion de Cortes e Precision del Alumno",
                        "data" => $evalCorteConsulta
                    );
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "No existe Datos en la Tabla de Evaluacion Cortes de Precision, para este Alumno!!"
                    );
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Evaluacion Practica no encontrada, falta ingresar los parametros !!"
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

// FIN | FND00001.1

    /**
     * @Route("/evaluaciones/evaluacion-cocina-practica", name="/evaluaciones/evaluacion-cocina-practica")
     * Creacion del Controlador: Listado de todas las Evaluaciones Registradas
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.1
     */
    public function EvaluacionCocinaPracticaListAlumnoAction(Request $request) {
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

            $em = $this->getDoctrine()->getManager();

            // Parametros de la Consulta
            $id_Alumno = $request->query->getInt("idAlumno", null);

            $dql = $em->createQuery('SELECT B.idAlumno, B.codAlumno, '
                    . 'B.celular, B.email, '
                    . "CONCAT( B.nombre1, ' ', B.nombre2) as nombres, "
                    . "CONCAT( B.apellido1, ' ', B.apellido2) as apellidos, "
                    . 'COUNT(A.idPago) NoPagos, '
                    . 'SUM (A.montoPago) TotalPagos '
                    . 'FROM BackendBundle:TblPago A '
                    . 'INNER JOIN BackendBundle:TblAlumno B WITH B.idAlumno = A.idAlumno '
                    . 'WHERE A.idAlumno = B.idAlumno '
                    . 'AND A.idEstadoPago IN (3, 5, 6 ) '
                    . 'GROUP BY A.idAlumno '
                    . 'ORDER BY A.idAlumno ');

            // Ejecucion del Query
            $alumnoPagoAllList = $dql->getResult();

            // Total de Alumnos
            $countPagosAlumno = count($alumnoPagoAllList);

            // Condicion de la Busqueda
            if ($countPagosAlumno >= 1) {
                $data = array(
                    "status" => "success",
                    "code" => 200,
                    "totalRecord" => $countPagosAlumno,
                    "msg" => "Se han encontrado " . $countPagosAlumno . " realizados por el Alumno",
                    "data" => $alumnoPagoAllList
                );
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "No existe Datos en la Tabla de Pagos asociaos al Alumno !!"
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

// FIN | FND00001.1

    /**
     * @Route("/evaluaciones/new-evaluacion-cortes-precision", name="/evaluaciones/new-evaluacion-cortes-precision")
     * Creacion del Controlador: Nuevo Pago de Evaluacion Cocina Practica
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00002
     */
    public function NewEvaluacionCortesPrecisionAction(Request $request) {
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
            "msg" => "No se ha podido ingresar la Evaluacion, presenta problemas",
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
                $codEval_cocina_practica = ($params->codEvalCocinaCortePrecision != null) ? $params->codEvalCocinaCortePrecision : null;

                // Datos Generales
                $id_Plato = ($params->idPlato != null) ? $params->idPlato : null;
                $id_Instructor = ($params->idInstructor != null) ? $params->idInstructor : null;
                $id_Alumno = ($params->idAlumno != null) ? $params->idAlumno : null;

                // Evaluaciones
                $higiene_GeneralObs = ($params->higieneGeneralObs != null) ? $params->higieneGeneralObs : null;
                $higiene_GeneralNota = ($params->higieneGeneralNota != null) ? $params->higieneGeneralNota : null;
                $correcto_UniformeObs = ($params->correctoUniformeObs != null) ? $params->correctoUniformeObs : null;
                $correcto_Uniformenota = ($params->correctoUniformeNota != null) ? $params->correctoUniformeNota : null;
                $filo_Cuchillo_Obs = ($params->filoCuchilloObs != null) ? $params->filoCuchilloObs : null;
                $filo_Cuchillo_Nota = ($params->filoCuchilloNota != null) ? $params->filoCuchilloNota : null;
                $tecnica_Cuchill_oObs = ($params->tecnicaCuchilloObs != null) ? $params->tecnicaCuchilloObs : null;
                $tecnica_Cuchillo_Nota = ($params->tecnicaCuchilloNota != null) ? $params->tecnicaCuchilloNota : null;
                $medidas_Cortes_Obs = ($params->medidasCortesObs != null) ? $params->medidasCortesObs : null;
                $medidas_Cortes_Nota = ($params->medidasCortesNota != null) ? $params->medidasCortesNota : null;
                $tecnicapeso_Corte_Obs = ($params->tecnicapesoCorteObs != null) ? $params->tecnicapesoCorteObs : null;
                $tecnicapeso_Corte_Nota = ($params->tecnicapesoCorteNota != null) ? $params->tecnicapesoCorteNota : null;

                $limpieza_Obs = ($params->limpiezaObs != null) ? $params->limpiezaObs : null;
                $limpieza_Nota = ($params->limpiezaNota != null) ? $params->limpiezaNota : null;

                $nota_Final = ($params->notaFinal != null) ? $params->notaFinal : null;

                $fecha_ingreso = new \DateTime('now');

                $hora_ingreso = new \DateTime('now');
                $hora_ingreso->format('H:i');

                // Evaluamos que el Codigo de la Evaluacion no se vacio
                if ($id_Alumno != NULL && $id_Instructor != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Instanciamos de la Clase TblSecuenciales | Evaluacion
                    $secuenciaUsar = 'SEC-EVCR';

                    $secuenciaEvaluacionAlumno = $em->getRepository("BackendBundle:TblSecuenciales")->findOneBy(
                            array(
                                "codSecuencia" => $secuenciaUsar
                    ));
                    $codEval_cocina_practica = $secuenciaUsar . $secuenciaEvaluacionAlumno->getValor1();

                    // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                    $isset_cod_evaluacion = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                            array(
                                // "codEvalCocinaPractica" => $codEval_cocina_practica
                                "idAlumno" => $id_Alumno
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_cod_evaluacion == NULL) {
                        // Seteo de Datos Generales de la tabla: TblEvaluacionCortePrecision
                        $ingresoEvaluacionNew = new TblEvaluacionCortePrecision();

                        // Codigo de la Evaluacion
                        $ingresoEvaluacionNew->setCodEvaluacionCortePrecision($codEval_cocina_practica);
                        // Aumentamos el Valor de l Secuencia
                        $secuenciaEvaluacionAlumno->setValor1($secuenciaEvaluacionAlumno->getValor1() + 1);

                        // Buscamos el Id de la Secuencia y Generamos el Codigo
                        // Datos Evaluacion
                        $ingresoEvaluacionNew->setHigieneGeneralObs($higiene_GeneralObs);
                        $ingresoEvaluacionNew->setHigieneGeneralNota($higiene_GeneralNota);
                        $ingresoEvaluacionNew->setUniformeCompletoObs($correcto_UniformeObs);
                        $ingresoEvaluacionNew->setUniformeCompletoNota($correcto_Uniformenota);
                        $ingresoEvaluacionNew->setFiloCuchilloObs($filo_Cuchillo_Obs);
                        $ingresoEvaluacionNew->setFiloCuchilloNota($filo_Cuchillo_Nota);
                        $ingresoEvaluacionNew->setTecnicaCuchilloObs($tecnica_Cuchill_oObs);
                        $ingresoEvaluacionNew->setTecnicaCuchilloNota($tecnica_Cuchillo_Nota);
                        $ingresoEvaluacionNew->setPesoCorteObs($tecnicapeso_Corte_Obs);
                        $ingresoEvaluacionNew->setPesoCorteNota($tecnicapeso_Corte_Nota);

                        $ingresoEvaluacionNew->setLimpiezaObs($limpieza_Obs);
                        $ingresoEvaluacionNew->setLimpiezaNota($limpieza_Nota);
                        $ingresoEvaluacionNew->setMedidasCortesObs($medidas_Cortes_Obs);
                        $ingresoEvaluacionNew->setMedidasCortesNota($medidas_Cortes_Nota);

                        $ingresoEvaluacionNew->setNotaFinal($nota_Final);

                        // Variables de Otras Tablas, las Buscamos para saber si hay Integridad                
                        $platoEvaluacion = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                                array(
                                    "idPlato" => $id_Plato
                        ));
                        $ingresoEvaluacionNew->setIdPlato($platoEvaluacion);

                        $instructorEvaluacion = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_Instructor
                        ));
                        $ingresoEvaluacionNew->setIdInstructor($instructorEvaluacion); // Set Entidad de Instructor                      

                        $alumnoEvaluacion = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                                array(
                                    "idAlumno" => $id_Alumno
                        ));
                        $ingresoEvaluacionNew->setIdAlumno($alumnoEvaluacion); // Set Entidad de Alumno
                        // Instanciamos de la Clase TblEstado
                        $estadoEvaluacion = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => 12
                        ));
                        $ingresoEvaluacionNew->setIdEstado($estadoEvaluacion);

                        // Datos de Bitacora
                        $ingresoEvaluacionNew->setFechaEvaluacion($fecha_ingreso);
                        $ingresoEvaluacionNew->setHoraEvaluacion($hora_ingreso);

                        // Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($ingresoEvaluacionNew);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();


                        // Envio de Correo despues de la Grabacion de Datos
                        // *****************************************************
                        //Instanciamos de la Clase TblUsuario, para Obtener
                        // los Datos de envio de Mail **************************
                        $usuario_asignado_send = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_Instructor
                        ));

                        $alumno_asignado_send = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                                array(
                                    "idAlumno" => $id_Alumno
                        ));

                        // Parametros de Salida                        
                        //Creamos la instancia con la configuración
                        $transport = \Swift_SmtpTransport::newInstance()
                                ->setHost('smtp.gmail.com')
                                ->setPort(587)
                                ->setEncryption('tls')
                                ->setStreamOptions(array(
                                    'ssl' => array(
                                        'allow_self_signed' => true,
                                        'verify_peer' => false,
                                        'verify_peer_name' => false
                                    )
                                        )
                                )
                                ->setUsername("nahum.sreci@gmail.com")
                                ->setPassword('1897Juve')
                                ->setTimeout(180);
                        //echo "Paso 1";
                        //Creamos la instancia del envío
                        $mailer = \Swift_Mailer::newInstance($transport);

                        //Creamos el mensaje
                        $mail = \Swift_Message::newInstance()
                                ->setSubject('Notificación de Ingreso de Evaluacion | ACACULH')
                                ->setFrom(array("nahum.sreci@gmail.com" => "Academia Culinaria Hondureña | ACACULH"))
                                ->setTo($alumno_asignado_send->getEmail())
                                //->addCc([ $setTo_array_convertIn ])
                                ->setBody(
                                $this->renderView(
                                        'Emails/sendMailEvaluacionCortesPrecision.html.twig', array('nombreAlumno' => $alumno_asignado_send->getNombre1(),
                                    'apellidoAlumno' => $alumno_asignado_send->getApellido1(),
                                    'obsHigieneGeneral' => $higiene_GeneralObs, 'notaHigieneGeneral' => $higiene_GeneralNota,
                                    'obsLimpieza' => $limpieza_Obs, 'notaLimpieza' => $limpieza_Nota,
                                    'obsUniformeCorrecto' => $correcto_UniformeObs, 'notaUniformeCorrecto' => $correcto_Uniformenota,
                                    'obsFiloCuchillo' => $filo_Cuchillo_Obs, 'notaFiloCuchillo' => $filo_Cuchillo_Nota,
                                    'obsTecnicaCuchillo' => $tecnica_Cuchill_oObs, 'notaTecnicaCuchillo' => $tecnica_Cuchillo_Nota,
                                    'obsMedidasCortes' => $medidas_Cortes_Obs, 'notaMedidasCortes' => $medidas_Cortes_Nota,
                                    'obsTecnicaPeso' => $tecnicapeso_Corte_Obs, 'notaTecnicaPeso' => $tecnicapeso_Corte_Nota,
                                    'obsLimpieza' => $limpieza_Obs, 'notaLimpieza' => $limpieza_Nota,
                                    'obsNotaFinal' => "Sumatoria de Calificaciones / 6", 'notaNotaFinal' => $nota_Final,
                                        )
                                ), 'text/html');

                        // Envia el Correo con todos los Parametros
                        $resuly = $mailer->send($mail);
                        // ***** Fin de Envio de Correo ****************************
                        // 
                        // 
                        //Consulta de la Evaluacion recien Ingresado *******************
                        $evaluacionConsulta = $em->getRepository("BackendBundle:TblEvaluacionCocinaPractica")->findOneBy(
                                array(
                                    "codEvalCocinaPractica" => $codEval_cocina_practica
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha ingresado la Evaluacion con el Codigo: " . $codEval_cocina_practica
                            . " con una Nota Final de: " . $nota_Final,
                            "data" => $evaluacionConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, ya existe una Evaluacion de Cocina Practica para este Alumno",
                            "data" => $isset_cod_evaluacion
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Evaluacion de Cocina Practica no creada, falta ingresar los parametros !!"
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

// FIN | FND00002

    /**
     * @Route("/evaluaciones/edit-evaluacion-cocina-practica", name="/evaluaciones/edit-evaluacion-cocina-practica")
     * Creacion del Controlador: Nuevo Pago de Evaluacion Cocina Practica
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00003
     */
    public function EditEvaluacionCocinaPracticaAction(Request $request) {
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
            "msg" => "No se ha podido ingresar la Evaluacion, presenta problemas",
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
                $codEval_cocina_practica = ($params->codEvalCocinaPractica != null) ? $params->codEvalCocinaPractica : null;

                // Datos Generales
                $id_Plato = ($params->idPlato != null) ? $params->idPlato : null;
                $id_Instructor = ($params->idInstructor != null) ? $params->idInstructor : null;
                $id_Alumno = ($params->idAlumno != null) ? $params->idAlumno : null;

                // Evaluaciones
                $higiene_GeneralObs = ($params->higieneGeneralObs != null) ? $params->higieneGeneralObs : null;
                $higiene_GeneralNota = ($params->higieneGeneralNota != null) ? $params->higieneGeneralNota : null;
                $correcto_UniformeObs = ($params->correctoUniformeObs != null) ? $params->correctoUniformeObs : null;
                $correcto_Uniformenota = ($params->correctoUniformenota != null) ? $params->correctoUniformenota : null;
                $hora_EntregaObs = ($params->horaEntregaObs != null) ? $params->horaEntregaObs : null;
                $hora_EntregaNota = ($params->horaEntregaNota != null) ? $params->horaEntregaNota : null;
                $flujo_TrabajoObs = ($params->flujoTrabajoObs != null) ? $params->flujoTrabajoObs : null;
                $flujo_TrabajoNota = ($params->flujoTrabajoNota != null) ? $params->flujoTrabajoNota : null;
                $sabor_Obs = ($params->saborObs != null) ? $params->saborObs : null;
                $sabor_Nota = ($params->saborNota != null) ? $params->saborNota : null;
                $textura_Obs = ($params->texturaObs != null) ? $params->texturaObs : null;
                $textura_Nota = ($params->texturaNota != null) ? $params->texturaNota : null;
                $tecnica_Obs = ($params->tecnicaObs != null) ? $params->tecnicaObs : null;
                $tecnica_nota = ($params->tecnicaNota != null) ? $params->tecnicaNota : null;
                $limpieza_Obs = ($params->limpiezaObs != null) ? $params->limpiezaObs : null;
                $limpieza_Nota = ($params->limpiezaNota != null) ? $params->limpiezaNota : null;
                $armado_Obs = ($params->armadoObs != null) ? $params->armadoObs : null;
                $armado_Nota = ($params->armadoNota != null) ? $params->armadoNota : null;
                $nota_Final = ($params->notaFinal != null) ? $params->notaFinal : null;

                $fecha_ingreso = new \DateTime('now');

                $hora_ingreso = new \DateTime('now');
                $hora_ingreso->format('H:i');

                // Evaluamos que el Codigo de la Evaluacion no se vacio
                if ($id_Alumno != NULL && $id_Instructor != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Instanciamos de la Clase TblSecuenciales | Evaluacion
                    $secuenciaUsar = 'SEC-EVCP';

                    $secuenciaEvaluacionAlumno = $em->getRepository("BackendBundle:TblSecuenciales")->findOneBy(
                            array(
                                "codSecuencia" => $secuenciaUsar
                    ));
                    $codEval_cocina_practica = $secuenciaUsar . $secuenciaEvaluacionAlumno->getValor1();

                    // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                    $isset_cod_evaluacion = $em->getRepository("BackendBundle:TblEvaluacionCocinaPractica")->findOneBy(
                            array(
                                "codEvalCocinaPractica" => $codEval_cocina_practica
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_cod_evaluacion == NULL) {
                        // Seteo de Datos Generales de la tabla: TblEvaluacionCocinaPractica
                        $ingresoEvaluacionNew = new TblEvaluacionCocinaPractica();

                        // Codigo de la Evaluacion
                        $ingresoEvaluacionNew->setCodEvalCocinaPractica($codEval_cocina_practica);
                        // Aumentamos el Valor de l Secuencia
                        $secuenciaEvaluacionAlumno->setValor1($secuenciaEvaluacionAlumno->getValor1() + 1);

                        // Buscamos el Id de la Secuencia y Generamos el Codigo
                        // Datos Evaluacion
                        $ingresoEvaluacionNew->setHigieneGeneralObs($higiene_GeneralObs);
                        $ingresoEvaluacionNew->setHigieneGeneralNota($higiene_GeneralNota);
                        $ingresoEvaluacionNew->setCorrectoUniformeObs($correcto_UniformeObs);
                        $ingresoEvaluacionNew->setCorrectoUniformeNota($correcto_Uniformenota);
                        $ingresoEvaluacionNew->setHoraEntregaObs($hora_EntregaObs);
                        $ingresoEvaluacionNew->setHoraEntregaNota($hora_EntregaNota);
                        $ingresoEvaluacionNew->setFlujoTrabajoObs($flujo_TrabajoObs);
                        $ingresoEvaluacionNew->setFlujoTrabajoNota($flujo_TrabajoNota);
                        $ingresoEvaluacionNew->setSaborObs($sabor_Obs);
                        $ingresoEvaluacionNew->setSaborNota($sabor_Nota);
                        $ingresoEvaluacionNew->setTexturaObs($textura_Obs);
                        $ingresoEvaluacionNew->setTexturaNota($textura_Nota);
                        $ingresoEvaluacionNew->setTecnicaObs($tecnica_Obs);
                        $ingresoEvaluacionNew->setTexturaNota($tecnica_nota);
                        $ingresoEvaluacionNew->setLimpiezaObs($limpieza_Obs);
                        $ingresoEvaluacionNew->setLimpiezaNota($limpieza_Nota);
                        $ingresoEvaluacionNew->setArmadoObs($armado_Obs);
                        $ingresoEvaluacionNew->setArmadoNota($armado_Nota);

                        $ingresoEvaluacionNew->setNotaFinal($nota_Final);

                        // Variables de Otras Tablas, las Buscamos para saber si hay Integridad                
                        $platoEvaluacion = $em->getRepository("BackendBundle:TblPlato")->findOneBy(
                                array(
                                    "idPlato" => $id_Plato
                        ));
                        $ingresoEvaluacionNew->setIdPlato($platoEvaluacion);

                        $instructorEvaluacion = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_Instructor
                        ));
                        $ingresoEvaluacionNew->setIdInstructor($instructorEvaluacion); // Set Entidad de Instructor                      

                        $alumnoEvaluacion = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                                array(
                                    "idAlumno" => $id_Alumno
                        ));
                        $ingresoEvaluacionNew->setIdAlumno($alumnoEvaluacion); // Set Entidad de Alumno
                        // Instanciamos de la Clase TblEstado
                        $estadoEvaluacion = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => 12
                        ));
                        $ingresoEvaluacionNew->setIdEstado($estadoEvaluacion);

                        // Datos de Bitacora
                        $ingresoEvaluacionNew->setFechaEvaluacion($fecha_ingreso);
                        $ingresoEvaluacionNew->setHoraEvaluacion($hora_ingreso);

                        // Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($ingresoEvaluacionNew);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();


                        // Envio de Correo despues de la Grabacion de Datos
                        // *****************************************************
                        //Instanciamos de la Clase TblUsuario, para Obtener
                        // los Datos de envio de Mail **************************
                        $usuario_asignado_send = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_Instructor
                        ));

                        $alumno_asignado_send = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                                array(
                                    "idAlumno" => $id_Alumno
                        ));

                        // Parametros de Salida                        
                        //Creamos la instancia con la configuración
                        $transport = \Swift_SmtpTransport::newInstance()
                                ->setHost('smtp.gmail.com')
                                ->setPort(587)
                                ->setEncryption('tls')
                                ->setStreamOptions(array(
                                    'ssl' => array(
                                        'allow_self_signed' => true,
                                        'verify_peer' => false,
                                        'verify_peer_name' => false
                                    )
                                        )
                                )
                                ->setUsername("nahum.sreci@gmail.com")
                                ->setPassword('1897Juve')
                                ->setTimeout(180);
                        //echo "Paso 1";
                        //Creamos la instancia del envío
                        $mailer = \Swift_Mailer::newInstance($transport);

                        //Creamos el mensaje
                        $mail = \Swift_Message::newInstance()
                                ->setSubject('Notificación de Ingreso de Evaluacion | ACACULH')
                                ->setFrom(array("nahum.sreci@gmail.com" => "Academia Culinaria Hondureña | ACACULH"))
                                ->setTo($alumno_asignado_send->getEmail())
                                //->addCc([ $setTo_array_convertIn ])
                                ->setBody(
                                $this->renderView(
                                        'Emails/sendMailEvaluacionPractica.html.twig', array('nombreAlumno' => $alumno_asignado_send->getNombre1(),
                                    'apellidoAlumno' => $alumno_asignado_send->getApellido1(),
                                    'obsHigieneGeneral' => $higiene_GeneralObs, 'notaHigieneGeneral' => $higiene_GeneralNota,
                                    'obsUniformeCorrecto' => $correcto_UniformeObs, 'notaUniformeCorrecto' => $correcto_Uniformenota,
                                    'obsHoraEntrega' => $hora_EntregaObs, 'notaHoraEntrega' => $hora_EntregaNota,
                                    'obsFlujoTrabajo' => $flujo_TrabajoObs, 'notaFlujoTrabajo' => $flujo_TrabajoNota,
                                    'obsSabor' => $sabor_Obs, 'notaSabor' => $sabor_Nota,
                                    'obsTextura' => $textura_Obs, 'notaTextura' => $textura_Nota,
                                    'obsTecnica' => $tecnica_Obs, 'notaTecnica' => $tecnica_nota,
                                    'obsLimpieza' => $limpieza_Obs, 'notaLimpieza' => $limpieza_Nota,
                                    'obsArmado' => $armado_Obs, 'notaArmado' => $armado_Nota,
                                    'obsNotaFinal' => "Sumatoria de Calificaciones / 9", 'notaNotaFinal' => $nota_Final,
                                        )
                                ), 'text/html');

                        // Envia el Correo con todos los Parametros
                        $resuly = $mailer->send($mail);
                        // ***** Fin de Envio de Correo ****************************
                        // 
                        // 
                        //Consulta de la Evaluacion recien Ingresado *******************
                        $evaluacionConsulta = $em->getRepository("BackendBundle:TblEvaluacionCocinaPractica")->findOneBy(
                                array(
                                    "codEvalCocinaPractica" => $codEval_cocina_practica
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha ingresado la Evaluacion con el Codigo: " . $codEval_cocina_practica
                            . " con una Nota Final de: " . $nota_Final,
                            "data" => $evaluacionConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, ya existe una Evaluacion de Cocina Practica con este Codigo: " . $codEval_cocina_practica,
                            "data" => $isset_cod_evaluacion
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Evaluacion de Cocina Practica no creada, falta ingresar los parametros !!"
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

// FIN | FND00003

    /**
     * @Route("/evaluaciones/aprobar-evaluacion-cortes-precision", name="/evaluaciones/aprobar-evaluacion-cortes-precision")
     * Creacion del Controlador: Aprobar la Nota de Evaluacion Cortes Precision
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00004
     */
    public function AprobarEvaluacionCortesPrecisionAction(Request $request) {
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
            "msg" => "No se ha podido ingresar la Evaluacion, presenta problemas",
            "validToken" => $checkToken,
            "json" => $json
        );

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            // Comprobamos que Json no es Null
            if ($json != null) {
                //Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla
                // var_dump("Dato");
                $codEval_cocina_practica = ($params->codEvalCortePrecision != null) ? $params->codEvalCortePrecision : null;
                $idEval_cocina_practica = ($params->idEvalCortePrecision != 0) ? $params->idEvalCortePrecision : 0;
                $nota_final_obs = ($params->chefNotaFinalObs != null) ? $params->chefNotaFinalObs : null;

                // Evaluamos que el Codigo de la Evaluacion no se vacio
                if ($idEval_cocina_practica != 0 && $codEval_cocina_practica != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                    $isset_cod_evaluacion = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                            array(
                                "codEvaluacionCortePrecision" => $codEval_cocina_practica
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_cod_evaluacion != NULL) {
                        // Seteo de Datos Generales de la tabla: TblEvaluacionCortePrecision
                        // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                        $ingresoEvaluacionNew = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                                array(
                                    "codEvaluacionCortePrecision" => $codEval_cocina_practica
                        ));

                        // Instanciamos de la Clase TblEstado
                        $estadoEvaluacion = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => 13
                        ));
                        $ingresoEvaluacionNew->setIdEstado($estadoEvaluacion);

                        // Obs del Chef
                        $ingresoEvaluacionNew->setChefNotaFinalObs($nota_final_obs);

                        // Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($ingresoEvaluacionNew);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();

                        //Consulta de la Evaluacion recien Ingresado *******************
                        $evaluacionConsulta = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                                array(
                                    "codEvaluacionCortePrecision" => $codEval_cocina_practica
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha Aprobado la Evaluacion con el Codigo: " . $codEval_cocina_practica,
                            "data" => $evaluacionConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, No existe una Evaluacion de Cortes de Precision con este Codigo: " . $codEval_cocina_practica,
                            "data" => $isset_cod_evaluacion
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Evaluacion de Cocina Practica no Aprobada, falta ingresar los parametros !!"
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

// FIN | FND00004

    /**
     * @Route("/evaluaciones/anular-evaluacion-cortes-precision", name="/evaluaciones/anular-evaluacion-cortes-precision")
     * Creacion del Controlador: Aprobar la Nota de Evaluacion Cortes de Precision
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00005
     */
    public function AnularEvaluacionCortesPrecisionAction(Request $request) {
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
            "msg" => "No se ha podido ingresar la Evaluacion, presenta problemas",
            "validToken" => $checkToken,
            "json" => $json
        );

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            // Comprobamos que Json no es Null
            if ($json != null) {
                //Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla              
                $codEval_cocina_practica = ($params->codEvalCortePrecision != null) ? $params->codEvalCortePrecision : null;
                $idEval_cocina_practica = ($params->idEvalCortePrecision != 0) ? $params->idEvalCortePrecision : 0;
                $nota_final_obs = ($params->chefNotaFinalObs != null) ? $params->chefNotaFinalObs : null;

                // Evaluamos que el Codigo de la Evaluacion no se vacio
                if ($idEval_cocina_practica != 0 && $codEval_cocina_practica != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                    $isset_cod_evaluacion = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                            array(
                                "codEvaluacionCortePrecision" => $codEval_cocina_practica
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_cod_evaluacion != NULL) {
                        // Seteo de Datos Generales de la tabla: TblEvaluacionCortePrecision          
                        // Ejecutamos la Consulta por Cod Evaluacion, para validar si existe
                        $ingresoEvaluacionNew = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                                array(
                                    "codEvaluacionCortePrecision" => $codEval_cocina_practica
                        ));

                        // Instanciamos de la Clase TblEstado
                        $estadoEvaluacion = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => 14
                        ));
                        $ingresoEvaluacionNew->setIdEstado($estadoEvaluacion);

                        // Obs del Chef
                        $ingresoEvaluacionNew->setChefNotaFinalObs($nota_final_obs);

                        // Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($ingresoEvaluacionNew);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();

                        //Consulta de la Evaluacion recien Ingresado *******************
                        $evaluacionConsulta = $em->getRepository("BackendBundle:TblEvaluacionCortePrecision")->findOneBy(
                                array(
                                    "codEvaluacionCortePrecision" => $codEval_cocina_practica
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha Anulado la Evaluacion con el Codigo: " . $codEval_cocina_practica,
                            "data" => $evaluacionConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, No existe una Evaluacion de Cortes de Precision con este Codigo: " . $codEval_cocina_practica,
                            "data" => $isset_cod_evaluacion
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Evaluacion de Cocina Practica no Aprobada, falta ingresar los parametros !!"
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

// FIN | FND00005
}
