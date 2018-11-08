<?php

namespace BackendBundle\Entity;

/**
 * TblTipoPago
 */
class TblTipoPago
{
    /**
     * @var integer
     */
    private $idTipoPago;

    /**
     * @var string
     */
    private $codTipoPago;

    /**
     * @var string
     */
    private $descTipoPago;


    /**
     * Get idTipoPago
     *
     * @return integer
     */
    public function getIdTipoPago()
    {
        return $this->idTipoPago;
    }

    /**
     * Set codTipoPago
     *
     * @param string $codTipoPago
     *
     * @return TblTipoPago
     */
    public function setCodTipoPago($codTipoPago)
    {
        $this->codTipoPago = $codTipoPago;

        return $this;
    }

    /**
     * Get codTipoPago
     *
     * @return string
     */
    public function getCodTipoPago()
    {
        return $this->codTipoPago;
    }

    /**
     * Set descTipoPago
     *
     * @param string $descTipoPago
     *
     * @return TblTipoPago
     */
    public function setDescTipoPago($descTipoPago)
    {
        $this->descTipoPago = $descTipoPago;

        return $this;
    }

    /**
     * Get descTipoPago
     *
     * @return string
     */
    public function getDescTipoPago()
    {
        return $this->descTipoPago;
    }
}
