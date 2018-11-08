<?php

namespace BackendBundle\Entity;

/**
 * TblVoucher
 */
class TblVoucher
{
    /**
     * @var integer
     */
    private $idVoucher;

    /**
     * @var string
     */
    private $codDocumento;

    /**
     * @var float
     */
    private $montoVoucher;

    /**
     * @var string
     */
    private $urlDocumento;

    /**
     * @var integer
     */
    private $idAlumno;

    /**
     * @var \BackendBundle\Entity\TblTipoDocumento
     */
    private $idTipoDocumento;


    /**
     * Get idVoucher
     *
     * @return integer
     */
    public function getIdVoucher()
    {
        return $this->idVoucher;
    }

    /**
     * Set codDocumento
     *
     * @param string $codDocumento
     *
     * @return TblVoucher
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
     * Set montoVoucher
     *
     * @param float $montoVoucher
     *
     * @return TblVoucher
     */
    public function setMontoVoucher($montoVoucher)
    {
        $this->montoVoucher = $montoVoucher;

        return $this;
    }

    /**
     * Get montoVoucher
     *
     * @return float
     */
    public function getMontoVoucher()
    {
        return $this->montoVoucher;
    }

    /**
     * Set urlDocumento
     *
     * @param string $urlDocumento
     *
     * @return TblVoucher
     */
    public function setUrlDocumento($urlDocumento)
    {
        $this->urlDocumento = $urlDocumento;

        return $this;
    }

    /**
     * Get urlDocumento
     *
     * @return string
     */
    public function getUrlDocumento()
    {
        return $this->urlDocumento;
    }

    /**
     * Set idAlumno
     *
     * @param integer $idAlumno
     *
     * @return TblVoucher
     */
    public function setIdAlumno($idAlumno)
    {
        $this->idAlumno = $idAlumno;

        return $this;
    }

    /**
     * Get idAlumno
     *
     * @return integer
     */
    public function getIdAlumno()
    {
        return $this->idAlumno;
    }

    /**
     * Set idTipoDocumento
     *
     * @param \BackendBundle\Entity\TblTipoDocumento $idTipoDocumento
     *
     * @return TblVoucher
     */
    public function setIdTipoDocumento(\BackendBundle\Entity\TblTipoDocumento $idTipoDocumento = null)
    {
        $this->idTipoDocumento = $idTipoDocumento;

        return $this;
    }

    /**
     * Get idTipoDocumento
     *
     * @return \BackendBundle\Entity\TblTipoDocumento
     */
    public function getIdTipoDocumento()
    {
        return $this->idTipoDocumento;
    }
}
