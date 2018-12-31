import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

// Importar la Lireria de Impresion de pdf
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

// Impotamos los Servicios a Utilizar
import { ListasComunesService } from '../../shared/services/listas.service';
import { AlumnoService } from './service/alumno.service';
import { AlumnoModel } from './model/alumno.model';

// Importamos el Component Invoice del Alumno recien Ingresado
import { InvoiceAlumnoComponent } from './invoice.alumno/invoice.alumno.component';

import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { switchAll } from 'rxjs/operators';

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
  // Decorador de la Clase Hijo de Invoice
  @ViewChild(InvoiceAlumnoComponent) hijo: InvoiceAlumnoComponent;

  // Vista de la Clase en Html
  @ViewChild('example-card') exampleCard: ElementRef;

  // Activamos la Opcion de Formularios lineales
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

  nombre11 = new FormControl('', [
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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  celularAlumno = new FormControl('', [
    Validators.required,
  ]);

  telAlumno = new FormControl('', [
    // Validators.required,
  ]);

  profesionAlumno = new FormControl('', [
    Validators.required,
  ]);

  idGeneroAlumno = new FormControl('', [
    Validators.required,
  ]);

  medioConoceAch = new FormControl('', [
    Validators.required,
  ]);

  direccionAlumno = new FormControl('', [
    Validators.required,
  ]);

  fechaNacimiento = new FormControl('', [
    // Validators.required,
  ]);

  hondureno = new FormControl('', [
    // Validators.required,
  ]);

  nombrePadre = new FormControl('', [
    // Validators.required,
  ]);

  idProfesionPadre = new FormControl('', [
    // Validators.required,
  ]);

  nombreMadre = new FormControl('', [
    // Validators.required,
  ]);

  idProfesionMadre = new FormControl('', [
    // Validators.required,
  ]);

  trabajoPadre = new FormControl('', [
    // Validators.required,
  ]);

  telefonoTrabajoPadre = new FormControl('', [
    // Validators.required,
  ]);

  trabajoMadre = new FormControl('', [
    // Validators.required,
  ]);

  telefonoTrabajoMadre = new FormControl('', [
    // Validators.required,
  ]);

  nameEncargado = new FormControl('', [
    // Validators.required,
  ]);

  telEncargado = new FormControl();

  probleSalud = new FormControl('', [
    // Validators.required,
  ]);

  referenciaAl = new FormControl('', [
    // Validators.required,
  ]);

  tipoBeca = new FormControl('', [
    Validators.required,
  ]);

  nameEmergencia = new FormControl('', [
    // Validators.required,
  ]);

  telEmergencia = new FormControl('', [
    // Validators.required,
  ]);

  montoMatricula = new FormControl('', [
    // Validators.required,
  ]);

  idFormaPago = new FormControl('', [
    // Validators.required,
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
  public JsonOutgetlistaMediosACHAll: any[];
  public JsonOutgetlistaFormasPago: any[];

  public _alumnoModel: AlumnoModel;

  /*****************************************************
  * Funcion: Constructor
  *
  ******************************************************/
  constructor(private _formBuilder: FormBuilder,
    private _listasComunes: ListasComunesService,
    private _alumnoServices: AlumnoService,
    public snackBar: MatSnackBar) {
    // Seteo de la Ruta de la Url Config
    this.urlConfigLocal = this._alumnoServices.url;
    this.urlResourseLocal = this._alumnoServices.urlResourses;
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
    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    // Definicion de la Insercion de los Datos de Nueva Comunicacion
    this._alumnoModel = new AlumnoModel(0, '', // Identificacion
      '', '', '', '', '', '', // Generales 1
      null, null, '', 0, null, true, 0, '', // Generales 2
      '', null, '', '', null, '', '', null, '', null, // Padres
      '', null, '', null, // Encargados
      '', '', '', 0, 1, 0, '', null, null, // Complentarios
      null, 0, '', // Matricula
    );

    // Iniciamos las Listas Comunes
    this.getlistaProfesionesAllAlumno();
    this.getlistaProfesionesAllPadre();
    this.getlistaProfesionesAllMadre();

    // Complementarios
    this.getlistaTipoBecas();
    this.getlistaGenerosAll();
    this.getlistaMediosACHAll();
    this.getlistaFormasPagoAll();
  }

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

    this._listasComunes.listasComunes('', 'profesiones-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaProfesionesAlumno = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Profesiones de Alumno');
        } else {
          this.JsonOutgetlistaProfesionesAlumno = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
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
    this._listasComunes.listasComunes('', 'profesiones-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaProfesionesPadre = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Profesiones de Padre');
        } else {
          this.JsonOutgetlistaProfesionesPadre = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
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

    this._listasComunes.listasComunes('', 'profesiones-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaProfesionesMadre = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Profesiones');
        } else {
          this.JsonOutgetlistaProfesionesMadre = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
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

    this._listasComunes.listasComunes('', 'tipobeca-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaTipoBeca = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion de tipo de Becas');
        } else {
          this.JsonOutgetlistaTipoBeca = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
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
    // Llamamos al Servicio que provee todas los Generos

    this._listasComunes.listasComunes('', 'genero-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaGeneroAll = response.data;
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al obtener la informacion de los Generos');
        } else {
          this.JsonOutgetlistaGeneroAll = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  } // FIN : FND-00002.1

  /*****************************************************
    * Funcion: FND-00002.2
    * Fecha: 12-02-2018
    * Descripcion: Carga la Lista de los Medios Conoce ACH
    * Objetivo: Obtener la lista de Todos los Medios Concoce ACH
    * de la BD, Llamando a la API, por su metodo
    * ( medio-ach-all-list ).
    ******************************************************/
  getlistaMediosACHAll() {
    // Llamamos al Servicio que provee todas los Medios ACH
    this._listasComunes.listasComunes('', 'medio-ach-all-list').subscribe(
      response => {
        // listas/profesiones-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaMediosACHAll = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Medio ACH');
        } else {
          this.JsonOutgetlistaMediosACHAll = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  } // FIN : FND-00002.2

  /*****************************************************
    * Funcion: FND-00002.3
    * Fecha: 25-12-2018
    * Descripcion: Carga la Lista de las Formas de Pago ACH
    * Objetivo: Obtener la lista de Todas las Formas de Pago ACH
    * de la BD, Llamando a la API, por su metodo
    * ( forma-pago-all-list ).
    ******************************************************/
  getlistaFormasPagoAll() {
    // Llamamos al Servicio que provee todas las Formas de Pago ACH
    this._listasComunes.listasComunes('', 'forma-pago-all-list').subscribe(
      response => {
        // listas/forma-pago-all-list | so redirect to return url
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          this.JsonOutgetlistaFormasPago = response.data;
          this.openSnackBar(response.msg, 'Error al obtener la informacion de Formas de Pago');
        } else {
          this.JsonOutgetlistaFormasPago = response.data;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  } // FIN : FND-00002.3


  /*****************************************************
    * Funcion: FND-00003
    * Fecha: 12-02-2018
    * Descripcion: Guardar el Nuevo Alumno
    * Objetivo: Guardar el Nuevo Alumno
    * de la BD, Llamando a la API, por su metodo
    * ( alumno/new-alumno ).
    ******************************************************/
  nuevoAlumno() {
    // Validacion de los Datos Obligatorios
    if (this.validarForm() == 1) {
      // Regresamos al Formulario a completarlo
      return -1;
    }

    // Prepara los datos a Enviar
    // console.log(this._alumnoModel);
    const token1 = this._alumnoServices.getToken();

    const identity = this._alumnoServices.getIdentity();

    // Id del Usuario que esta registrando
    const userInto = identity.sub;
    this._alumnoModel.idUsuarioFicha = userInto;

    // Iniciales de Nombre
    const inicialesAlumno: string = this._alumnoModel.nombre1.substring(0, 1) +
      this._alumnoModel.nombre2.substring(0, 1) +
      this._alumnoModel.apellido1.substring(0, 1) +
      this._alumnoModel.apellido2.substring(0, 1);
    this._alumnoModel.inicialesAlumno = inicialesAlumno;

    // console.log(this._alumnoModel);

    // Llamamos al Servicio que ingresa el nuevo Alumno
    this._alumnoServices.registerNewAlumno(token1, this._alumnoModel).subscribe(
      response => {
        // alumno/new-alumno
        if (response.status === 'error') {
          // Mensaje de alerta del error en cuestion
          // alert(response.msg);
          this.openSnackBar(response.msg, 'Error al ingresar nuevo Alumno');
        } else {
          // Inicia el Formulario
          alert(response.msg);
          this.openSnackBar(response.msg, 'Ingreso de nuevo Alumno');
          this.ngOnInit();
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
          this.openSnackBar(err.message, 'Client-side error');
        } else {
          console.log('Server-side error');
          this.openSnackBar(err.message, 'Server-side error');
        }
      });
  }


  /*****************************************************
    * Funcion: FND-00003.1
    * Fecha: 27-12-2018
    * Descripcion: Validacion del Formulario
    * Objetivo: Validar los campos del Formulario
    * (  ).
    ******************************************************/
  validarForm() {
    if ((this._alumnoModel.codAlumno == '' || this._alumnoModel.codAlumno == null)) {
      this.openSnackBar('Falta Ingresar el Codigo del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.nombre1 == '' || this._alumnoModel.apellido1 == '')) {
      this.openSnackBar('Falta Ingresar los Nombres y Apellidos del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.direccion == '' || this._alumnoModel.direccion == null)) {
      this.openSnackBar('Falta Ingresar los Nombres y Apellidos del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.idGenero == 0 || this._alumnoModel.idGenero == null)) {
      this.openSnackBar('Falta Ingresar el Genero del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.idProfesion == 0 || this._alumnoModel.idProfesion == null)) {
      this.openSnackBar('Falta Ingresar la Profesion del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.medioConoceAch == '' || this._alumnoModel.medioConoceAch == null)) {
      this.openSnackBar('Falta Ingresar el Medio como conocio ACACULH', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.idTipoBeca == 0 || this._alumnoModel.idTipoBeca == null)) {
      this.openSnackBar('Falta Ingresar el Tipo de Beca del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.montoMatricula == 0 || this._alumnoModel.montoMatricula == null)) {
      this.openSnackBar('Falta Ingresar el Monto de la Matricula del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    } else if ((this._alumnoModel.idFormaPago == 0 || this._alumnoModel.idFormaPago == null)) {
      this.openSnackBar('Falta Ingresar la Forma de Pago de Matricula del Alumno', 'Error al ingresar nuevo Alumno');
      return 1;
    }
    // Retorna 0 cuando todo esta bien
    return 0;
  }


  /*****************************************************
    * Funcion: FND-00004
    * Fecha: 17-12-2018
    * Descripcion: Enviamos los Datos a Componente Hijo
    * Objetivo: Enviar datos para Imprimir Ficha
    * (  ).
    ******************************************************/
  enviarMensaje() {
    // console.log(this._alumnoModel);
    this.hijo.saludo(this._alumnoModel);
  }

  /*****************************************************
    * Funcion: FND-00005
    * Fecha: 17-12-2018
    * Descripcion: Enviar la Profesion en Descripcion
    * Objetivo: Enviar la Profesion en Descripcion
    * para Imprimir Ficha
    ******************************************************/
  profesionDesc(descProfesion: string, indicatorSet: number) {
    // Set de dato de la Profesion
    switch (indicatorSet) {
      case 1:
        this._alumnoModel.descProfesion = descProfesion;
        break;
      case 2:
        this._alumnoModel.descProfesionPadre = descProfesion;
        break;
      case 3:
        this._alumnoModel.descProfesionMadre = descProfesion;
        break;
      case 4:
        this._alumnoModel.descTipoBeca = descProfesion;
        break;
      case 5:
        this._alumnoModel.descFormaPago = descProfesion;
        break;
      default:
        break;
    }
    console.log('Datos de Profesion del Alumno ' + descProfesion);
  }


  /*****************************************************
    * Funcion: FND-00006
    * Fecha: 22-12-2018
    * Descripcion: Limpiar la Ficha de Ingreso de Alumno
    * Objetivo: Limpiar la Ficha de Ingreso de Alumno
    ******************************************************/
  limpiarFichaIngresoAlumno() {
    this.ngOnInit();
  }

  dowloadPDF() {
    let doc = new jspdf();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'Do you like that?');

    // Save the PDF
    doc.save('Test.pdf');
  }

  public generatePDF() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  public captureScreen() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 0;
      // pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }


}
