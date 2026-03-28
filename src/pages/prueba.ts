import promptSync from "prompt-sync";

const prompt = promptSync();

let respGrupo: string = "S";
let sumaGeneral: number = 0;
let contGrupo: number = 0;

while (respGrupo.toUpperCase() === "S") {

    let sumaGrupo: number = 0;
    let contAlumno: number = 0;
    let respAlumno: string = "S";

    while (respAlumno.toUpperCase() === "S") {

        let sumaAlumno: number = 0;
        let contMateria: number = 0;
        let respMateria: string = "S";

        while (respMateria.toUpperCase() === "S") {

            console.log("Ingrese las tres calificaciones de la materia:");

            const cal1: number = parseFloat(prompt("Calificación 1: "));
            const cal2: number = parseFloat(prompt("Calificación 2: "));
            const cal3: number = parseFloat(prompt("Calificación 3: "));

            const promMateria: number = (cal1 + cal2 + cal3) / 3;

            sumaAlumno += promMateria;
            contMateria++;

            respMateria = prompt("¿Deseas agregar otra materia? (S/N): ");
        }

        const promAlumno: number = sumaAlumno / contMateria;
        console.log("Promedio del alumno:", promAlumno.toFixed(2));

        sumaGrupo += promAlumno;
        contAlumno++;

        respAlumno = prompt("¿Deseas agregar otro alumno? (S/N): ");
    }

    const promGrupo: number = sumaGrupo / contAlumno;
    console.log("Promedio del grupo:", promGrupo.toFixed(2));

    sumaGeneral += promGrupo;
    contGrupo++;

    respGrupo = prompt("¿Deseas agregar otro grupo? (S/N): ");
}

console.log("Promedio general de los grupos:", (sumaGeneral / contGrupo).toFixed(2));