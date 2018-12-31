import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';

// Componentes del Modulo de Alumnos
import { AlumnoComponent } from './alumno/alumno.component';
import { ConsultaAlumnosComponent } from './consultas/consulta.alumnos/consulta.alumnos.component';
import { RegistroPagosComponent } from './pagos/registro-pagos/registro-pagos.component';

const pagesRoutes: Routes = [
  { path: 'contact', component: ContactComponent, data: { animation: 'contact' } },
  { path: 'about', component: AboutComponent, data: { animation: 'about' } },
  { path: 'services', component: ServicesComponent, data: { animation: 'services' } },
  // Modulo de Alumnos
  { path: 'alumnos/nuevo-alumno', component: AlumnoComponent, data: { animation: 'alumnos' } },
  // Modulo de Consultas
  { path: 'consulta/alumnos', component: ConsultaAlumnosComponent, data: { animation: 'consultas' } },
  // Modulo de Pagos
  { path: 'pagos/registro-pago-alumno', component: RegistroPagosComponent, data: { animation: 'pagos' } },
];

@NgModule({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRouterModule { }
