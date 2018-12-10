<?php

namespace BackendBundle\Entity;

/**
 * TblTipoUsuario
 */
class TblTipoUsuario
{
    /**
     * @var integer
     */
    private $idTipoUsuario;

    /**
     * @var string
     */
    private $codTipoUsuario;

    /**
     * @var string
     */
    private $descripcionTipoUsuario;

    /**
     * @var boolean
     */
    private $activo;


    /**
     * Get idTipoUsuario
     *
     * @return integer
     */
    public function getIdTipoUsuario()
    {
        return $this->idTipoUsuario;
    }

    /**
     * Set codTipoUsuario
     *
     * @param string $codTipoUsuario
     *
     * @return TblTipoUsuario
     */
    public function setCodTipoUsuario($codTipoUsuario)
    {
        $this->codTipoUsuario = $codTipoUsuario;

        return $this;
    }

    /**
     * Get codTipoUsuario
     *
     * @return string
     */
    public function getCodTipoUsuario()
    {
        return $this->codTipoUsuario;
    }

    /**
     * Set descripcionTipoUsuario
     *
     * @param string $descripcionTipoUsuario
     *
     * @return TblTipoUsuario
     */
    public function setDescripcionTipoUsuario($descripcionTipoUsuario)
    {
        $this->descripcionTipoUsuario = $descripcionTipoUsuario;

        return $this;
    }

    /**
     * Get descripcionTipoUsuario
     *
     * @return string
     */
    public function getDescripcionTipoUsuario()
    {
        return $this->descripcionTipoUsuario;
    }

    /**
     * Set activo
     *
     * @param boolean $activo
     *
     * @return TblTipoUsuario
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

