import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../auth/user/user.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: LoginComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }