<?php

namespace BackendBundle\Entity;

/**
 * TblEvaluacionNotaTeorica
 */
class TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
     * @return TblEvaluacionNotaTeorica
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
