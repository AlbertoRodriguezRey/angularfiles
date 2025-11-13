import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { FutbolService } from '../../services/futbol.service';
import { DatosEquipo } from '../../models/datosequipo';

@Component({
  selector: 'app-equipos-component',
  imports: [CommonModule],
  templateUrl: './equipos-component.html',
  styleUrl: './equipos-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquiposComponent implements OnInit {
  private futbolService = inject(FutbolService);
  private route = inject(ActivatedRoute);

  datosEquipo = signal<DatosEquipo | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idEquipo = params['id'];
      console.log('ID del equipo:', idEquipo);
      
      if (idEquipo) {
        this.isLoading.set(true);
        this.error.set(null);
        this.futbolService.getDatosEquipo(Number(idEquipo)).subscribe({
          next: (datos) => {
            console.log('Datos recibidos:', datos);
            this.datosEquipo.set(datos);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error('Error:', err);
            this.error.set('Error al cargar el equipo: ' + err.message);
            this.isLoading.set(false);
          }
        });
      } else {
        console.warn('No hay ID de equipo');
        this.error.set('No se especificó un equipo');
      }
    });
  }
}