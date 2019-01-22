<?php

namespace BackendBundle\Entity;

/**
 * TblSecuenciales
 */
class TblSecuenciales
{
    /**
     * @var integer
     */
    private $idSecuencia;

    /**
     * @var string
     */
    private $codSecuencia;

    /**
     * @var integer
     */
    private $valor1;

    /**
     * @var string
     */
    private $valor2;


    /**
     * Get idSecuencia
     *
     * @return integer
     */
    public function getIdSecuencia()
    {
        return $this->idSecuencia;
    }

    /**
     * Set codSecuencia
     *
     * @param string $codSecuencia
     *
     * @return TblSecuenciales
     */
    public function setCodSecuencia($codSecuencia)
    {
        $this->codSecuencia = $codSecuencia;

        return $this;
    }

    /**
     * Get codSecuencia
     *
     * @return string
     */
    public function getCodSecuencia()
    {
        return $this->codSecuencia;
    }

    /**
     * Set valor1
     *
     * @param integer $valor1
     *
     * @return TblSecuenciales
     */
    public function setValor1($valor1)
    {
        $this->valor1 = $valor1;

        return $this;
    }

    /**
     * Get valor1
     *
     * @return integer
     */
    public function getValor1()
    {
        return $this->valor1;
    }

    /**
     * Set valor2
     *
     * @param string $valor2
     *
     * @return TblSecuenciales
     */
    public function setValor2($valor2)
    {
        $this->valor2 = $valor2;

        return $this;
    }

    /**
     * Get valor2
     *
     * @return string
     */
    public function getValor2()
    {
        return $this->valor2;
    }
}

