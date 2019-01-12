<?php

namespace BackendBundle\Entity;

/**
 * TblEvaluacion
 */
class TblEvaluacion
{
    /**
     * @var integer
     */
    private $idEvaluacion;

    /**
     * @var string
     */
    private $codEvaluacion;

    /**
     * @var \DateTime
     */
    private $fechaEvaluacion;

    /**
     * @var \DateTime
     */
    private $horaEvaluacion;

    /**
     * @var string
     */
    private $observaciones;

    /**
     * @var \BackendBundle\Entity\TblAlumno
     */
    private $idAlumno;

    /**
     * @var \BackendBundle\Entity\TblInstructor
     */
    private $idInstructor;


    /**
     * Get idEvaluacion
     *
     * @return integer
     */
    public function getIdEvaluacion()
    {
        return $this->idEvaluacion;
    }

    /**
     * Set codEvaluacion
     *
     * @param string $codEvaluacion
     *
     * @return TblEvaluacion
     */
    public function setCodEvaluacion($codEvaluacion)
    {
        $this->codEvaluacion = $codEvaluacion;

        return $this;
    }

    /**
     * Get codEvaluacion
     *
     * @return string
     */
    public function getCodEvaluacion()
    {
        return $this->codEvaluacion;
    }

    /**
     * Set fechaEvaluacion
     *
     * @param \DateTime $fechaEvaluacion
     *
     * @return TblEvaluacion
     */
    public function setFechaEvaluacion($fechaEvaluacion)
    {
        $this->fechaEvaluacion = $fechaEvaluacion;

        return $this;
    }

    /**
     * Get fechaEvaluacion
     *
     * @return \DateTime
     */
    public function getFechaEvaluacion()
    {
        return $this->fechaEvaluacion;
    }

    /**
     * Set horaEvaluacion
     *
     * @param \DateTime $horaEvaluacion
     *
     * @return TblEvaluacion
     */
    public function setHoraEvaluacion($horaEvaluacion)
    {
        $this->horaEvaluacion = $horaEvaluacion;

        return $this;
    }

    /**
     * Get horaEvaluacion
     *
     * @return \DateTime
     */
    public function getHoraEvaluacion()
    {
        return $this->horaEvaluacion;
    }

    /**
     * Set observaciones
     *
     * @param string $observaciones
     *
     * @return TblEvaluacion
     */
    public function setObservaciones($observaciones)
    {
        $this->observaciones = $observaciones;

        return $this;
    }

    /**
     * Get observaciones
     *
     * @return string
     */
    public function getObservaciones()
    {
        return $this->observaciones;
    }

    /**
     * Set idAlumno
     *
     * @param \BackendBundle\Entity\TblAlumno $idAlumno
     *
     * @return TblEvaluacion
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
     * @return TblEvaluacion
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
}
