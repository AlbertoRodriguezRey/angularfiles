export class Jugador {
    constructor(
        public idJugador: number,
        public nombre: string,
        public posicion: string,
        public imagen: string,
        public fechaNacimiento: string,
        public pais: string,
        public idEquipo: number
    ) {}
}