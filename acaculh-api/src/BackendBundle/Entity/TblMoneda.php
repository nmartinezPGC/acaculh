<?php

namespace BackendBundle\Entity;

/**
 * TblMoneda
 */
class TblMoneda
{
    /**
     * @var integer
     */
    private $idMoneda;

    /**
     * @var string
     */
    private $codMoneda;

    /**
     * @var string
     */
    private $descMoneda;


    /**
     * Get idMoneda
     *
     * @return integer
     */
    public function getIdMoneda()
    {
        return $this->idMoneda;
    }

    /**
     * Set codMoneda
     *
     * @param string $codMoneda
     *
     * @return TblMoneda
     */
    public function setCodMoneda($codMoneda)
    {
        $this->codMoneda = $codMoneda;

        return $this;
    }

    /**
     * Get codMoneda
     *
     * @return string
     */
    public function getCodMoneda()
    {
        return $this->codMoneda;
    }

    /**
     * Set descMoneda
     *
     * @param string $descMoneda
     *
     * @return TblMoneda
     */
    public function setDescMoneda($descMoneda)
    {
        $this->descMoneda = $descMoneda;

        return $this;
    }

    /**
     * Get descMoneda
     *
     * @return string
     */
    public function getDescMoneda()
    {
        return $this->descMoneda;
    }
}

