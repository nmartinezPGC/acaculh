<?php

namespace BackendBundle\Entity;

/**
 * TblMedioConoceAch
 */
class TblMedioConoceAch
{
    /**
     * @var integer
     */
    private $idMedioConoceAch;

    /**
     * @var string
     */
    private $codMedioConoceAch;

    /**
     * @var string
     */
    private $descripcionMedioConoceAch;


    /**
     * Get idMedioConoceAch
     *
     * @return integer
     */
    public function getIdMedioConoceAch()
    {
        return $this->idMedioConoceAch;
    }

    /**
     * Set codMedioConoceAch
     *
     * @param string $codMedioConoceAch
     *
     * @return TblMedioConoceAch
     */
    public function setCodMedioConoceAch($codMedioConoceAch)
    {
        $this->codMedioConoceAch = $codMedioConoceAch;

        return $this;
    }

    /**
     * Get codMedioConoceAch
     *
     * @return string
     */
    public function getCodMedioConoceAch()
    {
        return $this->codMedioConoceAch;
    }

    /**
     * Set descripcionMedioConoceAch
     *
     * @param string $descripcionMedioConoceAch
     *
     * @return TblMedioConoceAch
     */
    public function setDescripcionMedioConoceAch($descripcionMedioConoceAch)
    {
        $this->descripcionMedioConoceAch = $descripcionMedioConoceAch;

        return $this;
    }

    /**
     * Get descripcionMedioConoceAch
     *
     * @return string
     */
    public function getDescripcionMedioConoceAch()
    {
        return $this->descripcionMedioConoceAch;
    }
}

