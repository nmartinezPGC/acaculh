import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../material-widgets/select/select.component';
import { ListasComunesService } from '../../../shared/services/listas.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { RegistroPlatosModel } from '../model/registro-platos.model';
import { RegistroPlatosService } from '../service/registro-platos.service';

@Component({
  selector: 'app-registro-platos',
  templateUrl: './registro-platos.component.html',
  styleUrls: ['./registro-platos.component.scss'],
  providers: [ListasComunesService, RegistroPlatosService],
})
export class RegistroPlatosComponent implements OnInit {
  // Activamos la Opcion de Formularios lineales
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  /**
   * Seccion de Planificar los validadores
   */
  codPlato = new FormControl('', [
    Validators.required,
  ]);

  nombre1 = new FormControl('', [
    Validators.required,
  ]);

  idTipoPlato = new FormControl('', [
    Validators.required,
  ]);

  nombrePlato = new FormControl('', [
    Validators.required,
  ]);

  descripcionPlato = new FormControl('', [
    Validators.required,
  ]);

  calificacionPlato = new FormControl('', [
    Validators.required,
  ]);
  // Fin de validadores

  matcher = new MyErrorStateMatcher();

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetlistaTipoPlatos: any[];

  public _registroPlatosModel: RegistroPlatosModel;

  // Variables de mostrar Datos de la tabla
  public showData2: boolean = false;
  public urlConfigLocal: string;
  public urlResourseLocal: string;

  /*****************************************************
  * Funcion: Constructor
  *
  ******************************************************/
  constructor(private _formBuilder: FormBuilder,
    private _listasComunes: ListasComunesService,
    private _registroPlatosService: RegistroPlatosService,
    public snackBar: MatSnackBar) {
    // Seteo de la Ruta de la Url Config
    this.urlConfigLocal = this._registroPlatosService.url;
    this.urlResourseLocal = this._registroPlatosService.urlResourses;
    // this.urlComplete = this.urlResourseLocal + "uploads/correspondencia/";
  }

  // Configuracion del Mensaje de Confirmacion
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  /*****************************************************
  * Funcion: ngOnInit
  *
  ******************************************************/
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // Definicion de la Insercion de los Datos de Nueva Comunicacion
    this._registroPlatosModel = new RegistroPlatosModel(
      0, null, null, null, // Identifiacion
      0, null, 0, // Generales 2
    );

    // Iniciamos las Listas Comunes
    this.getlistaTiposPlatos();
  }


  /*****************************************************
  * Funcion: FND-00002
  * Fecha: 04-01-2019
  * Descripcion: Carga la Lista de Todas Tipos Plato
  * Objetivo: Obtener la lista de Tipos Plato
  * de la BD, Llamando a la API, por su metodo
  * ( all-list-tipo-platos ).
  ******************************************************/
  getlistaTiposPlatos() {
    // Llamamos al Servicio que provee todas las Profesiones
    this._registroPlatosService.platosTipoViewAll('', 'all-list-tipo-platos').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaTipoPlatos = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion');
        } else {
          this.JsonOutgetlistaTipoPlatos = response.data;
          console.log(this.JsonOutgetlistaTipoPlatos);
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          // console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  } // FIN : FND-00002


  /*****************************************************
    * Funcion: FND-00003
    * Fecha: 12-02-2018
    * Descripcion: Guardar el Nuevo Plato
    * Objetivo: Guardar el Nuevo Plato
    * de la BD, Llamando a la API, por su metodo
    * ( /platos/new-plato ).
    ******************************************************/
  nuevoPlato() {
    // Llamamos al Servicio que Ingresa el Usuario
    this._registroPlatosService.registerNewPlato(this._registroPlatosModel).subscribe(
      response => {
        // /usuario/usuario-new | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion        
          this.openSnackBar(response.msg, 'Error al Ingresar el Usuario');
        } else if (response.status === 'success') {
          // Reinicia el Formulario
          this.ngOnInit();
          this.openSnackBar(response.msg, 'Plato Ingresado exitosamente');
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          // console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  }

  limpiar() {
    this.ngOnInit();
  }

}
