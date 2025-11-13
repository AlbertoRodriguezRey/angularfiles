import { Component, ChangeDetectionStrategy, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { FutbolService } from '../../services/futbol.service';
import { DatosEquipo } from '../../models/datosequipo';

@Component({
  selector: 'app-equipos-component',
  imports: [CommonModule],
  templateUrl: './equipos-component.html',
  styleUrls: ['./equipos-component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquiposComponent implements OnInit {
  private futbolService = inject(FutbolService);
  private route = inject(ActivatedRoute);

  datosEquipo = signal<DatosEquipo | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  // descripción truncada (250 caracteres)
  descriptionShort = computed(() => {
    const equipo = this.datosEquipo()?.equipo;
    const desc = equipo?.descripcion ?? '';
    return desc.length > 250 ? desc.slice(0, 250) + '...' : desc;
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idEquipo = params['id'];
      console.log('ID del equipo:', idEquipo);

      if (!idEquipo) {
        this.error.set('No se especificó un equipo');
        return;
      }

      this.isLoading.set(true);
      this.error.set(null);

      this.futbolService.getDatosEquipo(Number(idEquipo))
        .pipe(delay(2900))
        .subscribe({
          next: (datos) => {
            console.log('Datos recibidos:', datos);
            this.datosEquipo.set(datos);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error('Error:', err);
            this.error.set('Error al cargar el equipo: ' + (err?.message ?? ''));
            this.isLoading.set(false);
          }
        });
    });
  }
}

//comentario de prueba
