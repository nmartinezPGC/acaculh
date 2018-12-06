<?php

namespace BackendBundle\Entity;

/**
 * TblAlumno
 */
class TblAlumno
{
    /**
     * @var integer
     */
    private $idAlumno;

    /**
     * @var string
     */
    private $codAlumno;

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
    private $telefono;

    /**
     * @var integer
     */
    private $celular;

    /**
     * @var string
     */
    private $direccion;

    /**
     * @var \DateTime
     */
    private $fechaNacimiento;

    /**
     * @var boolean
     */
    private $hondureno;

    /**
     * @var string
     */
    private $nombrePadre;

    /**
     * @var string
     */
    private $nombreMadre;

    /**
     * @var string
     */
    private $trabajoPadre;

    /**
     * @var integer
     */
    private $telefonoTrabajoPadre;

    /**
     * @var string
     */
    private $trabajoMadre;

    /**
     * @var integer
     */
    private $telefonoTrabajoMadre;

    /**
     * @var string
     */
    private $nombreEncargado;

    /**
     * @var integer
     */
    private $telefonoEncargado;

    /**
     * @var string
     */
    private $nombreEmergencia;

    /**
     * @var integer
     */
    private $telefonoEmergencia;

    /**
     * @var string
     */
    private $medioConoceAch;

    /**
     * @var string
     */
    private $problemasSalud;

    /**
     * @var string
     */
    private $referencia;

    /**
     * @var \BackendBundle\Entity\TblTipoBeca
     */
    private $idTipoBeca;

    /**
     * @var \BackendBundle\Entity\TblEstado
     */
    private $idEstado;

    /**
     * @var \BackendBundle\Entity\TblGenero
     */
    private $idGenero;

    /**
     * @var \BackendBundle\Entity\TblProfesion
     */
    private $idProfesion;

    /**
     * @var \BackendBundle\Entity\TblProfesion
     */
    private $idProfesionPadre;

    /**
     * @var \BackendBundle\Entity\TblProfesion
     */
    private $idProfesionMadre;

    /**
     * @var \BackendBundle\Entity\TblUsuario
     */
    private $idUsuarioFicha;


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
     * Set codAlumno
     *
     * @param string $codAlumno
     *
     * @return TblAlumno
     */
    public function setCodAlumno($codAlumno)
    {
        $this->codAlumno = $codAlumno;

        return $this;
    }

    /**
     * Get codAlumno
     *
     * @return string
     */
    public function getCodAlumno()
    {
        return $this->codAlumno;
    }

    /**
     * Set nombre1
     *
     * @param string $nombre1
     *
     * @return TblAlumno
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
     * @return TblAlumno
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
     * @return TblAlumno
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
     * @return TblAlumno
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
     * @return TblAlumno
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
     * Set telefono
     *
     * @param integer $telefono
     *
     * @return TblAlumno
     */
    public function setTelefono($telefono)
    {
        $this->telefono = $telefono;

        return $this;
    }

    /**
     * Get telefono
     *
     * @return integer
     */
    public function getTelefono()
    {
        return $this->telefono;
    }

    /**
     * Set celular
     *
     * @param integer $celular
     *
     * @return TblAlumno
     */
    public function setCelular($celular)
    {
        $this->celular = $celular;

        return $this;
    }

    /**
     * Get celular
     *
     * @return integer
     */
    public function getCelular()
    {
        return $this->celular;
    }

    /**
     * Set direccion
     *
     * @param string $direccion
     *
     * @return TblAlumno
     */
    public function setDireccion($direccion)
    {
        $this->direccion = $direccion;

        return $this;
    }

    /**
     * Get direccion
     *
     * @return string
     */
    public function getDireccion()
    {
        return $this->direccion;
    }

    /**
     * Set fechaNacimiento
     *
     * @param \DateTime $fechaNacimiento
     *
     * @return TblAlumno
     */
    public function setFechaNacimiento($fechaNacimiento)
    {
        $this->fechaNacimiento = $fechaNacimiento;

        return $this;
    }

    /**
     * Get fechaNacimiento
     *
     * @return \DateTime
     */
    public function getFechaNacimiento()
    {
        return $this->fechaNacimiento;
    }

    /**
     * Set hondureno
     *
     * @param boolean $hondureno
     *
     * @return TblAlumno
     */
    public function setHondureno($hondureno)
    {
        $this->hondureno = $hondureno;

        return $this;
    }

    /**
     * Get hondureno
     *
     * @return boolean
     */
    public function getHondureno()
    {
        return $this->hondureno;
    }

    /**
     * Set nombrePadre
     *
     * @param string $nombrePadre
     *
     * @return TblAlumno
     */
    public function setNombrePadre($nombrePadre)
    {
        $this->nombrePadre = $nombrePadre;

        return $this;
    }

    /**
     * Get nombrePadre
     *
     * @return string
     */
    public function getNombrePadre()
    {
        return $this->nombrePadre;
    }

