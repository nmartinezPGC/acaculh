<?php

namespace BackendBundle\Entity;

/**
 * TblTipoBeca
 */
class TblTipoBeca
{
    /**
     * @var integer
     */
    private $idTipoBeca;

    /**
     * @var string
     */
    private $codTipoBeca;

    /**
     * @var string
     */
    private $descTipoBeca;


    /**
     * Get idTipoBeca
     *
     * @return integer
     */
    public function getIdTipoBeca()
    {
        return $this->idTipoBeca;
    }

    /**
     * Set codTipoBeca
     *
     * @param string $codTipoBeca
     *
     * @return TblTipoBeca
     */
    public function setCodTipoBeca($codTipoBeca)
    {
        $this->codTipoBeca = $codTipoBeca;

        return $this;
    }

    /**
     * Get codTipoBeca
     *
     * @return string
     */
    public function getCodTipoBeca()
    {
        return $this->codTipoBeca;
    }

    /**
     * Set descTipoBeca
     *
     * @param string $descTipoBeca
     *
     * @return TblTipoBeca
     */
    public function setDescTipoBeca($descTipoBeca)
    {
        $this->descTipoBeca = $descTipoBeca;

        return $this;
    }

    /**
     * Get descTipoBeca
     *
     * @return string
     */
    public function getDescTipoBeca()
    {
        return $this->descTipoBeca;
    }
}
