import { Equipo } from "./equipo";
import { Jugador } from "./jugador";

export class DatosEquipo {
    constructor(
        public equipo: Equipo,
        public jugadores: Array<Jugador>,
    ) { }
}