import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-evaluacion-alumno',
  templateUrl: './evaluacion-alumno.component.html',
  styleUrls: ['./evaluacion-alumno.component.scss']
})
export class EvaluacionAlumnoComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  tercerFormGroup: FormGroup;
  cuartoFormGroup: FormGroup;

  // Datos Iniciales del Formulario
  public chefEvaluador: string;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.tercerFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.cuartoFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public dashCard = [
    { colorDark: '#5C6BC0', colorLight: '#7986CB', number: 925, title: 'ALUMNOS', icon: 'local_grocery_store' },
    { colorDark: '#42A5F5', colorLight: '#64B5F6', number: '12,500', title: 'PAGOS', icon: 'new_releases' },
    { colorDark: '#26A69A', colorLight: '#4DB6AC', number: 205, title: 'PLATOS', icon: 'assignments' },
    { colorDark: '#66BB6A', colorLight: '#81C784', number: 215, title: 'GRADUADOS', icon: 'account_balance' }
];
}
