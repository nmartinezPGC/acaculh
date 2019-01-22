<?php

namespace BackendBundle\Entity;

/**
 * TblDocumentoInasistencia
 */
class TblDocumentoInasistencia
{
    /**
     * @var integer
     */
    private $idDocumentosInasistencias;

    /**
     * @var string
     */
    private $urlDocumento;

    /**
     * @var \BackendBundle\Entity\TblJustificacionInasistencia
     */
    private $idJustificacionInasistencia;


    /**
     * Get idDocumentosInasistencias
     *
     * @return integer
     */
    public function getIdDocumentosInasistencias()
    {
        return $this->idDocumentosInasistencias;
    }

    /**
     * Set urlDocumento
     *
     * @param string $urlDocumento
     *
     * @return TblDocumentoInasistencia
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
     * Set idJustificacionInasistencia
     *
     * @param \BackendBundle\Entity\TblJustificacionInasistencia $idJustificacionInasistencia
     *
     * @return TblDocumentoInasistencia
     */
    public function setIdJustificacionInasistencia(\BackendBundle\Entity\TblJustificacionInasistencia $idJustificacionInasistencia = null)
    {
        $this->idJustificacionInasistencia = $idJustificacionInasistencia;

        return $this;
    }

    /**
     * Get idJustificacionInasistencia
     *
     * @return \BackendBundle\Entity\TblJustificacionInasistencia
     */
    public function getIdJustificacionInasistencia()
    {
        return $this->idJustificacionInasistencia;
    }
}

