import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { LayoutDirective } from '@angular/flex-layout';
import { AlertPromise } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
	selector: 'cdk-user-menu',
	templateUrl: './user-menu.component.html',
	styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;

	//currentUser = null;
	Nahum;


	@Input() currentUser = null;
	@HostListener('document:click', ['$event', '$event.target'])
	onClick(event: MouseEvent, targetElement: HTMLElement) {
		if (!targetElement) {
			return;
		}

		const clickedInside = this.elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.isOpen = false;
		}
	}


	constructor(private router: Router,
		private elementRef: ElementRef) { }


	ngOnInit() {
	}

	logoutUser() {
		var bar = confirm('Estas seguro de Cerrar session ?');

		if( bar == true ){
			alert('Fuera se redirige a Login');
			this.router.navigate(['/login']);
		}
	}

}
