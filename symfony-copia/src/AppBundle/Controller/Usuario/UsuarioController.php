<?php

namespace AppBundle\Controller\Usuario;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;
//Importamos las Tablas a Relacionar
use BackendBundle\Entity\TblUsuario;
use BackendBundle\Entity\TblEstado;
use BackendBundle\Entity\TblTipoUsuario;

/**
 * Description of UsuarioController
 *
 * @author Nahum Martinez
 */
class UsuarioController extends Controller {

    /**
     * @Route("/usuario/usuario-new", name="/usuario/usuario-new")
     * Creacion del Controlador: Usuario
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00001
     */
    public function NewUserAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers
        $helpers = $this->get("app.helpers");
        
        //Recogemos el Hash y la Autorizacion del Mismo        
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);

        //Convertimos los Parametros POSt a Json
        $json = $request->get("json", null);

        //Array de Mensajes
        $data = array(
            "status" => "error",
            "code" => 200,
            "msg" => "No se ha podido ingresar el Usuario, presenta problemas",
            "validToken" => $checkToken,
            "json" => $json
        );

        //Evalua que el Token sea True
        if ($checkToken == true) {
            $identity = $helpers->authCheck($hash, true);
            
            //Evaluamos el Json
            if ($json != null) {                
                $params = json_decode($json);
                //Variables que vienen del Json ***********************************************
                //Seccion de Identificacion ***************************************************
                //El ID no se incluye; ya que es un campo Serial            
                $cod_usuario = (isset($params->codUsuario)) ? $params->codUsuario : null;
                $iniciales = (isset($params->iniciales)) ? $params->iniciales : null;
                $nombre1 = (isset($params->nombre1) && ctype_alpha($params->nombre1) ) ? $params->nombre1 : null;
                $nombre2 = (isset($params->nombre2) && ctype_alpha($params->nombre2) ) ? $params->nombre2 : null;
                $apellido1 = (isset($params->apellido1) && ctype_alpha($params->apellido1) ) ? $params->apellido1 : null;
                $apellido2 = (isset($params->apellido2) && ctype_alpha($params->apellido2) ) ? $params->apellido2 : null;
                $email = (isset($params->email)) ? $params->email : null;
                // Seccion de Relaciones entre Tablas ********************************************************************
                // $cod_estado = (isset($params->idEstado)) ? $params->idEstado : 0;
                $cod_tipo_usuario = (isset($params->idTipoUsuario)) ? $params->idTipoUsuario : 0;
                //Datos de Bitacora *************************************************************************************
                $createdAt = new \DateTime("now");
                $image = "";
                $password = (isset($params->password)) ? $params->password : null;
                $celular = (isset($params->celular)) ? $params->celular : null;
                $telefono = (isset($params->telefono)) ? $params->telefono : null;

                // Fechas Nulas
                $fecha_null = new \DateTime('2999-12-31');

                //Validamos el Email ************************************************************************************
                $emailConstraint = new Assert\Email();
                $emailConstraint->message = "El Email no es valido!!";

                $valid_email = $this->get("validator")->validate($email, $emailConstraint);
                //Entitie Manager Definition ****************************************************************************
                $em = $this->getDoctrine()->getManager();
                
                if ($email != null && count($valid_email) == 0 && $cod_usuario != null &&
                        $password != null && $nombre1 != null && $apellido1 != null && $celular != 0) {
                    //Instanciamos la Entidad TblUsuario *****************************************                
                    $usuario = new TblUsuario();
                    
                    //Seteamos los valores de Identificacion ***********************
                    $usuario->setcodUsuario($cod_usuario);
                    $usuario->setNombre1($nombre1);
                    $usuario->setNombre2($nombre2);
                    $usuario->setApellido1($apellido1);
                    $usuario->setApellido2($apellido2);
                    $usuario->setEmail($email);

                    $usuario->setCelular($celular);
                    $usuario->setTelefono($telefono);

                    $usuario->setActivo(true);
                    
                    //Seteamos los valores de Relaciones de Tablas *****************
                    //Instancia a la Tabla: TblEstados *****************************                
                    $estados = $em->getRepository("BackendBundle:TblEstado")->findOneBy(
                            array(
                                "idEstado" => 1
                    ));
                    $usuario->setIdEstado($estados);


                    //Instancia a la Tabla: TblTipoUsuario *************************                
                    $tipoUsuario = $em->getRepository("BackendBundle:TblTipoUsuario")->findOneBy(
                            array(
                                "idTipoUsuario" => $cod_tipo_usuario
                    ));
                    $usuario->setIdTipoUsuario($tipoUsuario);

                    //Seteamos el Resto de campos de la Tabla: TblUsuario *********
                    $usuario->setIniciales($iniciales);

                    //Cifrar la Contraseña *****************************************
                    $pwd = hash('sha256', $password);
                    $usuario->setPassword($pwd);

                    // Imagen del usuario
                    $usuario->setUrlImagen("sreci.png");

                    //Seteamos los valores de la Bitacora **************************
                    $usuario->setFechaCreacion($createdAt);
                    $usuario->setHoraCreacion($createdAt);

                    //Verificacion del Codigo y Email en la Tabla: TblUsuarios *****                
                    $isset_user_mail = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                            array(
                                "email" => $email
                    ));

                    //Verificacion del Codigo del Usuario **************************
                    $isset_user_cod = $em->getRepository("BackendBundle:TblUsuario")->findOneBy(
                            array(
                                "codUsuario" => $cod_usuario
                    ));
                    
                    //Verificamos que el retorno de la Funcion sea = 0 *************                
                    if ($isset_user_cod == null && $isset_user_mail == null) {
                        $em->persist($usuario);
                        $em->flush();

                        // Termina Tblusuario **************************************                   
                        // Envio de Correo despues de la Grabacion de Datos
                        // *************************************************
                        // los Datos de envio de Mail **********************
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
                                ->setSubject('Creacion de Usuario | ACACULH')
                                ->setFrom(array("nahum.sreci@gmail.com" => "Administrador ACACULH"))
                                //->addCc('correspondenciascpi@sreci.gob.hn')
                                ->setTo($email)
                        /* ->setBody(
                          $this->renderView(
                          'Emails/newUser.html.twig', array('name' => $nombre1, 'apellidoOficio' => $apellido1,
                          'fechaCreated' => date_format($createdAt, "Y-m-d"), 'userActual' => $email,
                          'passActual' => $password)
                          ), 'text/html') */
                        ;

                        // Envia el Correo con todos los Parametros
                        // $resuly = $mailer->send($mail);
                        // ***** Fin de Envio de Correo ********************
                        //Seteamos el array de Mensajes a enviar *******************
                        $data = array(
                            "status" => "success",
                            "code" => 200,
                            "msg" => "El Usuario, " . $nombre1 . " " . $apellido1 . " se ha creado satisfactoriamente."
                        );
                    } else {
                        $data = array(
                            "status" => "error",
                            "code" => "400",
                            "msg" => "Error al registrar, el Usuario ya existe revise el "
                            . "EMail o el No. de Identidad !!"
                        );
                    }
                }
            } else {
                //Array de Mensajes
                $data = array(
                    "status" => "error",
                    "desc" => "Eror al enviar la informacion serializada, el Json no ha sido enviado",
                    "code" => 400,
                    "msg" => "Usuario no creado, falta ingresar los parametros !! " . $json . " Capos"
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

// FIN FND00001

    /**
     * @Route("/edit", name="edit")
     * Creacion del Controlador: Usuarios
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00002
     */
    public function editAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers
        $helpers = $this->get("app.helpers");
        //Recoger el Hash
        //Recogemos el Hash y la Autrizacion del Mismo
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);
        //Evalua que el Token sea True
        if ($checkToken == true) {
            //Ejecutamos todo el Codigo restante
            $identity = $helpers->authCheck($hash, true);
            $em = $this->getDoctrine()->getManager();

            // Instacia de la Clase de Usuario a Modificar
            $usuarioEdit = $em->getRepository("BackendBundle:TblUsuarios")->findOneBy(
                    array(
                        "idUsuario" => $identity->sub
            ));
            $json = $request->get("json", null);
            $params = json_decode($json);


            //Evaluamos el Json
            if ($json != null) {
                //Variables que vienen del Json ************************************
                //Seccion de Identificacion ****************************************
                //El ID no se incluye; ya que es un campo Serial            
                $cod_usuario = (isset($params->codUsuario)) ? $params->codUsuario : null;
                $iniciales = (isset($params->inicialesUsuario)) ? $params->inicialesUsuario : null;
                $nombre1 = (isset($params->primerNombre)) ? $params->primerNombre : null;
                $nombre2 = (isset($params->segundoNombre)) ? $params->segundoNombre : null;
                $apellido1 = (isset($params->primerApellido)) ? $params->primerApellido : null;
                $apellido2 = (isset($params->segundoApellido)) ? $params->segundoApellido : null;
                $email = (isset($params->emailUsuario)) ? $params->emailUsuario : null;

                //Datos de Bitacora ************************************************
                $createdAt = new \DateTime("now");
                //$image = (isset($params->pdfDocumento)) ? $params->pdfDocumento : null;          
                //Validamos el Email ***********************************************
                //$emailConstraint = new Assert\Email();
                //$emailConstraint->message = "El Email no es valido!!";
                //$valid_email = $this->get("validator")->validate($email, $emailConstraint);
                //Entitie Manager Definition ***************************************
                $em = $this->getDoctrine()->getManager();

                if ($nombre1 != null && $apellido1 != null) {
                    //Instanciamos la Entidad TblUsuario ***************************
                    //$usuarioEdit = new TblUsuarios(); 
                    //Seteamos los valores de Identificacion ***********************
                    $usuarioEdit->setcodUsuario($cod_usuario);
                    $usuarioEdit->setNombre1Usuario($nombre1);
                    $usuarioEdit->setNombre2Usuario($nombre2);
                    $usuarioEdit->setApellido1Usuario($apellido1);
                    $usuarioEdit->setApellido2Usuario($apellido2);

                    //Seteamos el Resto de campos de la Tabla: TblUsuarios *********
                    $usuarioEdit->setInicialesUsuario($iniciales);

                    // $usuario->setImagenUsuario($image);
                    //Seteamos los valores de la Bitacora **************************
                    $usuarioEdit->setFechaModificacion($createdAt);


                    //Verificacion del Codigo y Email en la Tabla: TblUsuarios *****                
                    $isset_user_mail = $em->getRepository("BackendBundle:TblUsuarios")->findBy(
                            array(
                                "emailUsuario" => $email
                    ));

                    //Verificacion del Codigo del Usuario **************************
                    $isset_user_cod = $em->getRepository("BackendBundle:TblUsuarios")->findBy(
                            array(
                                "codUsuario" => $cod_usuario
                    ));

                    //Verificamos que el retorno de la Funcion sea = 0 *************                
                    if (count($isset_user_cod) == 0 || $identity->email == $email) {
                        $em->persist($usuarioEdit);
                        $em->flush();
                        //Seteamos el array de Mensajes a enviar *******************
                        $data = array(
                            "status" => "success",
                            "code" => "200",
                            "msg" => "Usuario actualizado, debes cerrar cesion para visualizar los cambios !!"
                        );
                    } else {
                        $data = array(
                            "status" => "error",
                            "code" => "400",
                            "msg" => "Error al registrar, el Usuario ya existe !!"
                        );
                    }
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => "300",
                        "msg" => "El Nombre y Apellido no pueden ser nulos !! . $nombre1 "
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => "400",
                    "msg" => "Autorizacion de Token no valida, tu sesion ha caducado !!"
                );
            }
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN FND00002

    /**
     * @Route("/upload", name="upload")
     * Creacion del Controlador: Usuarios
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00003
     */
    public function uploadImageAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers
        $helpers = $this->get("app.helpers");
        //Recoger el Hash
        //Recogemos el Hash y la Autrizacion del Mismo
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);
        //Evaluamos la Autoriuzacion del Token
        if ($checkToken == true) {
            //Ejecutamos todo el Codigo restante
            $identity = $helpers->authCheck($hash, true);
            $em = $this->getDoctrine()->getManager();
            //Buscamos el registro por el Id de Usaurio
            $usuario = $em->getRepository("BackendBundle:TblUsuarios")->findOneBy(
                    array(
                        "idUsuario" => $identity->sub
            ));
            //Recoger el Fichero que viene por el POST y lo guardamos el HD
            $file = $request->files->get("image");
            //Se verifica que el fichero no venga Null
            if (!empty($file) && $file != null) {
                //Obtenemos la extencion del Fichero
                $ext = $file->guessExtension();
                //Comprobamos que la Extencion sea Aceptada
                if ($ext == "jpeg" || $ext == "jpg" || $ext == "png" || $ext == "gif") {
                    // Concatenmos al Nombre del Fichero la Fecha y la Extencion
                    $file_name = time() . "." . $ext;
                    //Movemos el Fichero
                    $file->move("uploads/users", $file_name);

                    //Seteamos el valor de la Imagen dentro de la Tabla:Tblusuarios+
                    $usuario->setImagenUsuario($file_name);
                    $em->persist($usuario);
                    $em->flush();

                    // Devolvemos el Mensaje de Array
                    $data = array(
                        "status" => "success",
                        "code" => 200,
                        "msg" => "Imagen for user uploaded success !!"
                    );
                } else {
                    // Devolvemos el Mensaje de Array, cuando la Imagen no sea valida
                    $data = array(
                        "status" => "error",
                        "code" => 400,
                        "msg" => "File not valid !!"
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "Imagen not upload !!"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "Autorización no valida !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN FND00003

    /**
     * @Route("/change-pass-user", name="change-pass-user")
     * Creacion del Controlador: Usuarios
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00004
     */
    public function changePassUserAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers
        $helpers = $this->get("app.helpers");
        //Recoger el Hash
        //Recogemos el Hash y la Autrizacion del Mismo
        $hash = $request->get("authorization", null);
        //Se Chekea el Token
        $checkToken = $helpers->authCheck($hash);
        //Evalua que el Token sea True
        if ($checkToken == true) {
            //Ejecutamos todo el Codigo restante
            $identity = $helpers->authCheck($hash, true);
            $em = $this->getDoctrine()->getManager();

            $json = $request->get("json", null);
            $params = json_decode($json);


            //Evaluamos el Json
            if ($json != null) {
                //Variables que vienen del Json ********************************
                //Seccion de Identificacion ************************************
                //El ID no se incluye; ya que es un campo Serial            
                $id_usuario = (isset($params->idUserChange)) ? $params->idUserChange : 0;

                // Password a Cambiar
                $password_actual = (isset($params->passWordUserAct)) ? $params->passWordUserAct : null;
                $password_actual_sha = (isset($params->passWordUserAct)) ? $params->passWordUserActSha : null;
                $password_new = (isset($params->passWordUserNew)) ? $params->passWordUserNew : null;
                $password_confirm = (isset($params->passWordUserConfirm)) ? $params->passWordUserConfirm : null;

                $modifyAt = new \DateTime("now");

                //Entitie Manager Definition ***********************************
                $em = $this->getDoctrine()->getManager();

                if ($password_actual != null && $password_new != null && $id_usuario != 0) {
                    //Instanciamos la Entidad TblUsuario *****************************************                
                    //$usuario = new TblUsuarios();                
                    //Seteamos los valores de Identificacion ***********************
                    $usuario = $em->getRepository("BackendBundle:TblUsuarios")->findOneBy(
                            array(
                                "idUsuario" => $id_usuario
                    ));

                    //Cifrar la Contraseña *************************************
                    if ($password_actual != null) {
                        $pwdAct = hash('sha256', $password_actual);
                        $pwdNew = hash('sha256', $password_new);

                        $compa = strcmp($pwdAct, $password_actual_sha);

                        //if( $password_actual_sha != $pwdAct ){
                        if ($compa != 0) {
                            // Evaluamos que los Password sean Distintos
                            if ($password_actual_sha != $pwdNew) {
                                //Actualizmos el password
                                $usuario->setPasswordUsuario($pwdNew);
                                $usuario->setFechaModificacion($modifyAt);
                                //$usuario->setImagenUsuario($image);
                                //Seteamos los valores de la Bitacora **************                            
                                // Relizamos la persistencia de Datos de las Comunicaciones Detalle
                                $em->persist($usuario);

                                //Realizar la actualizacion en el storage de la BD
                                $em->flush();
                                // Envio de Correo despues de la Grabacion de Datos
                                // *************************************************
                                //Instanciamos de la Clase TblFuncionarios, para Obtener
                                // los Datos de envio de Mail **********************
                                // Parametros de Salida
                                // los Datos de envio de Mail **************************
                                $usuario_asignado_send = $em->getRepository("BackendBundle:TblFuncionarios")->findOneBy(
                                        array(
                                            "idFuncionario" => $id_usuario
                                ));
                                // Parametros de Salida
                                $mailSend = $usuario_asignado_send->getEmailFuncionario(); // Get de mail de Funcionario Asignado
                                $nombreSend = $usuario_asignado_send->getNombre1Funcionario(); // Get de Nombre de Funcionario Asignado
                                $apellidoSend = $usuario_asignado_send->getApellido1Funcionario(); // Get de Apellido de Funcionario Asignado
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
                                        //->setUsername("nahum.sreci@gmail.com")                                   
                                        //->setPassword('1897Juve');                                   
                                        ->setUsername("correspondenciascpi@sreci.gob.hn")
                                        ->setPassword('Despachomcns')
                                        ->setTimeout(180);
                                //echo "Paso 1";
                                //Creamos la instancia del envío
                                $mailer = \Swift_Mailer::newInstance($transport);

                                //Creamos el mensaje
                                $mail = \Swift_Message::newInstance()
                                        ->setSubject('Cambio de Contraseña | SICDOC')
                                        //->setFrom(array($identity->email => $identity->nombre . " " .  $identity->apellido ))
                                        //->setFrom(array("nahum.sreci@gmail.com" => "Administrador SICDOC" )) 
                                        ->setFrom(array("correspondenciascpi@sreci.gob.hn" => "Administrador SICDOC"))
                                        ->setTo($mailSend)
                                        ->setBody(
                                        $this->renderView(
                                                // app/Resources/views/Emails/registration.html.twig
                                                'Emails/changePassWord.html.twig', array('name' => $nombreSend, 'apellidoOficio' => $apellidoSend,
                                            'passActual' => $password_new,
                                            'fechaChange' => date_format($modifyAt, "Y/m/d"))
                                        ), 'text/html');

                                // Envia el Correo con todos los Parametros
                                $resuly = $mailer->send($mail);

                                // ***** Fin de Envio de Correo ********************
                                //Seteamos el array de Mensajes a enviar ***********
                                $data = array(
                                    "status" => "success",
                                    "code" => "200",
                                    "msg" => "Usuario actualizado, la contraseña se Actualizo pronto recibiras un correo de confirmación !! "
                                );
                            } else {
                                //Seteamos el array de Mensajes a enviar ***********
                                $data = array(
                                    "status" => "success",
                                    "code" => "400",
                                    "msg" => "El Usuario no se ha actualizado, la contraseña Actual es igual a la Anterior !!"
                                );
                            } // FIN | Condicion    
                        } else {
                            $data = array(
                                "status" => "error",
                                "code" => "400",
                                "msg" => "La Contraseña Actual Ingresada no es igual que la registrada en la BD !!"
                            );
                        } // FIN | Cifrado
                    } // FIN | Passwor Null                                                                                         
                } else {
                    $data = array(
                        "status" => "error",
                        "code" => "400",
                        "msg" => "Error al cambiar la contraseña, faltan campos por ingresar !!"
                    );
                }
            } else {
                $data = array(
                    "status" => "error",
                    "code" => "400",
                    "msg" => "Los parametros enviados son Nulos, por favor verificar la información, para continuar !!"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => "400",
                "msg" => "Autorizacion de Token no valida !!"
            );
        }
        //Retorno de la Funcion ************************************************
        return $helpers->parserJson($data);
    }

// FIN FND00004

    /**
     * Creacion del Controlador: Transforma Fechas Time Stamp
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00005
     */
    public function convertirFechasTimeStampAction($fecha_time_stamp) {
        // Recibe los Parametros de la Funcion, en un Formato TimeStamp ********
        $fecha_time_stamp_In = $fecha_time_stamp;

        // Decodificamos el Json con su Campo de Fechas | es nesesario que se **
        // haga la Consulta a la BD por medio de Doctrine( getFechaConsulta())**
        //$fecha_transformar = json_encode($correspondenciaAsigna->getFechaMaxEntrega()->getTimestamp(), true );
        // Itaciamosla fecha y le Seteamos el valor TimeStamp del campo de la **
        // Consulta del Doctrine (getFechaConsulta()) **************************
        $fecha_set = new \DateTime();
        $fecha_set->setTimestamp($fecha_time_stamp_In);

        //Salida del Formato a la fecha Convertida *****************************
        $fecha_salida = $fecha_set->format('Y-m-d');

        return $fecha_salida;
    }

// FIN | FND00005

    /**
     * @Route("/user-details", name="user-details")
     * Creacion del Controlador: Detalle de los Usuarios
     * @author Nahum Martinez <nmartinez.salgado@yahoo.com>
     * @since 1.0
     * Funcion: FND00006
     */
    public function detailsUserAction(Request $request) {
        date_default_timezone_set('America/Tegucigalpa');
        //Instanciamos el Servicio Helpers y Jwt
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();

        $json = $request->get("json", null);
        $params = json_decode($json);

        //Evaluamos el Json
        if ($json != null) {
            //Variables que vienen del Json ************************************
            ////Recogemos el ID del Usuario ************************************
            $id_usuario = (isset($params->idUser)) ? $params->idUser : null;

            // Query para Obtener todos los Estados de la Tabla: TblUsuarios
            $userDetails = $em->getRepository("BackendBundle:TblUsuarios")->findOneBy(
                    array(
                        "idUsuario" => $id_usuario
            ));


            // Condicion de la Busqueda
            if (count($userDetails) >= 1) {
                $data = array(
                    "status" => "success",
                    "code" => 200,
                    "data" => $userDetails
                );
            } else {
                $data = array(
                    "status" => "error",
                    "code" => 400,
                    "msg" => "No existe Datos de Funcionario para este Usuario !!"
                );
            }
        } else {
            $data = array(
                "status" => "error",
                "code" => 400,
                "msg" => "No existe Datos en la Tabla de Funcionarios, comuniquese con el Administrador !!"
            );
        }

        return $helpers->parserJson($data);
    }

//FIN | FND00006
}
