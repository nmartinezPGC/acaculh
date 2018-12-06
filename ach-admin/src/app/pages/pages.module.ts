import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
} from '@angular/material';

import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRouterModule } from './pages.routes';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CoreModule } from '../core/core.module';
import { AlumnoComponent } from './alumno/alumno.component';
import { ServicesComponent } from "../pages/services/services.component";

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
        CoreModule,
        PagesRouterModule],
    declarations: [
        ContactComponent,
        AboutComponent,        
        AlumnoComponent,
        ServicesComponent,
    ],
    exports: [
    ],
    providers: [
    ]
})
export class PagesModule {
}
