import { Routes } from '@angular/router';
import { Details } from './details/details';
import { NameForm } from './name-form/name-form';

export const routes: Routes = [
    { path: '', component: NameForm },
    { path: 'details', component: Details }

];
