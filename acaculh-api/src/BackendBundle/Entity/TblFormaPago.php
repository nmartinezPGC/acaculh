<?php

namespace BackendBundle\Entity;

/**
 * TblFormaPago
 */
class TblFormaPago
{
    /**
     * @var integer
     */
    private $idFormaPago;

    /**
     * @var string
     */
    private $codFormaPago;

    /**
     * @var string
     */
    private $descFormaPago;

    /**
     * @var boolean
     */
    private $activo = '1';


    /**
     * Get idFormaPago
     *
     * @return integer
     */
    public function getIdFormaPago()
    {
        return $this->idFormaPago;
    }

    /**
     * Set codFormaPago
     *
     * @param string $codFormaPago
     *
     * @return TblFormaPago
     */
    public function setCodFormaPago($codFormaPago)
    {
        $this->codFormaPago = $codFormaPago;

        return $this;
    }

    /**
     * Get codFormaPago
     *
     * @return string
     */
    public function getCodFormaPago()
    {
        return $this->codFormaPago;
    }

    /**
     * Set descFormaPago
     *
     * @param string $descFormaPago
     *
     * @return TblFormaPago
     */
    public function setDescFormaPago($descFormaPago)
    {
        $this->descFormaPago = $descFormaPago;

        return $this;
    }

    /**
     * Get descFormaPago
     *
     * @return string
     */
    public function getDescFormaPago()
    {
        return $this->descFormaPago;
    }

    /**
     * Set activo
     *
     * @param boolean $activo
     *
     * @return TblFormaPago
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

