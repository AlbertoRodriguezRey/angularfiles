import { Injectable, inject } from "@angular/core";
import { Equipo } from "../models/equipo";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Observable, forkJoin, map } from "rxjs";
import { Jugador } from "../models/jugador";
import { DatosEquipo } from "../models/datosequipo";

@Injectable({
  providedIn: 'root'
})
export class FutbolService {
  private http = inject(HttpClient);

  getJugadoresEquipo(idEquipo: number): Observable<Jugador[]> {
    const request = "api/jugadores/jugadoresequipos/" + idEquipo;
    const apiUrl = environment.urlApuestas + request;
    return this.http.get<Jugador[]>(apiUrl);
  }

  findEquipo(idEquipo: number): Observable<Equipo> {
    const request = "api/equipos/" + idEquipo;
    const apiUrl = environment.urlApuestas + request;
    return this.http.get<Equipo>(apiUrl);
  }

  getEquipos(): Observable<Array<Equipo>> {
    const request = "api/equipos";
    const apiUrl = environment.urlApuestas + request;
    return this.http.get<Array<Equipo>>(apiUrl);
  }

  getDatosEquipo(idEquipo: number): Observable<DatosEquipo> {
  return forkJoin({
    equipo: this.findEquipo(idEquipo),
    jugadores: this.getJugadoresEquipo(idEquipo)
  }).pipe(
    map(({ equipo, jugadores }) => new DatosEquipo(equipo, jugadores))
  );
}
}