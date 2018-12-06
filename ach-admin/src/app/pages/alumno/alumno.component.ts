import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  // Variables de inicio
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  selected = 'option2';

  options: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  // Constructor de la clase
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
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

}
