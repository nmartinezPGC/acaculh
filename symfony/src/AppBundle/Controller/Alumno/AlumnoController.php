<?php

namespace AppBundle\Controller\Alumno;

use BackendBundle\Entity\TblAlumno;
/**
 * Description of AlumnoController
 *
 * @author Nahum Martinez
 */
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

class AlumnoController extends Controller {

    /**
     * @Route("/all-list-alumnos", name="all-list-alumnos")
     * Creacion del Controlador: Listado de todos los Alumnos
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.1
     */
    public function ActiveAllAlumnoListAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        // Query para Obtener todos los Alumnos Registrados de la Tabla: TblAlumno
        $alumnosAllList = $em->getRepository("BackendBundle:TblAlumno")->findBy(
                array(
                    "idEstado" => 1
        ));

        // Total de Alumnos
        $countAlumnos = count($alumnosAllList);
        // Condicion de la Busqueda
        if ($countAlumnos >= 1) {
            $data = array(
                "status" => "success",
                "code" => 200,
                "data" => $alumnosAllList
            );
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "No existe Datos en la Tabla de Alumnos !!"
            );
        }

        return $helpers->parserJson($data);
    }

// FIN | FND00001.1

    /**
     * @Route("/new-alumno", name="new-alumno")
     * Creacion del Controlador: Nuevo Ingreso de Alumno
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001.2
     */
    public function NewAlumnoAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        //Recoger el Hash
        //Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);

            //Convertimos los Parametros POSt a Json
            $json = $request->get("json", null);

            //Comprobamos que Json no es Null
            if ($json != null) {
                //Decodificamos el Json
                $params = json_decode($json);

                //Parametros a Convertir                           
                //Datos generales de la Tabla                             
                $cod_alumno = ($params->codAlumno != null) ? $params->codAlumno : null;

                // Datos Generales
                $iniciales_alumno = ($params->inicialesAlumno != null) ? $params->inicialesAlumno : null;

                $nombre_1 = ($params->nombre1 != null) ? $params->nombre1 : null;
                $nombre_2 = ($params->nombre2 != null) ? $params->nombre2 : null;
                $apellido_1 = ($params->apellido1 != null) ? $params->apellido1 : null;
                $apellido_2 = ($params->apellido2 != null) ? $params->apellido2 : null;

                $email_alumno = ($params->email != null) ? $params->email : null;
                $telefono_alumno = ($params->telefono != null) ? $params->telefono : 0;
                $celular_alumno = ($params->celular != null) ? $params->celular : 0;
                $direccion_alumno = ($params->direccion != null) ? $params->direccion : null;
                $id_genero = ($params->idGenero != null) ? $params->idGenero : 0;
                $fecha_nacimiento = ($params->fechaNacimiento != null) ? $params->fechaNacimiento : null;
                $hondureno = ($params->hondureno != null) ? $params->hondureno : null;
                $id_profesion = ($params->idProfesion != null) ? $params->idProfesion : 0;

                // Datos de Padre y Madre
                $nombre_padre = ($params->nombrePadre != null) ? $params->nombrePadre : null;
                $id_profesion_padre = ($params->idProfesionPadre != null) ? $params->idProfesionPadre : 0;
                $nombre_madre = ($params->nombreMadre != null) ? $params->nombreMadre : null;
                $id_profesion_madre = ($params->idProfesionMadre != null) ? $params->idProfesionMadre : 0;
                $trabajo_padre = ($params->trabajoPadre != null) ? $params->trabajoPadre : null;
                $telefono_trabajo_padre = ($params->telefonoTrabajoPadre != null) ? $params->telefonoTrabajoPadre : 0;
                $trabajo_madre = ($params->trabajoMadre != null) ? $params->trabajoMadre : null;
                $telefono_trabajo_madre = ($params->telefonoTrabajoMadre != null) ? $params->telefonoTrabajoMadre : 0;

                // Datos de Encargado
                $nombre_encargado = ($params->nombreEncargado != null) ? $params->nombreEncargado : null;
                $telefono_encargado = ($params->telefonoEncargado != null) ? $params->telefonoEncargado : 0;
                $nombre_emergencia = ($params->nombreEmergencia != null) ? $params->nombreEmergencia : null;
                $telefono_emergencia = ($params->telefonoEmergencia != null) ? $params->telefonoEmergencia : 0;

                // Datos Complementarios
                $medio_conoce_ach = ($params->medioConoceAch != null) ? $params->medioConoceAch : null;
                $problemas_salud = ($params->problemasSalud != null) ? $params->problemasSalud : null;
                $referencia = ($params->referencia != null) ? $params->referencia : null;
                $id_usuario_ficha = ($params->idUsuarioFicha != null) ? $params->idUsuarioFicha : 0;
                $id_estado = ($params->idEstado != null) ? $params->idEstado : 0;
                $id_tipo_beca = ($params->idTipoBeca != null) ? $params->idTipoBeca : 0;

                $fecha_ingreso = new \DateTime('now');

                $hora_ingreso = new \DateTime('now');
                $hora_ingreso->format('H:i');

                //$fecha_nacimiento = date('Y-m-d H:i:s');
                //var_dump($fecha_ingreso);
                // Evaluamos que el Codigo del Alumno no se vacio
                if ($cod_alumno != NULL && $nombre_1 != NULL && $apellido_1 != NULL && $telefono_alumno != 0 && $email_alumno != NULL && $email_alumno != NULL) {
                    // Instanciamos el Objeto Doctrine                    
                    $em = $this->getDoctrine()->getManager();

                    // Ejecutamos la Consulta, para validar si el Alumno existe
                    $isset_cod_alumno = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                            array(
                                "codAlumno" => $cod_alumno
                    ));

                    //Verificamos que el retorno de la Funcion sea = 0 ********* 
                    if ($isset_cod_alumno == NULL) {
                        // Seteo de Datos Generales de la tabla: TblCorrespondenciaEnc
                        $ingresoAlumnoNew = new TblAlumno();

                        // Buscamos el Id de la Secuencia y Generamos el Codigo
                        $ingresoAlumnoNew->setCodAlumno($cod_alumno);
                        $ingresoAlumnoNew->setInicialesAlumno($iniciales_alumno);

                        // Datos Generales
                        $ingresoAlumnoNew->setNombre1($nombre_1);
                        $ingresoAlumnoNew->setNombre2($nombre_2);
                        $ingresoAlumnoNew->setApellido1($apellido_1);
                        $ingresoAlumnoNew->setApellido2($apellido_2);
                        $ingresoAlumnoNew->setEmail($email_alumno);
                        $ingresoAlumnoNew->setTelefono($telefono_alumno);
                        $ingresoAlumnoNew->setCelular($celular_alumno);
                        $ingresoAlumnoNew->setDireccion($direccion_alumno);

                        // Variables de Otras Tablas, las Buscamos para saber si hay Integridad                
                        // Instanciamos de la Clase TblGenero
                        $generoAlumno = $em->getRepository("BackendBundle:TblGenero")->findOneBy(
                                array(
                                    "idGenero" => $id_genero
                        ));
                        $ingresoAlumnoNew->setIdGenero($generoAlumno); // Set Entidad de Genero

                        $ingresoAlumnoNew->setFechaNacimiento($fecha_ingreso);
                        $ingresoAlumnoNew->setHondureno($hondureno);

                        // Instanciamos de la Clase TblProfesion de Alumno
                        $profesionAlumno = $em->getRepository("BackendBundle:TblProfesion")->findOneBy(
                                array(
                                    "idProfesion" => $id_profesion
                        ));
                        $ingresoAlumnoNew->setIdProfesion($profesionAlumno);

                        // Datos de Padre y Madre
                        $ingresoAlumnoNew->setNombrePadre($nombre_padre);

                        // Instanciamos de la Clase TblProfesion de Padre
                        $profesionPadre = $em->getRepository("BackendBundle:TblProfesion")->findOneBy(
                                array(
                                    "idProfesion" => $id_profesion_padre
                        ));
                        $ingresoAlumnoNew->setIdProfesionPadre($profesionPadre);

                        $ingresoAlumnoNew->setNombreMadre($nombre_madre);

                        // Instanciamos de la Clase TblProfesion de Madre
                        $profesionMadre = $em->getRepository("BackendBundle:TblProfesion")->findOneBy(
                                array(
                                    "idProfesion" => $id_profesion_madre
                        ));
                        $ingresoAlumnoNew->setIdProfesionMadre($profesionMadre);

                        $ingresoAlumnoNew->setTrabajoPadre($trabajo_padre);
                        $ingresoAlumnoNew->setTelefonoTrabajoPadre($telefono_trabajo_padre);
                        $ingresoAlumnoNew->setTrabajoMadre($trabajo_madre);
                        $ingresoAlumnoNew->setTelefonoTrabajoMadre($telefono_trabajo_madre);

                        // Datos de Encargados
                        $ingresoAlumnoNew->setNombreEncargado($nombre_encargado);
                        $ingresoAlumnoNew->setTelefonoEncargado($telefono_encargado);
                        $ingresoAlumnoNew->setNombreEmergencia($nombre_emergencia);
                        $ingresoAlumnoNew->setTelefonoEmergencia($telefono_emergencia);

                        // Datos Complementarios
                        $ingresoAlumnoNew->setMedioConoceAch($medio_conoce_ach);
                        $ingresoAlumnoNew->setProblemasSalud($problemas_salud);
                        $ingresoAlumnoNew->setReferencia($referencia);

                        // Instanciamos de la Clase TblUsuario
                        $usuarioFicha = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_usuario_ficha
                        ));
                        $ingresoAlumnoNew->setIdUsuarioFicha($usuarioFicha);

                        // Instanciamos de la Clase TblEstado
                        $estadoAlumno = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                                array(
                                    "idEstado" => $id_estado
                        ));
                        $ingresoAlumnoNew->setIdEstado($estadoAlumno);

                        // Instanciamos de la Clase TblTipoBeca
                        $tipoBecaAlumno = $em->getRepository("BackendBundle:TblTipoBeca")->findOneBy(
                                array(
                                    "idTipoBeca" => $id_tipo_beca
                        ));
                        $ingresoAlumnoNew->setIdTipoBeca($tipoBecaAlumno);

                        // Datos de Bitacora
                        $ingresoAlumnoNew->setFechaIngreso($fecha_ingreso);
                        $ingresoAlumnoNew->setHoraIngreso($hora_ingreso);

                        //Realizar la Persistencia de los Datos y enviar a la BD
                        $em->persist($ingresoAlumnoNew);
                        //Realizar la actualizacion en el storage de la BD
                        $em->flush();

                        // Envio de Correo despues de la Grabacion de Datos
                        // *****************************************************
                        //Instanciamos de la Clase TblUsuario, para Obtener
                        // los Datos de envio de Mail **************************
                        $usuario_asignado_send = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                                array(
                                    "idUsuario" => $id_usuario_ficha
                        ));
                        // Parametros de Salida
                        /* $mailSend = $usuario_asignado_send->getEmailFuncionario() ; // Get de mail de Funcionario Asignado
                          $nombreSend = $usuario_asignado_send->getNombre1Funcionario() ; // Get de Nombre de Funcionario Asignado
                          $apellidoSend = $usuario_asignado_send->getApellido1Funcionario() ; // Get de Apellido de Funcionario Asignado

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
                          ->setSubject('Notificación de Ingreso de Comunicacion | SICDOC')
                          //->setFrom(array($mailSend => $identity->nombre . " " .  $identity->apellido ))
                          ->setFrom(array("correspondenciascpi@sreci.gob.hn" => "Administrador SICDOC" ))
                          ->setTo($mailSend)
                          //->addCc([ $setTo_array_convertIn ])
                          ->setBody(
                          $this->renderView(
                          // app/Resources/views/Emails/registration.html.twig
                          'Emails/sendMail.html.twig',
                          array( 'name' => $nombreSend, 'apellidoOficio' => $apellidoSend,
                          'oficioExtNo' => $cod_referenciaSreci, 'oficioInNo' => $cod_correspondencia . "-" . $new_secuencia ,
                          'temaOficio' => $tema_correspondencia, 'descOficio' => $desc_correspondencia,
                          'fechaIngresoOfi' => strval($fecha_maxima_entrega),
                          'fechaIngresoCom' => date_format($fecha_ingreso, "Y-m-d"), 'obsComunicacion' => $observacion_correspondencia,
                          'institucionCom' => $institucion->getPerfilInstitucion())
                          ), 'text/html' );
                         */
                        // Insercion de los Contactos en Copia
                        // Array | addCC                            
                        /* if ( $setTomail != null && $setTomail != ''  ) {
                          foreach ($setTo_array_convert as $address) {
                          $mail->addCc($address);
                          }
                          } //FIN Array | addCC
                         */
                        // validamos que se adjunta pdf
                        // Array | Attach
                        /* if( $pdf_send != null ){
                          // Realizamos el foreach de los Documentos enviados
                          // Se convierte el Array en String
                          $documentos_array_convert      = json_encode($pdf_send);
                          $documentos_array_convert2      = json_decode($documentos_array_convert);

                          foreach ( $documentos_array_convert2 as $attachMail  ) {
                          // varibles
                          $nameDoc = $attachMail->nameDoc;
                          $extDoc = $attachMail->extDoc;
                          $pesoDoc = $attachMail->pesoDoc;

                          // Cambiamos el Tipo de extencion jpg => jpeg
                          if( $extDoc == "jpg" || $extDoc == "JPG" ){
                          $extDoc = "jpeg";
                          }

                          // INC00001 | Cambiamos el Tipo de extencion PDF => pdf
                          //Fecha: 2017-01-03 | Incidencia con PDF
                          if( $extDoc == "PDF" ){
                          $extDoc = "pdf";
                          }
                          //FIN | INC00001
                         */
                        /* INC00002 | 2018-01-09
                         * Corregir la Extencion del PNG a png
                         */
                        /* if( $extDoc == "PNG" ){
                          $extDoc = "png";
                          }
                          //FIN | INC00002
                         */
                        // $target_path1 = "uploads/correspondencia" . "/" . $nameDoc . "." . $extDoc;                            

                        /*                         * *********************************************** 
                         * Se Comenta la Opcion de Adjuntar los Documentos
                         * Sobrecargan el Correo de los Funcionarios
                         * Fecha: 2018-03-12
                         * ********************************************* */
                        //$mail->attach(\Swift_Attachment::fromPath($target_path1));
                        //}
                        //} // FIN Array | Attach
                        // Envia el Correo con todos los Parametros
                        //$resuly = $mailer->send($mail);
                        // ***** Fin de Envio de Correo ****************************
                        //Consulta de el Alumno recien Ingresado *******************
                        $alumnoConsulta = $em->getRepository("BackendBundle:TblAlumno")->findOneBy(
                                array(
                                    "codAlumno" => $cod_alumno
                        ));

                        //Array de Mensajes
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "Se ha ingresado el Alumno con el Codigo: " . $cod_alumno .
                            " pronto recibira una notificación vía correo. Gracias",
                            "data" => $alumnoConsulta
                        );
                    } else {
                        //Array de Mensajes
                        $data = array(
                            "status" => "error",
                            "code" => 400,
                            "msg" => "Ya existe un Alumno con este Codigo: " . $cod_alumno . ", ingresa uno distinto para"
                            . " continuar",
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
                    "msg" => "Comunicación no creada, falta ingresar los parametros !!"
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
}
