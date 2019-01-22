import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EvaluacionesService } from '../../service/evaluacion-practica.service';
import { ErrorStateMatcher } from '@angular/material';
import { EvaluacionesModel } from '../../model/evaluaciones.model';
import { HttpErrorResponse } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-evaluacion-cocina-practica',
  templateUrl: './evaluacion-cocina-practica.component.html',
  styleUrls: ['./evaluacion-cocina-practica.component.scss'],
  providers: [EvaluacionesService]
})
export class EvaluacionCocinaPracticaComponent implements OnInit {
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    },
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  // Datos Iniciales de la Forma
  chefEvaluador: any;

  // Modelo de la Clase
  public _evaluacionesModel: EvaluacionesModel;


  /**
   * Seccion de Planificar los validadores
   */
  fechaEvaluacion = new FormControl('', [
    Validators.required,
  ]);

  idPlato = new FormControl('', [
    Validators.required,
  ]);

  nombre2 = new FormControl('', [
    // Validators.required,
  ]);

  /**
   * Constructor de la Clase
   * @param _evaluacionesService 
   */
  constructor(public _evaluacionesService: EvaluacionesService) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
  }


  /**
   * ngOnInit() 
   */
  ngOnInit() {
    // Seteo del Modelo
    this._evaluacionesModel = new EvaluacionesModel(
      0, '',
      '', '', '', '', '',
      0, 0, '', null, null, true,
      0, 0, '', '',
      0, ''
    );

    // Datos de la Consulta
    this.getlistaProfesionesAllMadre();

    // Asignacion de los Datos
    const datosLocales: any = JSON.parse(localStorage.getItem('identity'));
    this.chefEvaluador = datosLocales.nombre + ', ' + datosLocales.apellido + ' ID: ' + datosLocales.codUser;

    /**
     * Autocompleter
     */
  }

  onEnter(evt: any){
    // if (evt.source.selected) {
    alert("hello ");
    // }
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   * limpiarForma()
   */
  limpiarForma() {
    this.ngOnInit();
  }


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
    this._evaluacionesService.usuarioViewAll('').subscribe(
      res => {
        // listas/profesiones-all-list | so redirect to return url
        if (res.status === 'error') {
          // Mensaje de alerta del error en cuestion
          // this.JsonOutgetlistaProfesionesMadre = response.data;
          console.log(res.msg);
        } else {
          // this.JsonOutgetlistaProfesionesMadre = response.data;
          console.log(JSON.stringify(res.data));
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error');
        } else {
          console.log('Server-side error');
        }
      });
  } // FIN : FND-00001.2

}

export interface State {
  flag: string;
  name: string;
  population: string;
}