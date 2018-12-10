import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

// Impotamos los Servicios a Utilizar
import { ListasComunesService } from '../../shared/services/listas.service';
import { AlumnoService } from './service/alumno.service';
import { AlumnoModel } from './model/alumno.model';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
  providers: [ListasComunesService, AlumnoService]
})
export class AlumnoComponent implements OnInit {
  // Variables de inicio
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  selected = 'option2';

  options: FormGroup;

  /**
   * Seccion de Planificar los validadores 
   */
  codigoAlumno = new FormControl('', [
    Validators.required,
  ]);

  nombre1 = new FormControl('', [
    Validators.required,
  ]);

  apellido1 = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  celularAlumno = new FormControl('', [
    Validators.required,
  ]);

  telefonoAlumno = new FormControl('', [
    Validators.required,
  ]);

  profesionAlumno = new FormControl('', [
    Validators.required,
  ]);

  idGeneroAlumno = new FormControl('', [
    Validators.required,
  ]);
  // Fin de validadores

  matcher = new MyErrorStateMatcher();

  // Variables de Systema
  public urlConfigLocal: string;
  public urlResourseLocal: string;
  public urlComplete: string;

  // Variables para Listas Comunes
  // Json de Listas Comunes
  public JsonOutgetlistaProfesionesAlumno: any[];
  public JsonOutgetlistaProfesionesPadre: any[];
  public JsonOutgetlistaProfesionesMadre: any[];

  public JsonOutgetlistaTipoBeca: any[];
  public JsonOutgetlistaGeneroAll: any[];

  public _alumnoModel: AlumnoModel;

  /*****************************************************
  * Funcion: Constructor
  * 
  ******************************************************/
  constructor(private _formBuilder: FormBuilder,
    private _listasComunes: ListasComunesService,
    private _alumnoServices: AlumnoService) {
    // Seteo de la Ruta de la Url Config
    this.urlConfigLocal = this._alumnoServices.url;
    this.urlResourseLocal = this._alumnoServices.urlResourses;
    // this.urlComplete = this.urlResourseLocal + "uploads/correspondencia/";
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
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // Definicion de la Insercion de los Datos de Nueva Comunicacion
    this._alumnoModel = new AlumnoModel(0, "",
      "", "", "", "", "", "",
      0, 0, "", 0, null, true, 0,
      "", 0, "", 0, "", 0, "", 0,
      "", 0, "", 0,
      "", "", "", 0, 0, 0, null, null,
    );

    // Iniciamos las Listas Comunes
    this.getlistaProfesionesAllAlumno();
    this.getlistaProfesionesAllPadre();
    this.getlistaProfesionesAllMadre();

    this.getlistaTipoBecas();
    this.getlistaGenerosAll();
  }

  employees = [
    { select: 'Nahum', position: 'Full stack developer', image: 'assets/profile.jpg' },
    { select: 'Sujith', position: 'Full stack developer', image: 'assets/man.jpeg' },
    { select: 'Ramya', position: 'Full stack developer', image: 'assets/noavatar.png' },
    { select: 'Sree', position: 'Full stack developer', image: 'assets/profile.jpg' },
    { select: 'Sruthy', position: 'Full stack developer', image: 'assets/noavatar.png' },
    { select: 'Fahad', position: 'Full stack developer', image: 'assets/profile.jpg' },
  ];

  /**
   * Datos de Alumnos
   */
  datosAlumnos() {

  }

