<?php

namespace BackendBundle\Entity;

/**
 * TblLugarPractica
 */
class TblLugarPractica
{
    /**
     * @var integer
     */
    private $idLugarPractica;

    /**
     * @var string
     */
    private $codLugarPractica;

    /**
     * @var string
     */
    private $descLugarPractica;


    /**
     * Get idLugarPractica
     *
     * @return integer
     */
    public function getIdLugarPractica()
    {
        return $this->idLugarPractica;
    }

    /**
     * Set codLugarPractica
     *
     * @param string $codLugarPractica
     *
     * @return TblLugarPractica
     */
    public function setCodLugarPractica($codLugarPractica)
    {
        $this->codLugarPractica = $codLugarPractica;

        return $this;
    }

    /**
     * Get codLugarPractica
     *
     * @return string
     */
    public function getCodLugarPractica()
    {
        return $this->codLugarPractica;
    }

    /**
     * Set descLugarPractica
     *
     * @param string $descLugarPractica
     *
     * @return TblLugarPractica
     */
    public function setDescLugarPractica($descLugarPractica)
    {
        $this->descLugarPractica = $descLugarPractica;

        return $this;
    }

    /**
     * Get descLugarPractica
     *
     * @return string
     */
    public function getDescLugarPractica()
    {
        return $this->descLugarPractica;
    }
}

