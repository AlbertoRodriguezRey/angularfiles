import { Routes } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component';
import { FileComponent } from './components/file-component/file-component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'files', component: FileComponent},
];
