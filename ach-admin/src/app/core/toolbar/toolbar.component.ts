import { Component, OnInit, Input } from '@angular/core';
import { ToolbarHelpers } from './toolbar.helpers';
import { AlumnoService } from '../../pages/alumno/service/alumno.service';

@Component({
	selector: 'cdk-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

	@Input() sidenav;
	@Input() sidebar;
	@Input() drawer;
	@Input() matDrawerShow;

	searchOpen: boolean = false;
	toolbarHelpers = ToolbarHelpers;

	constructor() { }

	// Instanciamos los Valores del perfil del Usuario
	ngOnInit() {
		// Invocamos el Servicio de las variables de Token
		let identity = JSON.parse(localStorage.getItem('identity'));

		this.toolbarHelpers.currentUser = {
			photoURL: 'assets/images/avatars/chef-antonio-600.png',
			currentUserName: identity.nombre + ' ' + identity.apellido
		};

	}

}
