<?php

namespace BackendBundle\Entity;

/**
 * TblTipoEvaluacion
 */
class TblTipoEvaluacion
{
    /**
     * @var integer
     */
    private $idTipoEvaluacion;

    /**
     * @var string
     */
    private $codTipoEvaluacion;

    /**
     * @var string
     */
    private $nombreTipoEvaluacion;


    /**
     * Get idTipoEvaluacion
     *
     * @return integer
     */
    public function getIdTipoEvaluacion()
    {
        return $this->idTipoEvaluacion;
    }

    /**
     * Set codTipoEvaluacion
     *
     * @param string $codTipoEvaluacion
     *
     * @return TblTipoEvaluacion
     */
    public function setCodTipoEvaluacion($codTipoEvaluacion)
    {
        $this->codTipoEvaluacion = $codTipoEvaluacion;

        return $this;
    }

    /**
     * Get codTipoEvaluacion
     *
     * @return string
     */
    public function getCodTipoEvaluacion()
    {
        return $this->codTipoEvaluacion;
    }

    /**
     * Set nombreTipoEvaluacion
     *
     * @param string $nombreTipoEvaluacion
     *
     * @return TblTipoEvaluacion
     */
    public function setNombreTipoEvaluacion($nombreTipoEvaluacion)
    {
        $this->nombreTipoEvaluacion = $nombreTipoEvaluacion;

        return $this;
    }

    /**
     * Get nombreTipoEvaluacion
     *
     * @return string
     */
    public function getNombreTipoEvaluacion()
    {
        return $this->nombreTipoEvaluacion;
    }
}

