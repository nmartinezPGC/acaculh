<?php

namespace BackendBundle\Entity;

/**
 * TblInstructor
 */
class TblInstructor
{
    /**
     * @var integer
     */
    private $idInstructor;

    /**
     * @var string
     */
    private $codInstructor;

    /**
     * @var string
     */
    private $nombre1;

    /**
     * @var string
     */
    private $nombre2;

    /**
     * @var string
     */
    private $apellido1;

    /**
     * @var string
     */
    private $apellido2;

    /**
     * @var string
     */
    private $email;

    /**
     * @var integer
     */
    private $aniosExp;

    /**
     * @var string
     */
    private $lugarEgresado;


    /**
     * Get idInstructor
     *
     * @return integer
     */
    public function getIdInstructor()
    {
        return $this->idInstructor;
    }

    /**
     * Set codInstructor
     *
     * @param string $codInstructor
     *
     * @return TblInstructor
     */
    public function setCodInstructor($codInstructor)
    {
        $this->codInstructor = $codInstructor;

        return $this;
    }

    /**
     * Get codInstructor
     *
     * @return string
     */
    public function getCodInstructor()
    {
        return $this->codInstructor;
    }

    /**
     * Set nombre1
     *
     * @param string $nombre1
     *
     * @return TblInstructor
     */
    public function setNombre1($nombre1)
    {
        $this->nombre1 = $nombre1;

        return $this;
    }

    /**
     * Get nombre1
     *
     * @return string
     */
    public function getNombre1()
    {
        return $this->nombre1;
    }

    /**
     * Set nombre2
     *
     * @param string $nombre2
     *
     * @return TblInstructor
     */
    public function setNombre2($nombre2)
    {
        $this->nombre2 = $nombre2;

        return $this;
    }

    /**
     * Get nombre2
     *
     * @return string
     */
    public function getNombre2()
    {
        return $this->nombre2;
    }

    /**
     * Set apellido1
     *
     * @param string $apellido1
     *
     * @return TblInstructor
     */
    public function setApellido1($apellido1)
    {
        $this->apellido1 = $apellido1;

        return $this;
    }

    /**
     * Get apellido1
     *
     * @return string
     */
    public function getApellido1()
    {
        return $this->apellido1;
    }

    /**
     * Set apellido2
     *
     * @param string $apellido2
     *
     * @return TblInstructor
     */
    public function setApellido2($apellido2)
    {
        $this->apellido2 = $apellido2;

        return $this;
    }

    /**
     * Get apellido2
     *
     * @return string
     */
    public function getApellido2()
    {
        return $this->apellido2;
    }

    /**
     * Set email
     *
     * @param string $email
     *
     * @return TblInstructor
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set aniosExp
     *
     * @param integer $aniosExp
     *
     * @return TblInstructor
     */
    public function setAniosExp($aniosExp)
    {
        $this->aniosExp = $aniosExp;

        return $this;
    }

    /**
     * Get aniosExp
     *
     * @return integer
     */
    public function getAniosExp()
    {
        return $this->aniosExp;
    }

    /**
     * Set lugarEgresado
     *
     * @param string $lugarEgresado
     *
     * @return TblInstructor
     */
    public function setLugarEgresado($lugarEgresado)
    {
        $this->lugarEgresado = $lugarEgresado;

        return $this;
    }

    /**
     * Get lugarEgresado
     *
     * @return string
     */
    public function getLugarEgresado()
    {
        return $this->lugarEgresado;
    }
}

