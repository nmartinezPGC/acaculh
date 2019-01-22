<?php

namespace BackendBundle\Entity;

/**
 * TblGenero
 */
class TblGenero
{
    /**
     * @var integer
     */
    private $idGenero;

    /**
     * @var string
     */
    private $codGenero;

    /**
     * @var string
     */
    private $descripcionGenero;


    /**
     * Get idGenero
     *
     * @return integer
     */
    public function getIdGenero()
    {
        return $this->idGenero;
    }

    /**
     * Set codGenero
     *
     * @param string $codGenero
     *
     * @return TblGenero
     */
    public function setCodGenero($codGenero)
    {
        $this->codGenero = $codGenero;

        return $this;
    }

    /**
     * Get codGenero
     *
     * @return string
     */
    public function getCodGenero()
    {
        return $this->codGenero;
    }

    /**
     * Set descripcionGenero
     *
     * @param string $descripcionGenero
     *
     * @return TblGenero
     */
    public function setDescripcionGenero($descripcionGenero)
    {
        $this->descripcionGenero = $descripcionGenero;

        return $this;
    }

    /**
     * Get descripcionGenero
     *
     * @return string
     */
    public function getDescripcionGenero()
    {
        return $this->descripcionGenero;
    }
}

