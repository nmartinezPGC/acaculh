<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.root_dir').'/..'),
        ]);
    }
    
    /**
     * @Route("/prueba", name="prueba", methods={"POST"})
     */
    public function pruebaAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $estados = $em->getRepository("BackendBundle:TblEstado")->findAll();
        var_dump($estados);
        die();
    }
}
