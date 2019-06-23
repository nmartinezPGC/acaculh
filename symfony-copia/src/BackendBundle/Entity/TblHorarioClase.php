<?php

namespace BackendBundle\Entity;

/**
 * TblHorarioClase
 */
class TblHorarioClase
{
    /**
     * @var integer
     */
    private $idHorarioClase;

    /**
     * @var string
     */
    private $codHorarioClase;

    /**
     * @var string
     */
    private $descHorarioClase;

    /**
     * @var string
     */
    private $diasHorarioClase;


    /**
     * Get idHorarioClase
     *
     * @return integer
     */
    public function getIdHorarioClase()
    {
        return $this->idHorarioClase;
    }

    /**
     * Set codHorarioClase
     *
     * @param string $codHorarioClase
     *
     * @return TblHorarioClase
     */
    public function setCodHorarioClase($codHorarioClase)
    {
        $this->codHorarioClase = $codHorarioClase;

        return $this;
    }

    /**
     * Get codHorarioClase
     *
     * @return string
     */
    public function getCodHorarioClase()
    {
        return $this->codHorarioClase;
    }

    /**
     * Set descHorarioClase
     *
     * @param string $descHorarioClase
     *
     * @return TblHorarioClase
     */
    public function setDescHorarioClase($descHorarioClase)
    {
        $this->descHorarioClase = $descHorarioClase;

        return $this;
    }

    /**
     * Get descHorarioClase
     *
     * @return string
     */
    public function getDescHorarioClase()
    {
        return $this->descHorarioClase;
    }

    /**
     * Set diasHorarioClase
     *
     * @param string $diasHorarioClase
     *
     * @return TblHorarioClase
     */
    public function setDiasHorarioClase($diasHorarioClase)
    {
        $this->diasHorarioClase = $diasHorarioClase;

        return $this;
    }

    /**
     * Get diasHorarioClase
     *
     * @return string
     */
    public function getDiasHorarioClase()
    {
        return $this->diasHorarioClase;
    }
    /**
     * @var boolean
     */
    private $activo = '1';


    /**
     * Set activo
     *
     * @param boolean $activo
     *
     * @return TblHorarioClase
     */
    public function setActivo($activo)
    {
        $this->activo = $activo;

        return $this;
    }

    /**
     * Get activo
     *
     * @return boolean
     */
    public function getActivo()
    {
        return $this->activo;
    }
}
