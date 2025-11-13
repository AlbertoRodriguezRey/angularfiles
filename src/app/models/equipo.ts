export class Equipo {
    constructor(
        public idEquipo: number,
        public nombre: string,
        public imagen: string,
        public champions: number,
        public website: string,
        public descripcion: string,
        public finalistas: number
    ) {}
}