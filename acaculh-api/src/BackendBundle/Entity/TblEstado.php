<?php

namespace BackendBundle\Entity;

/**
 * TblEstado
 */
class TblEstado
{
    /**
     * @var integer
     */
    private $idEstado;

    /**
     * @var string
     */
    private $codEstado;

    /**
     * @var string
     */
    private $descripcionEstado;

    /**
     * @var \BackendBundle\Entity\TblGrupo
     */
    private $idGrupo;


    /**
     * Get idEstado
     *
     * @return integer
     */
    public function getIdEstado()
    {
        return $this->idEstado;
    }

    /**
     * Set codEstado
     *
     * @param string $codEstado
     *
     * @return TblEstado
     */
    public function setCodEstado($codEstado)
    {
        $this->codEstado = $codEstado;

        return $this;
    }

    /**
     * Get codEstado
     *
     * @return string
     */
    public function getCodEstado()
    {
        return $this->codEstado;
    }

    /**
     * Set descripcionEstado
     *
     * @param string $descripcionEstado
     *
     * @return TblEstado
     */
    public function setDescripcionEstado($descripcionEstado)
    {
        $this->descripcionEstado = $descripcionEstado;

        return $this;
    }

    /**
     * Get descripcionEstado
     *
     * @return string
     */
    public function getDescripcionEstado()
    {
        return $this->descripcionEstado;
    }

    /**
     * Set idGrupo
     *
     * @param \BackendBundle\Entity\TblGrupo $idGrupo
     *
     * @return TblEstado
     */
    public function setIdGrupo(\BackendBundle\Entity\TblGrupo $idGrupo = null)
    {
        $this->idGrupo = $idGrupo;

        return $this;
    }

    /**
     * Get idGrupo
     *
     * @return \BackendBundle\Entity\TblGrupo
     */
    public function getIdGrupo()
    {
        return $this->idGrupo;
    }
}

