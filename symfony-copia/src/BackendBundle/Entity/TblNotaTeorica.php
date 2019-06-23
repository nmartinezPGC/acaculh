<?php

namespace BackendBundle\Entity;

/**
 * TblNotaTeorica
 */
class TblNotaTeorica
{
    /**
     * @var integer
     */
    private $idNotaTeorica;

    /**
     * @var string
     */
    private $codNota;

    /**
     * @var \DateTime
     */
    private $fechaEvaluacion;

    /**
     * @var \DateTime
     */
    private $horaEvaluacion;

    /**
     * @var float
     */
    private $notaExamen;

    /**
     * @var string
     */
    private $observaciones;

    /**
     * @var string
     */
    private $urlDocumentoNota;

    /**
     * @var \BackendBundle\Entity\TblAlumno
     */
    private $idAlumno;

    /**
     * @var \BackendBundle\Entity\TblUsuario
     */
    private $idInstructor;


    /**
     * Get idNotaTeorica
     *
     * @return integer
     */
    public function getIdNotaTeorica()
    {
        return $this->idNotaTeorica;
    }

    /**
     * Set codNota
     *
     * @param string $codNota
     *
     * @return TblNotaTeorica
     */
    public function setCodNota($codNota)
    {
        $this->codNota = $codNota;

        return $this;
    }

    /**
     * Get codNota
     *
     * @return string
     */
    public function getCodNota()
    {
        return $this->codNota;
    }

    /**
     * Set fechaEvaluacion
     *
     * @param \DateTime $fechaEvaluacion
     *
     * @return TblNotaTeorica
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
     * @return TblNotaTeorica
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
     * Set notaExamen
     *
     * @param float $notaExamen
     *
     * @return TblNotaTeorica
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
     * Set observaciones
     *
     * @param string $observaciones
     *
     * @return TblNotaTeorica
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
     * Set urlDocumentoNota
     *
     * @param string $urlDocumentoNota
     *
     * @return TblNotaTeorica
     */
    public function setUrlDocumentoNota($urlDocumentoNota)
    {
        $this->urlDocumentoNota = $urlDocumentoNota;

        return $this;
    }

    /**
     * Get urlDocumentoNota
     *
     * @return string
     */
    public function getUrlDocumentoNota()
    {
        return $this->urlDocumentoNota;
    }

    /**
     * Set idAlumno
     *
     * @param \BackendBundle\Entity\TblAlumno $idAlumno
     *
     * @return TblNotaTeorica
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
     * @param \BackendBundle\Entity\TblUsuario $idInstructor
     *
     * @return TblNotaTeorica
     */
    public function setIdInstructor(\BackendBundle\Entity\TblUsuario $idInstructor = null)
    {
        $this->idInstructor = $idInstructor;

        return $this;
    }

    /**
     * Get idInstructor
     *
     * @return \BackendBundle\Entity\TblUsuario
     */
    public function getIdInstructor()
    {
        return $this->idInstructor;
    }
}
