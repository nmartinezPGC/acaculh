<?php

namespace AppBundle\Controller\Pagos;

use BackendBundle\Entity\TblAlumno;
use BackendBundle\Entity\TblPago;
/**
 * Description of PagoController
 *
 * @author Nahum Martinez
 */
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

class PagosController extends Controller {

    /**
     * @Route("pagos/all-list-pagos", name="pagos/all-list-pagos")
     * Creacion del Controlador: Listado de todos los Pagos de Alumnos
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.1
     */
    public function ActiveAllPagosListAction(Request $request) {
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
     * @Route("pagos/all-list-alumno-pagos", name="pagos/all-list-alumno-pagos")
     * Creacion del Controlador: Listado de todos los Pagos de Alumnos
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.2
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
                $id_Alumno = ($params->idAlumno != null) ? $params->idAlumno : 0;


                $em = $this->getDoctrine()->getManager();

                $opt = 0;

                if ($id_Alumno != 0 || $id_Alumno != null) {
                    $opt = 1;
                    $dql = $em->createQuery('SELECT A.idPago, A.codDocumento, A.descripcionPago, '
                                    . "DATE_SUB(A.fechaPago, 0, 'DAY') AS fechaPago, "
                                    . "DATE_SUB(A.horaPago, 0, 'DAY') AS horaPago, "
                                    . 'B.idTipoPago, B.descTipoPago, C.idFormaPago, C.descFormaPago, '
                                    . 'D.descripcionEstado, '
                                    . 'A.montoPago '
                                    . 'FROM BackendBundle:TblPago A '
                                    . 'INNER JOIN BackendBundle:TblTipoPago B WITH B.idTipoPago = A.idTipoPago '
                                    . 'INNER JOIN BackendBundle:TblFormaPago C WITH C.idFormaPago = A.idFormaPago '
                                    . 'INNER JOIN BackendBundle:TblEstado D WITH D.idEstado = A.idEstadoPago '
                                    . 'WHERE A.idAlumno = :idAlumno '
                                    . 'AND A.idEstadoPago IN (3, 5, 6 ) '
                                    . 'ORDER BY A.idPago ')
                            ->setParameter('idAlumno', $id_Alumno);
                }

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
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Alumno no creado, falta ingresar los parametros !!"
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
     * @Route("/new-pago-alumno", name="new-pago-alumno")
     * Creacion del Controlador: Nuevo Pago de Alumno
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00002
     */
    public function NewPagoAlumnoAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        // Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);

        // Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            //Convertimos los Parametros POSt a Json
            $json = $request->get("json", null);

            // Comprobamos que Json no es Null
            if ($json != null) {
                //Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla                
                $id_alumno = ($params->idAlumno != null) ? $params->idAlumno : 0;
                $cod_alumno = ($params->codAlumno != null) ? $params->codAlumno : null;
                $nombre1 = ($params->nombres != null) ? $params->nombres : null;
                $apellido1 = ($params->apellidos != null) ? $params->apellidos : null;
                $email_alumno = ($params->email != null) ? $params->email : null;
                $celular_alumno = ($params->celular != null) ? $params->celular : null;

                // Datos Relaciones
                $id_usuario_pago = ($params->idUsuarioPago != null) ? $params->idUsuarioPago : 0;
                $id_estado = ($params->idEstado != null) ? $params->idEstado : 0;

                $id_forma_pago = ($params->idFormaPago != null) ? $params->idFormaPago : 0;
                $id_tipo_pago = ($params->idTipoPago != null) ? $params->idTipoPago : 0;
                $monto_pago = ($params->montoPago != null) ? $params->montoPago : 0;
                $descripcion_pago = ($params->descripcionPago != null) ? $params->descripcionPago : null;

                $fecha_ingreso = new \DateTime('now');

                $hora_ingreso = new \DateTime('now');
                $hora_ingreso->format('H:i');

                // Evaluamos que el Codigo del Alumno no se vacio
                if ($id_alumno != NULL && $monto_pago != 0) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Ejecutamos la Consulta por Cod Alumno, para validar si el Alumno existe
                    $isset_cod_alumno = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                            array(
                                "idAlumno" => $id_alumno
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if (($isset_cod_alumno != NULL)) {

                        // *****************************************************
                        // Ingreso del Pago del Alumno en la Tabla: TblPago                 
                        // Seteo de Datos Generales de la tabla: TblPago
                        $pagoAlumnoSec = new TblPago();

                        // Ejecutamos la Consulta por Id Usuario, para ingresar el Pago de la Matricula
                        $pagoUsuario = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_usuario_pago
                        ));
                        $pagoAlumnoSec->setIdUsuario($pagoUsuario);

                        // Ejecutamos la Consulta por Cod Alumno, para ingresar el Pago de la Matricula
                        $pagoAlumno = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                                array(
                                    "idAlumno" => $id_alumno
                        ));
                        $pagoAlumnoSec->setIdAlumno($pagoAlumno);

                        // Instanciamos de la Clase TblEstado
                        $estadoPagoAlumno = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => 3 // Recibido
                        ));
                        $pagoAlumnoSec->setIdEstadoPago($estadoPagoAlumno);

                        // Instanciamos de la Clase TblFormaPago
                        $formaPagoAlumno = $em->getRepository("BackendBundle:TblFormaPago")->findOneBy(
                                array(
                                    "idFormaPago" => $id_forma_pago
                        ));
                        $pagoAlumnoSec->setIdFormaPago($formaPagoAlumno);

                        // Instanciamos de la Clase TblTipoPago
                        $tipoPagoAlumno = $em->getRepository("BackendBundle:TblTipoPago")->findOneBy(
                                array(
                                    "idTipoPago" => $id_tipo_pago
                        ));
                        $pagoAlumnoSec->setIdTipoPago($tipoPagoAlumno);

                        // Condicionamos el Secuencial a usar
                        $secuenciaUsar = null;

                        if ($tipoPagoAlumno->getDescTipoPago() == "Matricula") {
                            $secuenciaUsar = 'SEC-PAMA';
                        } else if ($tipoPagoAlumno->getDescTipoPago() == "Mensualidad") {
                            $secuenciaUsar = 'SEC-PAME';
                        } else {
                            $secuenciaUsar = 'SEC-POTR';
                        }

                        // Instanciamos de la Clase TblSecuenciales | Pago de Matricula
                        $secuenciaPagoAlumno = $em->getRepository("BackendBundle:TblSecuenciales")->findOneBy(
                                array(
                                    "codSecuencia" => $secuenciaUsar
                        ));
                        $pagoAlumnoSec->setCodDocumento($secuenciaUsar . $secuenciaPagoAlumno->getValor1());
                        // Aumentamos el Valor de l Secuencia
                        $secuenciaPagoAlumno->setValor1($secuenciaPagoAlumno->getValor1() + 1);

                        $pagoAlumnoSec->setFechaPago($fecha_ingreso);
                        $pagoAlumnoSec->setHoraPago($hora_ingreso);
                        $pagoAlumnoSec->setConceptoPago('Pago de : ' . $tipoPagoAlumno->getDescTipoPago() .
                                ' por valor de : ' . $monto_pago);
                        $pagoAlumnoSec->setDescripcionPago($descripcion_pago);
                        $pagoAlumnoSec->setMontoPago($monto_pago);

                        // Realizar la Persistencia de los Datos y enviar a la BD                        
                        $em->persist($pagoAlumnoSec);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();

                        // Envio de Correo despues de la Grabacion de Datos
                        // *****************************************************
                        //Instanciamos de la Clase TblUsuario, para Obtener
                        // los Datos de envio de Mail **************************
                        $usuario_asignado_send = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_usuario_pago
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
                                ->setSubject('Notificación de Pago de: ' . $tipoPagoAlumno->getDescTipoPago() . 'de Alumno | ACACULH')
                                ->setFrom(array("nahum.sreci@gmail.com" => "Academia Culinaria Hondureña | ACACULH"))
                                ->setTo($email_alumno)
                                ->setBody(
                                $this->renderView(
                                        'Emails/sendMailPago.html.twig', array('nombresAlumno' => $nombre1, 'apellidosAlumno' => $apellido1,
                                    'codAlumno' => $cod_alumno, 'fechaCreacion' => date_format($fecha_ingreso, "Y-m-d"),
                                    'celularAlumno' => $celular_alumno,
                                    'formaPago' => $formaPagoAlumno->getDescFormaPago(),
                                    'tipoPago' => $tipoPagoAlumno->getDescTipoPago(),
                                    'montoPago' => $monto_pago,
                                        )
                                ), 'text/html');
                        // Envia el Correo con todos los Parametros
                        // 
                        $resuly = $mailer->send($mail);
                        //Consulta de el Alumno recien Ingresado *******************
                        $alumnoPagoConsulta = $em->getRepository("BackendBundle:TblPago")->findOneBy(
                                array(
                                    "idAlumno" => $id_alumno
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha ingresado un Pago del Alumno con el Codigo: " . $cod_alumno .
                            " pronto recibira una notificación vía correo. Gracias",
                            "data" => $alumnoPagoConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, No existe un Alumno con este Codigo: " . $cod_alumno . " o Correo: "
                            . $email_alumno . ",ingresa uno distinto para continuar",
                            "data" => $isset_cod_alumno
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Alumno no creado, falta ingresar los parametros !!"
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
     * @Route("/revert-pago-alumno", name="revert-pago-alumno")
     * Creacion del Controlador: Revertir Pago de Alumno
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00003
     */
    public function RevertPagoAlumnoAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        // Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        // Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        // Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);
        
        // Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            //Convertimos los Parametros POSt a Json
            $json = $request->get("json", null);
            
            // Comprobamos que Json no es Null
            if ($json != null) {           
                // Decodificamos el Json
                $params = json_decode($json);
                
                // Parametros a Convertir                           
                // Datos generales de la Tabla                
                $id_alumno = ($params->idAlumno != null) ? $params->idAlumno : 0;
                $id_pago = ($params->idPagoAlumno != null) ? $params->idPagoAlumno : 0;
                $monto_pago = ($params->montoPago != null) ? $params->montoPago : 0;
                $id_tipo_pago = ($params->idTipoPago != null) ? $params->idTipoPago : 0;

                $email_alumno = ($params->email != null) ? $params->email : null;
                $cod_alumno = ($params->codAlumno != null) ? $params->codAlumno : null;
                $nombres = ($params->nombres != null) ? $params->nombres : null;
                $apellidos = ($params->apellidos != null) ? $params->apellidos : null;
                $celular_alumno = ($params->celular != null) ? $params->celular : null;

                $fecha_modificacion = new \DateTime('now');

                $hora_modificacion = new \DateTime('now');
                $hora_modificacion->format('H:i');
                
                // Evaluamos que el Codigo del Alumno no se vacio
                if ($id_alumno != NULL && $monto_pago != 0) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Ejecutamos la Consulta por Id Pago, para validar si el Pago existe
                    $isset_id_pago = $em->getRepository("BackendBundle:TblPago")->findOneBy(
                            array(
                                "idPago" => $id_pago
                    ));

                    // Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if (($isset_id_pago != NULL)) {

                        // *****************************************************
                        // Actualizamos el Estado del Pago del Alumno en la Tabla: TblPago                 
                        // Seteo de Datos de la tabla: TblPago
                        $pagoAlumnoSec = $em->getRepository("BackendBundle:TblPago")->findOneBy(
                                array(
                                    "idPago" => $id_pago
                        ));

                        // Instanciamos de la Clase TblEstado
                        $estadoPagoAlumno = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => 4 // Anulado
                        ));
                        $pagoAlumnoSec->setIdEstadoPago($estadoPagoAlumno);

                        // Instanciamos de la Clase TblTipoPago
                        $tipoPagoAlumno = $em->getRepository("BackendBundle:TblTipoPago")->findOneBy(
                                array(
                                    "idTipoPago" => $id_tipo_pago
                        ));

                        $pagoAlumnoSec->setFechaModificacion($fecha_modificacion);
                        $pagoAlumnoSec->setHoraModificacion($hora_modificacion);
                        $pagoAlumnoSec->setConceptoPago('Reverción de Pago del Alumno : ' . $tipoPagoAlumno->getDescTipoPago() .
                                ' por valor de : ' . $monto_pago);

                        // Realizar la Persistencia de los Datos y enviar a la BD                        
                        $em->persist($pagoAlumnoSec);
                        // Realizar la actualizacion en el storage de la BD
                        $em->flush();

                        // Envio de Correo despues de la Grabacion de Datos
                        // *****************************************************
                        //Instanciamos de la Clase TblUsuario, para Obtener
                        // los Datos de envio de Mail **************************
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
                        /* $mail = \Swift_Message::newInstance()
                          ->setSubject('Notificación de Reverción de Pago de: ' . $tipoPagoAlumno->getDescTipoPago() . ' de Alumno | ACACULH')
                          ->setFrom(array("nahum.sreci@gmail.com" => "Academia Culinaria Hondureña | ACACULH"))
                          ->setTo($email_alumno)
                          ->setBody(
                          $this->renderView(
                          'Emails/sendMailPago.html.twig', array('nombresAlumno' => $nombres, 'apellidosAlumno' => $apellidos,
                          'codAlumno' => $cod_alumno, 'fechaCreacion' => date_format($fecha_ingreso, "Y-m-d"),
                          'celularAlumno' => $celular_alumno,
                          'montoPago' => $monto_pago,
                          )
                          ), 'text/html');
                         * 
                         */
                        // Envia el Correo con todos los Parametros
                        // 
                        // $resuly = $mailer->send($mail);
                        //Consulta de el Alumno recien Ingresado *******************
                        $alumnoPagoRevertConsulta = $em->getRepository("BackendBundle:TblPago")->findOneBy(
                                array(
                                    "idPago" => $id_pago
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha registrado la Anulación de un Pago del Alumno",
                            "data" => $alumnoPagoRevertConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Lo sentimos, No existe un pago asociado a este Alumno con este Codigo, ingresa uno distinto para continuar",
                            "data" => $isset_id_alumno
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Pago no Anulado, falta ingresar los parametros !!"
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
}
