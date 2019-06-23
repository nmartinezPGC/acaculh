<?php

namespace BackendBundle\Entity;

/**
 * TblEvaluacionPlato
 */
class TblEvaluacionPlato
{
    /**
     * @var integer
     */
    private $idEvaluacionPlato;

    /**
     * @var string
     */
    private $codEvaluacionPlato;

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
    private $presentacionObs;

    /**
     * @var float
     */
    private $presentacionNota;

    /**
     * @var string
     */
    private $saborObs;

    /**
     * @var float
     */
    private $saborNota;

    /**
     * @var string
     */
    private $otrosObs;

    /**
     * @var float
     */
    private $otrosNota;

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
     * Get idEvaluacionPlato
     *
     * @return integer
     */
    public function getIdEvaluacionPlato()
    {
        return $this->idEvaluacionPlato;
    }

    /**
     * Set codEvaluacionPlato
     *
     * @param string $codEvaluacionPlato
     *
     * @return TblEvaluacionPlato
     */
    public function setCodEvaluacionPlato($codEvaluacionPlato)
    {
        $this->codEvaluacionPlato = $codEvaluacionPlato;

        return $this;
    }

    /**
     * Get codEvaluacionPlato
     *
     * @return string
     */
    public function getCodEvaluacionPlato()
    {
        return $this->codEvaluacionPlato;
    }

    /**
     * Set idPlato
     *
     * @param integer $idPlato
     *
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
     * Set presentacionObs
     *
     * @param string $presentacionObs
     *
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
     * Set saborObs
     *
     * @param string $saborObs
     *
     * @return TblEvaluacionPlato
     */
    public function setSaborObs($saborObs)
    {
        $this->saborObs = $saborObs;

        return $this;
    }

    /**
     * Get saborObs
     *
     * @return string
     */
    public function getSaborObs()
    {
        return $this->saborObs;
    }

    /**
     * Set saborNota
     *
     * @param float $saborNota
     *
     * @return TblEvaluacionPlato
     */
    public function setSaborNota($saborNota)
    {
        $this->saborNota = $saborNota;

        return $this;
    }

    /**
     * Get saborNota
     *
     * @return float
     */
    public function getSaborNota()
    {
        return $this->saborNota;
    }

    /**
     * Set otrosObs
     *
     * @param string $otrosObs
     *
     * @return TblEvaluacionPlato
     */
    public function setOtrosObs($otrosObs)
    {
        $this->otrosObs = $otrosObs;

        return $this;
    }

    /**
     * Get otrosObs
     *
     * @return string
     */
    public function getOtrosObs()
    {
        return $this->otrosObs;
    }

    /**
     * Set otrosNota
     *
     * @param float $otrosNota
     *
     * @return TblEvaluacionPlato
     */
    public function setOtrosNota($otrosNota)
    {
        $this->otrosNota = $otrosNota;

        return $this;
    }

    /**
     * Get otrosNota
     *
     * @return float
     */
    public function getOtrosNota()
    {
        return $this->otrosNota;
    }

    /**
     * Set fechaEvaluacion
     *
     * @param \DateTime $fechaEvaluacion
     *
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
     * @return TblEvaluacionPlato
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
