<?php

namespace BackendBundle\Entity;

/**
 * TblEvaluacionQueso
 */
class TblEvaluacionQueso
{
    /**
     * @var integer
     */
    private $idEvaluacionQueso;

    /**
     * @var string
     */
    private $codEvaluacionQueso;

    /**
     * @var integer
     */
    private $idPlato;

    /**
     * @var integer
     */
    private $idInstructor;

    /**
     * @var integer
     */
    private $idAlumno;

    /**
     * @var string
     */
    private $conocimientoTemaObs;

    /**
     * @var float
     */
    private $conocimientoTemaNota;

    /**
     * @var string
     */
    private $presentacionObs;

    /**
     * @var float
     */
    private $presentacionNota;

    /**
     * @var string
     */
    private $reporteEscritoObs;

    /**
     * @var float
     */
    private $reporteEscritoNota;

    /**
     * @var string
     */
    private $uniformeObs;

    /**
     * @var float
     */
    private $uniformeNota;

    /**
     * @var string
     */
    private $degustacionObs;

    /**
     * @var float
     */
    private $degustacionNota;

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
    private $notaFinal;


    /**
     * Get idEvaluacionQueso
     *
     * @return integer
     */
    public function getIdEvaluacionQueso()
    {
        return $this->idEvaluacionQueso;
    }

    /**
     * Set codEvaluacionQueso
     *
     * @param string $codEvaluacionQueso
     *
     * @return TblEvaluacionQueso
     */
    public function setCodEvaluacionQueso($codEvaluacionQueso)
    {
        $this->codEvaluacionQueso = $codEvaluacionQueso;

        return $this;
    }

    /**
     * Get codEvaluacionQueso
     *
     * @return string
     */
    public function getCodEvaluacionQueso()
    {
        return $this->codEvaluacionQueso;
    }

    /**
     * Set idPlato
     *
     * @param integer $idPlato
     *
     * @return TblEvaluacionQueso
     */
    public function setIdPlato($idPlato)
    {
        $this->idPlato = $idPlato;

        return $this;
    }

    /**
     * Get idPlato
     *
     * @return integer
     */
    public function getIdPlato()
    {
        return $this->idPlato;
    }

    /**
     * Set idInstructor
     *
     * @param integer $idInstructor
     *
     * @return TblEvaluacionQueso
     */
    public function setIdInstructor($idInstructor)
    {
        $this->idInstructor = $idInstructor;

        return $this;
    }

    /**
     * Get idInstructor
     *
     * @return integer
     */
    public function getIdInstructor()
    {
        return $this->idInstructor;
    }

    /**
     * Set idAlumno
     *
     * @param integer $idAlumno
     *
     * @return TblEvaluacionQueso
     */
    public function setIdAlumno($idAlumno)
    {
        $this->idAlumno = $idAlumno;

        return $this;
    }

    /**
     * Get idAlumno
     *
     * @return integer
     */
    public function getIdAlumno()
    {
        return $this->idAlumno;
    }

    /**
     * Set conocimientoTemaObs
     *
     * @param string $conocimientoTemaObs
     *
     * @return TblEvaluacionQueso
     */
    public function setConocimientoTemaObs($conocimientoTemaObs)
    {
        $this->conocimientoTemaObs = $conocimientoTemaObs;

        return $this;
    }

    /**
     * Get conocimientoTemaObs
     *
     * @return string
     */
    public function getConocimientoTemaObs()
    {
        return $this->conocimientoTemaObs;
    }

    /**
     * Set conocimientoTemaNota
     *
     * @param float $conocimientoTemaNota
     *
     * @return TblEvaluacionQueso
     */
    public function setConocimientoTemaNota($conocimientoTemaNota)
    {
        $this->conocimientoTemaNota = $conocimientoTemaNota;

        return $this;
    }

    /**
     * Get conocimientoTemaNota
     *
     * @return float
     */
    public function getConocimientoTemaNota()
    {
        return $this->conocimientoTemaNota;
    }

    /**
     * Set presentacionObs
     *
     * @param string $presentacionObs
     *
     * @return TblEvaluacionQueso
     */
    public function setPresentacionObs($presentacionObs)
    {
        $this->presentacionObs = $presentacionObs;

        return $this;
    }

    /**
     * Get presentacionObs
     *
     * @return string
     */
    public function getPresentacionObs()
    {
        return $this->presentacionObs;
    }

    /**
     * Set presentacionNota
     *
     * @param float $presentacionNota
     *
     * @return TblEvaluacionQueso
     */
    public function setPresentacionNota($presentacionNota)
    {
        $this->presentacionNota = $presentacionNota;

        return $this;
    }

