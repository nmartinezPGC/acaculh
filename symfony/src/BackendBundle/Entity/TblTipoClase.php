<?php

namespace BackendBundle\Entity;

/**
 * TblTipoClase
 */
class TblTipoClase
{
    /**
     * @var integer
     */
    private $idTipoClase;

    /**
     * @var string
     */
    private $codTipoClase;

    /**
     * @var string
     */
    private $descripcionTipoClase;


    /**
     * Get idTipoClase
     *
     * @return integer
     */
    public function getIdTipoClase()
    {
        return $this->idTipoClase;
    }

    /**
     * Set codTipoClase
     *
     * @param string $codTipoClase
     *
     * @return TblTipoClase
     */
    public function setCodTipoClase($codTipoClase)
    {
        $this->codTipoClase = $codTipoClase;

        return $this;
    }

    /**
     * Get codTipoClase
     *
     * @return string
     */
    public function getCodTipoClase()
    {
        return $this->codTipoClase;
    }

    /**
     * Set descripcionTipoClase
     *
     * @param string $descripcionTipoClase
     *
     * @return TblTipoClase
     */
    public function setDescripcionTipoClase($descripcionTipoClase)
    {
        $this->descripcionTipoClase = $descripcionTipoClase;

        return $this;
    }

    /**
     * Get descripcionTipoClase
     *
     * @return string
     */
    public function getDescripcionTipoClase()
    {
        return $this->descripcionTipoClase;
    }
}