    /**
     * Set nombreMadre
     *
     * @param string $nombreMadre
     *
     * @return TblAlumno
     */
    public function setNombreMadre($nombreMadre)
    {
        $this->nombreMadre = $nombreMadre;

        return $this;
    }

    /**
     * Get nombreMadre
     *
     * @return string
     */
    public function getNombreMadre()
    {
        return $this->nombreMadre;
    }

    /**
     * Set trabajoPadre
     *
     * @param string $trabajoPadre
     *
     * @return TblAlumno
     */
    public function setTrabajoPadre($trabajoPadre)
    {
        $this->trabajoPadre = $trabajoPadre;

        return $this;
    }

    /**
     * Get trabajoPadre
     *
     * @return string
     */
    public function getTrabajoPadre()
    {
        return $this->trabajoPadre;
    }

    /**
     * Set telefonoTrabajoPadre
     *
     * @param integer $telefonoTrabajoPadre
     *
     * @return TblAlumno
     */
    public function setTelefonoTrabajoPadre($telefonoTrabajoPadre)
    {
        $this->telefonoTrabajoPadre = $telefonoTrabajoPadre;

        return $this;
    }

    /**
     * Get telefonoTrabajoPadre
     *
     * @return integer
     */
    public function getTelefonoTrabajoPadre()
    {
        return $this->telefonoTrabajoPadre;
    }

    /**
     * Set trabajoMadre
     *
     * @param string $trabajoMadre
     *
     * @return TblAlumno
     */
    public function setTrabajoMadre($trabajoMadre)
    {
        $this->trabajoMadre = $trabajoMadre;

        return $this;
    }

    /**
     * Get trabajoMadre
     *
     * @return string
     */
    public function getTrabajoMadre()
    {
        return $this->trabajoMadre;
    }

    /**
     * Set telefonoTrabajoMadre
     *
     * @param integer $telefonoTrabajoMadre
     *
     * @return TblAlumno
     */
    public function setTelefonoTrabajoMadre($telefonoTrabajoMadre)
    {
        $this->telefonoTrabajoMadre = $telefonoTrabajoMadre;

        return $this;
    }

    /**
     * Get telefonoTrabajoMadre
     *
     * @return integer
     */
    public function getTelefonoTrabajoMadre()
    {
        return $this->telefonoTrabajoMadre;
    }

    /**
     * Set nombreEncargado
     *
     * @param string $nombreEncargado
     *
     * @return TblAlumno
     */
    public function setNombreEncargado($nombreEncargado)
    {
        $this->nombreEncargado = $nombreEncargado;

        return $this;
    }

    /**
     * Get nombreEncargado
     *
     * @return string
     */
    public function getNombreEncargado()
    {
        return $this->nombreEncargado;
    }

    /**
     * Set telefonoEncargado
     *
     * @param integer $telefonoEncargado
     *
     * @return TblAlumno
     */
    public function setTelefonoEncargado($telefonoEncargado)
    {
        $this->telefonoEncargado = $telefonoEncargado;

        return $this;
    }

    /**
     * Get telefonoEncargado
     *
     * @return integer
     */
    public function getTelefonoEncargado()
    {
        return $this->telefonoEncargado;
    }

    /**
     * Set nombreEmergencia
     *
     * @param string $nombreEmergencia
     *
     * @return TblAlumno
     */
    public function setNombreEmergencia($nombreEmergencia)
    {
        $this->nombreEmergencia = $nombreEmergencia;

        return $this;
    }

    /**
     * Get nombreEmergencia
     *
     * @return string
     */
    public function getNombreEmergencia()
    {
        return $this->nombreEmergencia;
    }

    /**
     * Set telefonoEmergencia
     *
     * @param integer $telefonoEmergencia
     *
     * @return TblAlumno
     */
    public function setTelefonoEmergencia($telefonoEmergencia)
    {
        $this->telefonoEmergencia = $telefonoEmergencia;

        return $this;
    }

    /**
     * Get telefonoEmergencia
     *
     * @return integer
     */
    public function getTelefonoEmergencia()
    {
        return $this->telefonoEmergencia;
    }

    /**
     * Set medioConoceAch
     *
     * @param string $medioConoceAch
     *
     * @return TblAlumno
     */
    public function setMedioConoceAch($medioConoceAch)
    {
        $this->medioConoceAch = $medioConoceAch;

        return $this;
    }

    /**
     * Get medioConoceAch
     *
     * @return string
     */
    public function getMedioConoceAch()
    {
        return $this->medioConoceAch;
    }

    /**
     * Set problemasSalud
     *
     * @param string $problemasSalud
     *
     * @return TblAlumno
     */
    public function setProblemasSalud($problemasSalud)
    {
        $this->problemasSalud = $problemasSalud;

        return $this;
    }

    /**
     * Get problemasSalud
     *
     * @return string
     */
    public function getProblemasSalud()
    {
        return $this->problemasSalud;
    }

    /**
     * Set referencia
     *
     * @param string $referencia
     *
     * @return TblAlumno
     */
    public function setReferencia($referencia)
    {
        $this->referencia = $referencia;

        return $this;
    }

