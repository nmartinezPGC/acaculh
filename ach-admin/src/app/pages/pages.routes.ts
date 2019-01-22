import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';

// Componentes del Modulo de Alumnos
import { AlumnoComponent } from './alumno/alumno.component';
import { ConsultaAlumnosComponent } from './consultas/consulta.alumnos/consulta.alumnos.component';
import { RegistroPagosComponent } from './pagos/registro-pagos/registro-pagos.component';
import { RevertirPagosComponent } from './pagos/revertir-pagos/revertir-pagos.component';
import { RegisterUserComponent } from './security/register-user/register-user.component';
import { EvaluacionAlumnoComponent } from './evaluaciones/evaluacion-alumno/evaluacion-alumno.component';
import { EvaluacionCocinaPracticaComponent } from './evaluaciones/evaluacion-alumno/evaluacion-cocina-practica/evaluacion-cocina-practica.component';
import { EvaluacionCortesPrecisionComponent } from './evaluaciones/evaluacion-alumno/evaluacion-cortes-precision/evaluacion-cortes-precision.component';
import { EvaluacionPlatoComponent } from './evaluaciones/evaluacion-alumno/evaluacion-plato/evaluacion-plato.component';
import { EvaluacionQuesoComponent } from './evaluaciones/evaluacion-alumno/evaluacion-queso/evaluacion-queso.component';

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
  { path: 'pagos/revertir-pago-alumno', component: RevertirPagosComponent, data: { animation: 'pagos' } },

  // Modulo de Evaluaciones
  { path: 'evaluaciones/evaluacion-alumno', component: EvaluacionAlumnoComponent, data: { animation: 'evaluaciones' } },
  { path: 'evaluaciones/evaluacion-alumno/evaluacion-cocina-practica', component: EvaluacionCocinaPracticaComponent, data: { animation: 'evaluaciones' } },
  { path: 'evaluaciones/evaluacion-alumno/evaluacion-cortes-precision', component: EvaluacionCortesPrecisionComponent, data: { animation: 'evaluaciones' } },
  { path: 'evaluaciones/evaluacion-alumno/evaluacion-platos', component: EvaluacionPlatoComponent, data: { animation: 'evaluaciones' } },
  { path: 'evaluaciones/evaluacion-alumno/evaluacion-quesos', component: EvaluacionQuesoComponent, data: { animation: 'evaluaciones' } },

  // Modulo de Security
  { path: 'security/register-user', component: RegisterUserComponent, data: { animation: 'security' } },
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
