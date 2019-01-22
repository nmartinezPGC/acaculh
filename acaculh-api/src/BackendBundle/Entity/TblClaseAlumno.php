<?php

namespace BackendBundle\Entity;

/**
 * TblClaseAlumno
 */
class TblClaseAlumno
{
    /**
     * @var integer
     */
    private $idClaseAlumno;

    /**
     * @var integer
     */
    private $idClase;

    /**
     * @var integer
     */
    private $idAlumno;


    /**
     * Get idClaseAlumno
     *
     * @return integer
     */
    public function getIdClaseAlumno()
    {
        return $this->idClaseAlumno;
    }

    /**
     * Set idClase
     *
     * @param integer $idClase
     *
     * @return TblClaseAlumno
     */
    public function setIdClase($idClase)
    {
        $this->idClase = $idClase;

        return $this;
    }

    /**
     * Get idClase
     *
     * @return integer
     */
    public function getIdClase()
    {
        return $this->idClase;
    }

    /**
     * Set idAlumno
     *
     * @param integer $idAlumno
     *
     * @return TblClaseAlumno
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
}

