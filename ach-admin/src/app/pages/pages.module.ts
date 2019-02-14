import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Nuevas librerias
import { DataTableModule } from "angular-6-datatable";

import {
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatOptionModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    MatGridListModule,
    MatAutocompleteModule,
} from '@angular/material';

import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouterModule } from './pages.routes';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CoreModule } from '../core/core.module';
import { AlumnoComponent } from './alumno/alumno.component';
import { ServicesComponent } from '../pages/services/services.component';
import { AlumnoService } from './alumno/service/alumno.service';
import { SystemPropertiesService } from '../shared/services/systemProperties.service';
import { InvoiceAlumnoComponent } from './alumno/invoice.alumno/invoice.alumno.component';
import { ConsultaAlumnosComponent } from './consultas/consulta.alumnos/consulta.alumnos.component';
import { RegistroPagosComponent } from './pagos/registro-pagos/registro-pagos.component';
import { RevertirPagosComponent } from './pagos/revertir-pagos/revertir-pagos.component';
import { RevertirPagosAlumnoModalComponent } from './pagos/revertir-pagos/revertir-pagos-alumno-modal.component';
import { RegisterUserComponent } from './security/register-user/register-user.component';
import { EvaluacionAlumnoComponent } from './evaluaciones/evaluacion-alumno/evaluacion-alumno.component';
import { EvaluacionCocinaPracticaComponent } from './evaluaciones/evaluacion-alumno/evaluacion-cocina-practica/evaluacion-cocina-practica.component';
import { EvaluacionCortesPrecisionComponent } from './evaluaciones/evaluacion-alumno/evaluacion-cortes-precision/evaluacion-cortes-precision.component';
import { EvaluacionPlatoComponent } from './evaluaciones/evaluacion-alumno/evaluacion-plato/evaluacion-plato.component';
import { EvaluacionQuesoComponent } from './evaluaciones/evaluacion-alumno/evaluacion-queso/evaluacion-queso.component';

import {NgAutoCompleteModule} from "ng-auto-complete";

import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { RegistroPlatosComponent } from './platos/registro-platos/registro-platos.component';
import { ConsultaPlatosComponent } from './platos/consulta-platos/consulta-platos.component';
import { EvaluacionConsultaComponent } from './evaluaciones/evaluacion-consulta/evaluacion-consulta.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatInputModule,
        MatToolbarModule,
        MatIconModule,
        MatCheckboxModule,
        MatListModule,
        MatChipsModule,
        MatRadioModule,
        MatFormFieldModule,
        MatOptionModule,
        MatStepperModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        CoreModule,
        PagesRouterModule,
        DataTableModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatGridListModule,
        MatAutocompleteModule,
        NgAutoCompleteModule,
        AngularMultiSelectModule,
    ],
    declarations: [
        ContactComponent,
        AboutComponent,
        AlumnoComponent,
        ServicesComponent,
        InvoiceAlumnoComponent,
        ConsultaAlumnosComponent,
        RegistroPagosComponent,
        RevertirPagosComponent,
        RevertirPagosAlumnoModalComponent,
        RegisterUserComponent,
        EvaluacionAlumnoComponent,
        EvaluacionCocinaPracticaComponent,
        EvaluacionCortesPrecisionComponent,
        EvaluacionPlatoComponent,
        EvaluacionQuesoComponent,
        RegistroPlatosComponent,
        ConsultaPlatosComponent,
        EvaluacionConsultaComponent,
    ],
    entryComponents: [
        RevertirPagosAlumnoModalComponent
    ],
    exports: [
    ],
    providers: [
        AlumnoService,
        SystemPropertiesService,
    ]
})
export class PagesModule {
}
