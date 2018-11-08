<?php

namespace BackendBundle\Entity;

/**
 * TblTipoDocumento
 */
class TblTipoDocumento
{
    /**
     * @var integer
     */
    private $idTipoDocumento;

    /**
     * @var string
     */
    private $codTipoDocumento;

    /**
     * @var string
     */
    private $descripcionTipoDocumento;

    /**
     * @var boolean
     */
    private $activo;


    /**
     * Get idTipoDocumento
     *
     * @return integer
     */
    public function getIdTipoDocumento()
    {
        return $this->idTipoDocumento;
    }

    /**
     * Set codTipoDocumento
     *
     * @param string $codTipoDocumento
     *
     * @return TblTipoDocumento
     */
    public function setCodTipoDocumento($codTipoDocumento)
    {
        $this->codTipoDocumento = $codTipoDocumento;

        return $this;
    }

    /**
     * Get codTipoDocumento
     *
     * @return string
     */
    public function getCodTipoDocumento()
    {
        return $this->codTipoDocumento;
    }

    /**
     * Set descripcionTipoDocumento
     *
     * @param string $descripcionTipoDocumento
     *
     * @return TblTipoDocumento
     */
    public function setDescripcionTipoDocumento($descripcionTipoDocumento)
    {
        $this->descripcionTipoDocumento = $descripcionTipoDocumento;

        return $this;
    }

    /**
     * Get descripcionTipoDocumento
     *
     * @return string
     */
    public function getDescripcionTipoDocumento()
    {
        return $this->descripcionTipoDocumento;
    }

    /**
     * Set activo
     *
     * @param boolean $activo
     *
     * @return TblTipoDocumento
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
