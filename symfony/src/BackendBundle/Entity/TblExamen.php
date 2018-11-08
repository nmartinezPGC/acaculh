<?php

namespace BackendBundle\Entity;

/**
 * TblExamen
 */
class TblExamen
{
    /**
     * @var integer
     */
    private $idExamen;

    /**
     * @var string
     */
    private $codExamen;

    /**
     * @var float
     */
    private $notaExamen = '0';

    /**
     * @var \BackendBundle\Entity\TblAlumno
     */
    private $idAlumno;

    /**
     * @var \BackendBundle\Entity\TblInstructor
     */
    private $idInstructor;

    /**
     * @var \BackendBundle\Entity\TblClase
     */
    private $idClase;


    /**
     * Get idExamen
     *
     * @return integer
     */
    public function getIdExamen()
    {
        return $this->idExamen;
    }

    /**
     * Set codExamen
     *
     * @param string $codExamen
     *
     * @return TblExamen
     */
    public function setCodExamen($codExamen)
    {
        $this->codExamen = $codExamen;

        return $this;
    }

    /**
     * Get codExamen
     *
     * @return string
     */
    public function getCodExamen()
    {
        return $this->codExamen;
    }

    /**
     * Set notaExamen
     *
     * @param float $notaExamen
     *
     * @return TblExamen
     */
    public function setNotaExamen($notaExamen)
    {
        $this->notaExamen = $notaExamen;

        return $this;
    }

    /**
     * Get notaExamen
     *
     * @return float
     */
    public function getNotaExamen()
    {
        return $this->notaExamen;
    }

    /**
     * Set idAlumno
     *
     * @param \BackendBundle\Entity\TblAlumno $idAlumno
     *
     * @return TblExamen
     */
    public function setIdAlumno(\BackendBundle\Entity\TblAlumno $idAlumno = null)
    {
        $this->idAlumno = $idAlumno;

        return $this;
    }

    /**
     * Get idAlumno
     *
     * @return \BackendBundle\Entity\TblAlumno
     */
    public function getIdAlumno()
    {
        return $this->idAlumno;
    }

    /**
     * Set idInstructor
     *
     * @param \BackendBundle\Entity\TblInstructor $idInstructor
     *
     * @return TblExamen
     */
    public function setIdInstructor(\BackendBundle\Entity\TblInstructor $idInstructor = null)
    {
        $this->idInstructor = $idInstructor;

        return $this;
    }

    /**
     * Get idInstructor
     *
     * @return \BackendBundle\Entity\TblInstructor
     */
    public function getIdInstructor()
    {
        return $this->idInstructor;
    }

    /**
     * Set idClase
     *
     * @param \BackendBundle\Entity\TblClase $idClase
     *
     * @return TblExamen
     */
    public function setIdClase(\BackendBundle\Entity\TblClase $idClase = null)
    {
        $this->idClase = $idClase;

        return $this;
    }

    /**
     * Get idClase
     *
     * @return \BackendBundle\Entity\TblClase
     */
    public function getIdClase()
    {
        return $this->idClase;
    }
}