    /**
     * Get referencia
     *
     * @return string
     */
    public function getReferencia()
    {
        return $this->referencia;
    }

    /**
     * Set idTipoBeca
     *
     * @param \BackendBundle\Entity\TblTipoBeca $idTipoBeca
     *
     * @return TblAlumno
     */
    public function setIdTipoBeca(\BackendBundle\Entity\TblTipoBeca $idTipoBeca = null)
    {
        $this->idTipoBeca = $idTipoBeca;

        return $this;
    }

    /**
     * Get idTipoBeca
     *
     * @return \BackendBundle\Entity\TblTipoBeca
     */
    public function getIdTipoBeca()
    {
        return $this->idTipoBeca;
    }

    /**
     * Set idEstado
     *
     * @param \BackendBundle\Entity\TblEstado $idEstado
     *
     * @return TblAlumno
     */
    public function setIdEstado(\BackendBundle\Entity\TblEstado $idEstado = null)
    {
        $this->idEstado = $idEstado;

        return $this;
    }

    /**
     * Get idEstado
     *
     * @return \BackendBundle\Entity\TblEstado
     */
    public function getIdEstado()
    {
        return $this->idEstado;
    }

    /**
     * Set idGenero
     *
     * @param \BackendBundle\Entity\TblGenero $idGenero
     *
     * @return TblAlumno
     */
    public function setIdGenero(\BackendBundle\Entity\TblGenero $idGenero = null)
    {
        $this->idGenero = $idGenero;

        return $this;
    }

    /**
     * Get idGenero
     *
     * @return \BackendBundle\Entity\TblGenero
     */
    public function getIdGenero()
    {
        return $this->idGenero;
    }

    /**
     * Set idProfesion
     *
     * @param \BackendBundle\Entity\TblProfesion $idProfesion
     *
     * @return TblAlumno
     */
    public function setIdProfesion(\BackendBundle\Entity\TblProfesion $idProfesion = null)
    {
        $this->idProfesion = $idProfesion;

        return $this;
    }

    /**
     * Get idProfesion
     *
     * @return \BackendBundle\Entity\TblProfesion
     */
    public function getIdProfesion()
    {
        return $this->idProfesion;
    }

    /**
     * Set idProfesionPadre
     *
     * @param \BackendBundle\Entity\TblProfesion $idProfesionPadre
     *
     * @return TblAlumno
     */
    public function setIdProfesionPadre(\BackendBundle\Entity\TblProfesion $idProfesionPadre = null)
    {
        $this->idProfesionPadre = $idProfesionPadre;

        return $this;
    }

    /**
     * Get idProfesionPadre
     *
     * @return \BackendBundle\Entity\TblProfesion
     */
    public function getIdProfesionPadre()
    {
        return $this->idProfesionPadre;
    }

    /**
     * Set idProfesionMadre
     *
     * @param \BackendBundle\Entity\TblProfesion $idProfesionMadre
     *
     * @return TblAlumno
     */
    public function setIdProfesionMadre(\BackendBundle\Entity\TblProfesion $idProfesionMadre = null)
    {
        $this->idProfesionMadre = $idProfesionMadre;

        return $this;
    }

    /**
     * Get idProfesionMadre
     *
     * @return \BackendBundle\Entity\TblProfesion
     */
    public function getIdProfesionMadre()
    {
        return $this->idProfesionMadre;
    }

    /**
     * Set idUsuarioFicha
     *
     * @param \BackendBundle\Entity\TblUsuario $idUsuarioFicha
     *
     * @return TblAlumno
     */
    public function setIdUsuarioFicha(\BackendBundle\Entity\TblUsuario $idUsuarioFicha = null)
    {
        $this->idUsuarioFicha = $idUsuarioFicha;

        return $this;
    }

    /**
     * Get idUsuarioFicha
     *
     * @return \BackendBundle\Entity\TblUsuario
     */
    public function getIdUsuarioFicha()
    {
        return $this->idUsuarioFicha;
    }
    /**
     * @var \DateTime
     */
    private $fechaIngreso;

    /**
     * @var \DateTime
     */
    private $horaIngreso;


    /**
     * Set fechaIngreso
     *
     * @param \DateTime $fechaIngreso
     *
     * @return TblAlumno
     */
    public function setFechaIngreso($fechaIngreso)
    {
        $this->fechaIngreso = $fechaIngreso;

        return $this;
    }

    /**
     * Get fechaIngreso
     *
     * @return \DateTime
     */
    public function getFechaIngreso()
    {
        return $this->fechaIngreso;
    }

    /**
     * Set horaIngreso
     *
     * @param \DateTime $horaIngreso
     *
     * @return TblAlumno
     */
    public function setHoraIngreso($horaIngreso)
    {
        $this->horaIngreso = $horaIngreso;

        return $this;
    }

    /**
     * Get horaIngreso
     *
     * @return \DateTime
     */
    public function getHoraIngreso()
    {
        return $this->horaIngreso;
    }
}
