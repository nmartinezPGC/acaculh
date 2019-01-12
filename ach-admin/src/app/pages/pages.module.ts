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
import { EvaluacionPracticaComponent } from './evaluaciones/evaluacion-practica/evaluacion-practica.component';

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
        EvaluacionPracticaComponent,
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
