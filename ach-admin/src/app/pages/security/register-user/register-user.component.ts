import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { ListasComunesService } from '../../../shared/services/listas.service';
import { RegisterUserService } from '../service/register-user.service';
import { RegisterUserModel } from '../model/register-user.model';
import { HttpErrorResponse } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
  providers: [RegisterUserService, ListasComunesService]
})
export class RegisterUserComponent implements OnInit {
  // Activamos la Opcion de Formularios lineales
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  /**
   * Seccion de Planificar los validadores
   */
  codUsuario = new FormControl('', [
    Validators.required,
  ]);

  nombre1 = new FormControl('', [
    Validators.required,
  ]);

  nombre2 = new FormControl('', [
    // Validators.required,
  ]);

  apellido1 = new FormControl('', [
    Validators.required,
  ]);

  apellido2 = new FormControl('', [
    // Validators.required,
  ]);

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  celular = new FormControl('', [
    Validators.required,
  ]);

  telefono = new FormControl('', [
    // Validators.required,
  ]);

  password = new FormControl('', [
    Validators.required,
  ]);

  idTipoUsuario = new FormControl('', [
    Validators.required,
  ]);

  // Fin de validadores

  matcher = new MyErrorStateMatcher();

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetlistaTipoUsuario: any[];
  
  public _registerUserModel: RegisterUserModel;

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
    private _registerUserService: RegisterUserService,
    public snackBar: MatSnackBar) {
    // Seteo de la Ruta de la Url Config
    this.urlConfigLocal = this._registerUserService.url;
    this.urlResourseLocal = this._registerUserService.urlResourses;
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
    this._registerUserModel = new RegisterUserModel(
      0, '', // Identifiacion
      null, null, null, null, null, // Generales 1
      0, 0, null, null, null, null, // Generales 2
      0, 0, null, null, // Relaciones
    );

    // Iniciamos las Listas Comunes
    this.getlistaProfesionesAllPadre();
  }


  /*****************************************************
  * Funcion: FND-00002
  * Fecha: 04-01-2019
  * Descripcion: Carga la Lista de Todas Tipos Usuarios
  * Objetivo: Obtener la lista de Tipos Usuarios
  * de la BD, Llamando a la API, por su metodo
  * ( tipo-usuario-all-list ).
  ******************************************************/
 getlistaProfesionesAllPadre() {
  // Llamamos al Servicio que provee todas las Profesiones
  this._listasComunes.listasComunes('', 'tipo-usuario-all-list').subscribe(
    response => {
      // listas/profesiones-all-list | so redirect to return url
      if (response.status === 'error') {
        // Mensaje de alerta del error en cuestion
        this.JsonOutgetlistaTipoUsuario = response.data;
        // alert(response.msg);
        this.openSnackBar(response.msg, 'Error al obtener la informacion');
      } else {
        this.JsonOutgetlistaTipoUsuario = response.data;
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

}
