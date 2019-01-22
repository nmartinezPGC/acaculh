<?php

namespace BackendBundle\Entity;

/**
 * TblGrupo
 */
class TblGrupo
{
    /**
     * @var integer
     */
    private $idGrupos;

    /**
     * @var string
     */
    private $codGrupo;

    /**
     * @var string
     */
    private $descGrupo;


    /**
     * Get idGrupos
     *
     * @return integer
     */
    public function getIdGrupos()
    {
        return $this->idGrupos;
    }

    /**
     * Set codGrupo
     *
     * @param string $codGrupo
     *
     * @return TblGrupo
     */
    public function setCodGrupo($codGrupo)
    {
        $this->codGrupo = $codGrupo;

        return $this;
    }

    /**
     * Get codGrupo
     *
     * @return string
     */
    public function getCodGrupo()
    {
        return $this->codGrupo;
    }

    /**
     * Set descGrupo
     *
     * @param string $descGrupo
     *
     * @return TblGrupo
     */
    public function setDescGrupo($descGrupo)
    {
        $this->descGrupo = $descGrupo;

        return $this;
    }

    /**
     * Get descGrupo
     *
     * @return string
     */
    public function getDescGrupo()
    {
        return $this->descGrupo;
    }
}

