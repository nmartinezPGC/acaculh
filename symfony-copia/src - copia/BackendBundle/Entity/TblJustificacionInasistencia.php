<?php

namespace BackendBundle\Entity;

/**
 * TblJustificacionInasistencia
 */
class TblJustificacionInasistencia
{
    /**
     * @var integer
     */
    private $idJustificacionInasistencia;

    /**
     * @var string
     */
    private $codInasistencia;

    /**
     * @var string
     */
    private $justificacionInasistencia;

    /**
     * @var float
     */
    private $costoInasistencia = '0';

    /**
     * @var \BackendBundle\Entity\TblAlumno
     */
    private $idAlumno;


    /**
     * Get idJustificacionInasistencia
     *
     * @return integer
     */
    public function getIdJustificacionInasistencia()
    {
        return $this->idJustificacionInasistencia;
    }

    /**
     * Set codInasistencia
     *
     * @param string $codInasistencia
     *
     * @return TblJustificacionInasistencia
     */
    public function setCodInasistencia($codInasistencia)
    {
        $this->codInasistencia = $codInasistencia;

        return $this;
    }

    /**
     * Get codInasistencia
     *
     * @return string
     */
    public function getCodInasistencia()
    {
        return $this->codInasistencia;
    }

    /**
     * Set justificacionInasistencia
     *
     * @param string $justificacionInasistencia
     *
     * @return TblJustificacionInasistencia
     */
    public function setJustificacionInasistencia($justificacionInasistencia)
    {
        $this->justificacionInasistencia = $justificacionInasistencia;

        return $this;
    }

    /**
     * Get justificacionInasistencia
     *
     * @return string
     */
    public function getJustificacionInasistencia()
    {
        return $this->justificacionInasistencia;
    }

    /**
     * Set costoInasistencia
     *
     * @param float $costoInasistencia
     *
     * @return TblJustificacionInasistencia
     */
    public function setCostoInasistencia($costoInasistencia)
    {
        $this->costoInasistencia = $costoInasistencia;

        return $this;
    }

    /**
     * Get costoInasistencia
     *
     * @return float
     */
    public function getCostoInasistencia()
    {
        return $this->costoInasistencia;
    }

    /**
     * Set idAlumno
     *
     * @param \BackendBundle\Entity\TblAlumno $idAlumno
     *
     * @return TblJustificacionInasistencia
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
}