    /**
     * Get presentacionNota
     *
     * @return float
     */
    public function getPresentacionNota()
    {
        return $this->presentacionNota;
    }

    /**
     * Set reporteEscritoObs
     *
     * @param string $reporteEscritoObs
     *
     * @return TblEvaluacionQueso
     */
    public function setReporteEscritoObs($reporteEscritoObs)
    {
        $this->reporteEscritoObs = $reporteEscritoObs;

        return $this;
    }

    /**
     * Get reporteEscritoObs
     *
     * @return string
     */
    public function getReporteEscritoObs()
    {
        return $this->reporteEscritoObs;
    }

    /**
     * Set reporteEscritoNota
     *
     * @param float $reporteEscritoNota
     *
     * @return TblEvaluacionQueso
     */
    public function setReporteEscritoNota($reporteEscritoNota)
    {
        $this->reporteEscritoNota = $reporteEscritoNota;

        return $this;
    }

    /**
     * Get reporteEscritoNota
     *
     * @return float
     */
    public function getReporteEscritoNota()
    {
        return $this->reporteEscritoNota;
    }

    /**
     * Set uniformeObs
     *
     * @param string $uniformeObs
     *
     * @return TblEvaluacionQueso
     */
    public function setUniformeObs($uniformeObs)
    {
        $this->uniformeObs = $uniformeObs;

        return $this;
    }

    /**
     * Get uniformeObs
     *
     * @return string
     */
    public function getUniformeObs()
    {
        return $this->uniformeObs;
    }

    /**
     * Set uniformeNota
     *
     * @param float $uniformeNota
     *
     * @return TblEvaluacionQueso
     */
    public function setUniformeNota($uniformeNota)
    {
        $this->uniformeNota = $uniformeNota;

        return $this;
    }

    /**
     * Get uniformeNota
     *
     * @return float
     */
    public function getUniformeNota()
    {
        return $this->uniformeNota;
    }

    /**
     * Set degustacionObs
     *
     * @param string $degustacionObs
     *
     * @return TblEvaluacionQueso
     */
    public function setDegustacionObs($degustacionObs)
    {
        $this->degustacionObs = $degustacionObs;

        return $this;
    }

    /**
     * Get degustacionObs
     *
     * @return string
     */
    public function getDegustacionObs()
    {
        return $this->degustacionObs;
    }

    /**
     * Set degustacionNota
     *
     * @param float $degustacionNota
     *
     * @return TblEvaluacionQueso
     */
    public function setDegustacionNota($degustacionNota)
    {
        $this->degustacionNota = $degustacionNota;

        return $this;
    }

    /**
     * Get degustacionNota
     *
     * @return float
     */
    public function getDegustacionNota()
    {
        return $this->degustacionNota;
    }

    /**
     * Set fechaEvaluacion
     *
     * @param \DateTime $fechaEvaluacion
     *
     * @return TblEvaluacionQueso
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
     * @return TblEvaluacionQueso
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
     * Set notaFinal
     *
     * @param float $notaFinal
     *
     * @return TblEvaluacionQueso
     */
    public function setNotaFinal($notaFinal)
    {
        $this->notaFinal = $notaFinal;

        return $this;
    }

    /**
     * Get notaFinal
     *
     * @return float
     */
    public function getNotaFinal()
    {
        return $this->notaFinal;
    }
    /**
     * @var string
     */
    private $chefNotaFinalObs;

    /**
     * @var \BackendBundle\Entity\TblEstado
     */
    private $idEstado;


    /**
     * Set chefNotaFinalObs
     *
     * @param string $chefNotaFinalObs
     *
     * @return TblEvaluacionQueso
     */
    public function setChefNotaFinalObs($chefNotaFinalObs)
    {
        $this->chefNotaFinalObs = $chefNotaFinalObs;

        return $this;
    }

    /**
     * Get chefNotaFinalObs
     *
     * @return string
     */
    public function getChefNotaFinalObs()
    {
        return $this->chefNotaFinalObs;
    }

    /**
     * Set idEstado
     *
     * @param \BackendBundle\Entity\TblEstado $idEstado
     *
     * @return TblEvaluacionQueso
     */
    public function setIdEstado(\BackendBundle\Entity\TblEstado $idEstado = null)
    {
        $this->idEstado = $idEstado;

        return $this;
    }

    /**
     * Get idEstado
     *
     * @return \BackendBundle\Entity\TblEstado
     */
    public function getIdEstado()
    {
        return $this->idEstado;
    }
}
