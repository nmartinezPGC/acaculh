<?php

namespace BackendBundle\Entity;

/**
 * TblTipoPlato
 */
class TblTipoPlato
{
    /**
     * @var integer
     */
    private $idTipoPlato;

    /**
     * @var string
     */
    private $codTipoPlato;

    /**
     * @var string
     */
    private $descripcionTipoPlato;

    /**
     * @var boolean
     */
    private $activo = '1';


    /**
     * Get idTipoPlato
     *
     * @return integer
     */
    public function getIdTipoPlato()
    {
        return $this->idTipoPlato;
    }

    /**
     * Set codTipoPlato
     *
     * @param string $codTipoPlato
     *
     * @return TblTipoPlato
     */
    public function setCodTipoPlato($codTipoPlato)
    {
        $this->codTipoPlato = $codTipoPlato;

        return $this;
    }

    /**
     * Get codTipoPlato
     *
     * @return string
     */
    public function getCodTipoPlato()
    {
        return $this->codTipoPlato;
    }

    /**
     * Set descripcionTipoPlato
     *
     * @param string $descripcionTipoPlato
     *
     * @return TblTipoPlato
     */
    public function setDescripcionTipoPlato($descripcionTipoPlato)
    {
        $this->descripcionTipoPlato = $descripcionTipoPlato;

        return $this;
    }

    /**
     * Get descripcionTipoPlato
     *
     * @return string
     */
    public function getDescripcionTipoPlato()
    {
        return $this->descripcionTipoPlato;
    }

    /**
     * Set activo
     *
     * @param boolean $activo
     *
     * @return TblTipoPlato
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

