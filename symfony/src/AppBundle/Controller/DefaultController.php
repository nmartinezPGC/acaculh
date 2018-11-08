<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;

class DefaultController extends Controller {

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request) {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
                    'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
        ]);
    }

    /**
     * @Route("/pruebas", name="pruebas")
     */
    public function pruebasAction(Request $request) {
        $helpers = $this->get("app.helpers");

        $em = $this->getDoctrine()->getManager();
        $user = $em->getRepository('BackendBundle:TblEstado')->findAll();
        // var_dump($user);
        // die();
        return $helpers->json($user);
    }

    /*
     * Login Action
     */

    public function loginAction(Request $request) {
        $helpers = $this->get("app.helpers");

        // Recibir json por POST
        $json = $request->get("json", null);

        if ($json != null) {
            $params = json_decode($json);

            $email = (isset($params->email)) ? $params->email : null;
            $password = (isset($params->password)) ? $params->password : null;

            $email_constraint = new Assert\Email();
            $email_constraint->message = "This Email is not valid !!";
            $validate_email = $this->get("validator")->validate($email, $email_constraint);

            if (count($validate_email) == 0 && $password != null) {
                echo "Data success";
            } else {
                echo "Data incorrect";
            }
        } else {
            echo "Send json with post";
        }
    }

}
