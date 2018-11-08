<?php

namespace BackendBundle\Entity;

/**
 * TblPago
 */
class TblPago
{
    /**
     * @var integer
     */
    private $idPago;

    /**
     * @var string
     */
    private $codDocumento;

    /**
     * @var \DateTime
     */
    private $fechaPago;

    /**
     * @var \DateTime
     */
    private $horaPago;

    /**
     * @var string
     */
    private $conceptoPago;

    /**
     * @var float
     */
    private $montoPago;

    /**
     * @var \BackendBundle\Entity\TblEstado
     */
    private $idEstadoPago;

    /**
     * @var \BackendBundle\Entity\TblAlumno
     */
    private $idAlumno;


    /**
     * Get idPago
     *
     * @return integer
     */
    public function getIdPago()
    {
        return $this->idPago;
    }

    /**
     * Set codDocumento
     *
     * @param string $codDocumento
     *
     * @return TblPago
     */
    public function setCodDocumento($codDocumento)
    {
        $this->codDocumento = $codDocumento;

        return $this;
    }

    /**
     * Get codDocumento
     *
     * @return string
     */
    public function getCodDocumento()
    {
        return $this->codDocumento;
    }

    /**
     * Set fechaPago
     *
     * @param \DateTime $fechaPago
     *
     * @return TblPago
     */
    public function setFechaPago($fechaPago)
    {
        $this->fechaPago = $fechaPago;

        return $this;
    }

    /**
     * Get fechaPago
     *
     * @return \DateTime
     */
    public function getFechaPago()
    {
        return $this->fechaPago;
    }

    /**
     * Set horaPago
     *
     * @param \DateTime $horaPago
     *
     * @return TblPago
     */
    public function setHoraPago($horaPago)
    {
        $this->horaPago = $horaPago;

        return $this;
    }

    /**
     * Get horaPago
     *
     * @return \DateTime
     */
    public function getHoraPago()
    {
        return $this->horaPago;
    }

    /**
     * Set conceptoPago
     *
     * @param string $conceptoPago
     *
     * @return TblPago
     */
    public function setConceptoPago($conceptoPago)
    {
        $this->conceptoPago = $conceptoPago;

        return $this;
    }

    /**
     * Get conceptoPago
     *
     * @return string
     */
    public function getConceptoPago()
    {
        return $this->conceptoPago;
    }

    /**
     * Set montoPago
     *
     * @param float $montoPago
     *
     * @return TblPago
     */
    public function setMontoPago($montoPago)
    {
        $this->montoPago = $montoPago;

        return $this;
    }

    /**
     * Get montoPago
     *
     * @return float
     */
    public function getMontoPago()
    {
        return $this->montoPago;
    }

    /**
     * Set idEstadoPago
     *
     * @param \BackendBundle\Entity\TblEstado $idEstadoPago
     *
     * @return TblPago
     */
    public function setIdEstadoPago(\BackendBundle\Entity\TblEstado $idEstadoPago = null)
    {
        $this->idEstadoPago = $idEstadoPago;

        return $this;
    }

    /**
     * Get idEstadoPago
     *
     * @return \BackendBundle\Entity\TblEstado
     */
    public function getIdEstadoPago()
    {
        return $this->idEstadoPago;
    }

    /**
     * Set idAlumno
     *
     * @param \BackendBundle\Entity\TblAlumno $idAlumno
     *
     * @return TblPago
     */
    public function setIdAlumno(\BackendBundle\Entity\TblAlumno $idAlumno = null)
    {
        $this->idAlumno = $idAlumno;

        return $this;
    }

    /**
     * Get idAlumno
     *
     * @return \BackendBundle\Entity\TblAlumno
     */
    public function getIdAlumno()
    {
        return $this->idAlumno;
    }
}
