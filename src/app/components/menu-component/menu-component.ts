import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { FutbolService } from '../../services/futbol.service';
import { Equipo } from '../../models/equipo';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  @ViewChild('equipoSelect') equipoSelect?: ElementRef<HTMLSelectElement>;
  private futbolService = inject(FutbolService);
  private router = inject(Router);
  
  equipos = signal<Equipo[]>([]);
  selectedEquipo = signal<number | null>(null);

  ngOnInit(): void {
    this.futbolService.getEquipos().subscribe(equipos => {
      this.equipos.set(equipos);
    });
  }

  onEquipoChange(): void {
    const value = this.equipoSelect?.nativeElement.value;
    if (value) {
      this.selectedEquipo.set(Number(value));
      this.router.navigate(['/equipos', value]);
    }
  }
}