import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'cdk-sidemenu-item',
    templateUrl: './sidemenu-item.component.html',
    styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit {

    @Input() menu;
    @Input() iconOnly: boolean;
    @Input() secondaryMenu = false;

    constructor() { }

    ngOnInit() {
    }

    openLink() {
        this.menu.open = this.menu.open;
    }

    chechForChildMenu() {
        return (this.menu && this.menu.sub) ? true : false;
    }

    /**
     * Funcion para validar los Perfiles del Usuario
     */
    checkUserPerfil() {
        const idPerfilUsuario: number = 2;
        // Invocamos el Servicio de las variables de Token
        let identity = JSON.parse(localStorage.getItem('identity'));
        const perfil = JSON.stringify( this.menu.perfil );
        // console.log(perfil );
        // console.log(identity.idTipoUser);

        if (perfil.includes(identity.idTipoUser) ) {
            return true;
        }

        return false;
    }

}
