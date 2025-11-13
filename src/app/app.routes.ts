import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { FileComponent } from './components/file-component/file-component';
import { EquiposComponent } from './components/equipos-component/equipos-component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'files', component: FileComponent},
    {path: 'equipos/:id', component: EquiposComponent},
];
