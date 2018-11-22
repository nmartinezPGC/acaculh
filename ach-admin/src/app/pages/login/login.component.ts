import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './services/login.service';

import { NgForm }    from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  //Parametros Generales
  //Objeto Json del Usuario
  public user;
  public errorMessage;
  public identity;
  public token;

  // Variables para Perfiles
  public idTipoUsuario;

  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };


  /****************************************************
  * Funcion: FND-00001
  * Fecha: 19-11-2018
  * Descripcion: Metodo constructor().
  * Objetivo: Metodo constructor de la Clase
  *****************************************************/
  constructor(private router: Router,
    private fb: FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute) {
    //Codigo del Constructor
  }


  /****************************************************
  * Funcion: FND-00001
  * Fecha: 19-11-2018
  * Descripcion: Metodo ngOnInit().
  * Objetivo: Metodo inicial de la Clase
  *****************************************************/
  ngOnInit() {
    this.buildForm();

    //Variables de paso para el logout
    this._route.params.subscribe(params => {
      let logout = + params["id"];

      // Realizamos el Logout de la Aplicacion
      if (logout == 1) {
        // Quitamos las variables del Storage
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        // Seteamos las variables a null
        this.identity = null;
        this.token = null;
        this.idTipoUsuario = null;

        // Se ejecuta la Funcion de Inicio del Componente de
        // AppComponent, para actualizar el Menu
        // this._appComponent.ngOnInit();
        this._router.navigateByUrl('/login');
        // Redireccionamos a la Pagina Oficial
        //window.location.href= "/index";
      }
    });

    //Parametros del Login
    this.user = {
      "email": "",
      "password": "",
      "gethash": "false"
    }

    //Local Storage de la API
    const identity = this._loginService.getIdentity();
    const token = this._loginService.getToken();

    // this.idTipoUsuario = identity.idTipoUser;
    // alert( this.idTipoUsuario );

    // Evaluamos que no tengamos variables de LocalStorage, asi si existe una
    // se redirige a la Index
    if (identity != null && identity.sub) {
      this._router.navigate(["/login"]);
    }
  }


  /****************************************************
  * Funcion: FND-00001
  * Fecha: 19-11-2018
  * Descripcion: Metodo buildForm().
  * Objetivo: Metodo constructor del Formulario de la Clase
  *****************************************************/
  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    // if (!this.userForm) {
    //   return;
    // }
    // const form = this.userForm;
    // for (const field in this.formErrors) {
    //   if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
    //     this.formErrors[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages[field];
    //       for (const key in control.errors) {
    //         if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
    //           this.formErrors[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
  }


  /****************************************************
  * Funcion: FND-00001
  * Fecha: 19-11-2018
  * Descripcion: Metodo login().
  * Objetivo: Metodo login de la Clase
  *****************************************************/
  login() {
    // this.router.navigate(['/']);

    // Cargamos el loader
    // this.loading = 'show';

    //Llamar al metodo, de Login para Obtener la Identidad
    this._loginService.signUp(this.user).subscribe(
        response => {
          // login successful so redirect to return url
          if(response.status == "error"){
            //Mensaje de alerta del error en cuestion            
            alert('Error en el Servidor ' + response.data);
            // this.loading = 'hide';
          }else if (response.status == "success" ){
            //LocalStorage
            let identity = response.data;
            this.identity = identity;
            
            if(this.identity.length <= 1 ){
                alert('Error en el Servidor');
            }else{
              if(!identity.status){
                localStorage.setItem('identity', JSON.stringify(identity));                
                //Volvemos a llamar el Servicio Ajax, para obtener el Token
                this.user.gethash = "true";
                this._loginService.signUp(this.user).subscribe(
                    response => {
                        let token = response.data;
                        this.token = token;

                        if(this.token.length <= 0){
                            alert("Error en el servidor");                            
                        }else{
                          if(!this.token.status){
                            localStorage.setItem( 'token', token );                            
                            //Se ejecuta la Funcion de Inicio del Componente de
                            // AppComponent, para actualizar el Menu
                            // this._appComponent.ngOnInit();
                            //Redirecciona a la Pagina Oficial
                            // this.loading = 'hide';
                            this._router.navigateByUrl('/');
                          }
                        }
                    },
                    error => {
                        //Regisra cualquier Error de la Llamada a la API
                        this.errorMessage = <any>error;                        
                        //Evaluar el error
                        if(this.errorMessage != null){
                          console.log(this.errorMessage);
                          alert(response);
                          alert("Error en la Petición !! " + this.errorMessage);
                        }
                    }
              );
            } // identity status
          } //identity <= 0
        } // status = success

        },
        error => {
            //Regisra cualquier Error de la Llamada a la API
            this.errorMessage = <any>error;            
            //Evaluar el error
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la Petición !! " + this.errorMessage);
            }
        }
    );
  }
}// FIN | Clase Componente: LoginComponent