  /*****************************************************
  * Funcion: FND-00001
  * Fecha: 12-02-2018
  * Descripcion: Carga la Lista de Todas las Profesiones
  * Objetivo: Obtener la lista de Todas Profesiones
  * de la BD, Llamando a la API, por su metodo
  * ( profesiones-all-list ).
  ******************************************************/
  getlistaProfesionesAllAlumno() {
    // Llamamos al Servicio que provee todas las Profesiones

    this._listasComunes.listasComunes("", "profesiones-all-list").subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status == "error") {
          //Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaProfesionesAlumno = response.data;
          // this.itemList = [];
          // alert(response.msg);
          // this.addToast(4, "Error", response.msg);
        } else {
          this.JsonOutgetlistaProfesionesAlumno = response.data;

          // this.itemList = this.JsonOutgetlistaSubDireccionesSrec;
          // console.log(this.JsonOutgetlistaProfesiones);
        }
      });
  } // FIN : FND-00001


  /*****************************************************
  * Funcion: FND-00001.1
  * Fecha: 12-02-2018
  * Descripcion: Carga la Lista de Todas las Profesiones
  * Objetivo: Obtener la lista de Todas Profesiones
  * de la BD, Llamando a la API, por su metodo
  * ( profesiones-all-list ).
  ******************************************************/
  getlistaProfesionesAllPadre() {
    // Llamamos al Servicio que provee todas las Profesiones

    this._listasComunes.listasComunes("", "profesiones-all-list").subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status == "error") {
          //Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaProfesionesPadre = response.data;
          // this.itemList = [];
          // alert(response.msg);
          // this.addToast(4, "Error", response.msg);
        } else {
          this.JsonOutgetlistaProfesionesPadre = response.data;

          // this.itemList = this.JsonOutgetlistaSubDireccionesSrec;
          // console.log(this.JsonOutgetlistaProfesiones);
        }
      });
  } // FIN : FND-00001.1


  /*****************************************************
    * Funcion: FND-00001.2
    * Fecha: 12-02-2018
    * Descripcion: Carga la Lista de Todas las Profesiones
    * Objetivo: Obtener la lista de Todas Profesiones
    * de la BD, Llamando a la API, por su metodo
    * ( profesiones-all-list ).
    ******************************************************/
  getlistaProfesionesAllMadre() {
    // Llamamos al Servicio que provee todas las Profesiones

    this._listasComunes.listasComunes("", "profesiones-all-list").subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status == "error") {
          //Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaProfesionesMadre = response.data;
          // this.itemList = [];
          // alert(response.msg);
          // this.addToast(4, "Error", response.msg);
        } else {
          this.JsonOutgetlistaProfesionesMadre = response.data;

          // this.itemList = this.JsonOutgetlistaSubDireccionesSrec;
          // console.log(this.JsonOutgetlistaProfesiones);
        }
      });
  } // FIN : FND-00001.2


  /*****************************************************
    * Funcion: FND-00002
    * Fecha: 12-02-2018
    * Descripcion: Carga la Lista de Todas Tipo Beca
    * Objetivo: Obtener la lista de Todas Tipo Beca
    * de la BD, Llamando a la API, por su metodo
    * ( tipobeca-all-list ).
    ******************************************************/
  getlistaTipoBecas() {
    // Llamamos al Servicio que provee todas los Tipo Becas

    this._listasComunes.listasComunes("", "tipobeca-all-list").subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status == "error") {
          //Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaTipoBeca = response.data;
          // this.itemList = [];
          // alert(response.msg);
          // this.addToast(4, "Error", response.msg);
        } else {
          this.JsonOutgetlistaTipoBeca = response.data;

          // this.itemList = this.JsonOutgetlistaSubDireccionesSrec;
          // console.log(this.JsonOutgetlistaProfesiones);
        }
      });
  } // FIN : FND-00002

  /*****************************************************
    * Funcion: FND-00002.1
    * Fecha: 12-02-2018
    * Descripcion: Carga la Lista de los Generos
    * Objetivo: Obtener la lista de Todas Generos
    * de la BD, Llamando a la API, por su metodo
    * ( generos-all-list ).
    ******************************************************/
  getlistaGenerosAll() {
    // Llamamos al Servicio que provee todas los Tipo Becas

    this._listasComunes.listasComunes("", "genero-all-list").subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status == "error") {
          //Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaGeneroAll = response.data;
          // this.itemList = [];
          // alert(response.msg);
          // this.addToast(4, "Error", response.msg);
        } else {
          this.JsonOutgetlistaGeneroAll = response.data;

          // this.itemList = this.JsonOutgetlistaSubDireccionesSrec;
          // console.log(this.JsonOutgetlistaProfesiones);
        }
      });
  } // FIN : FND-00002.1


  /*****************************************************
    * Funcion: FND-00003
    * Fecha: 12-02-2018
    * Descripcion: Guardar el Nuevo Alumno
    * Objetivo: Guardar el Nuevo Alumno
    * de la BD, Llamando a la API, por su metodo
    * ( alumno/new-alumno ).
    ******************************************************/
  nuevoAlumno() {
    alert('Datos de Alumno **** ' + this._alumnoModel.idGenero);
  }

}