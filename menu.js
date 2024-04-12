const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Definimos las opciones del menú
const menuOptions = [
    { label: 'Especialidades', action: showHomeEspecialidades },
    { label: 'Medicos', action: showHomeMedicos },
    { label: 'Obras Sociales', action: showHomeObraSocial },
    { label: 'Facturación', action: showBilling }
    // Puedes añadir más opciones según las funcionalidades de tu aplicación
];
const menuEspecialidades = [
    { label: 'Crear especialidad', action: agregarEspecialidad },
    { label: 'Modificar especialidad', action: continuar/*modificarEspecialidad*/},
    { label: 'Ver especialidades cargadas', action: mostrarEspecialidades},
    { label: 'Eliminar especialidad', action: continuar/*eliminarEspecialidad*/}
];
const menuMedicos = [
    { label: 'Registrar medico', action: ingresarDatosMedico },
    { label: 'Modificar medico', action: continuar/*modificarMedico*/},
    { label: 'Ver medicos registrados', action: mostrarMedicos},
    { label: 'Eliminar medico', action: continuar/*eliminarMedicos*/}
];
const menuObrasSociales = [
    { label: 'Registrar Obra Social', action: registroObraSocial },
    { label: 'Modificar Obra Social', action: continuar/*modificarEspecialidad*/},
    { label: 'Ver Obras Sociales cargadas', action: mostrarObrasSociales},
    { label: 'Eliminar Obra Social', action: continuar/*eliminarEspecialidad*/}
];

// Funciones para mostrar cada parte de la aplicación
function showHomeEspecialidades() {
    console.log('--- Menú de Especialidades ---');
    menuEspecialidades.forEach((option2, index2) => {
        console.log(`${index2}. ${option2.label}`);
    });

    // Capturamos la selección del usuario
    rl.question('Seleccione una opción (0-3): ', (choice2) => {
        choice2 = parseInt(choice2);
        // Validamos la selección y ejecutamos la acción correspondiente
        if (isNaN(choice2) || choice2 < 0 || choice2 > menuEspecialidades.length) {
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            continuar();
        } else {
            const selectedOption2 = menuEspecialidades[choice2];
            selectedOption2.action();
        }
    });

};

function showHomeMedicos() {
    console.log('--- Menú de Medicos ---');
    menuMedicos.forEach((option2, index2) => {
        console.log(`${index2}. ${option2.label}`);
    });

    // Capturamos la selección del usuario
    rl.question('Seleccione una opción (0-3): ', (choice2) => {
        choice2 = parseInt(choice2);
        // Validamos la selección y ejecutamos la acción correspondiente
        if (isNaN(choice2) || choice2 < 0 || choice2 > menuMedicos.length) {
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            continuar();
        } else {
            const selectedOption2 = menuMedicos[choice2];
            selectedOption2.action();
        }
    });

};

function showHomeObraSocial() {
    console.log('--- Menú de Obras Sociales ---');
    menuObrasSociales.forEach((option3, index3) => {
        console.log(`${index3}. ${option3.label}`);
    });

    // Capturamos la selección del usuario
    rl.question('Seleccione una opción (0-3): ', (choice3) => {
        choice3 = parseInt(choice3);
        // Validamos la selección y ejecutamos la acción correspondiente
        if (isNaN(choice3) || choice3 < 0 || choice3 > menuObrasSociales.length) {
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            continuar();
        } else {
            const selectedOption3 = menuObrasSociales[choice3];
            selectedOption3.action();
        }
    });

};

function showBilling() {
    console.log('Mostrando la facturación');
};

// Función para mostrar el menú y procesar la selección del usuario
function showMenu() {
    console.log('--- Menú de la Clínica ---');
    menuOptions.forEach((option, index) => {
        console.log(`${index + 1}. ${option.label}`);
    });

    // Capturamos la selección del usuario
    rl.question('Seleccione una opción (1-4): ', (choice) => {
        choice = parseInt(choice);
        // Validamos la selección y ejecutamos la acción correspondiente
        if (isNaN(choice) || choice < 1 || choice > menuOptions.length) {
            console.log('Opción inválida. Por favor, seleccione una opción válida.');
            continuar();
        } else {
            const selectedOption = menuOptions[choice - 1];
            selectedOption.action();
        }
    });
};

// Mostramos el menú al iniciar la aplicación
showMenu();

let especialidades = [];
let obrasSociales = [];
let tiposdeConsulta = [];
let localidades = [];
let medicos = [];
let pacientes = [];
let consultas = [];
let precios = [];


const especialidad = {
    Id: 0,
    nombre: '',
    descripcion: '',
};

const medico = {
    idEspecialidad: especialidad.Id,
    nom_med: '',
    ape_med: '',
    dni_med: '',
    mat_med: '',
};

const obraSocial = {
    Id: 0,
    nombre: '',
    descuento: 0,
};

const tipoConsulta = {
    Id: 0,
    descripcionTCons: '',
    nombre: '',
};

const localidad = {
    codigo_Postal: 0,
    nombre: '',
};

//Altas
function agregarEspecialidad() {
    rl.question("Ingrese el nombre de la especialidad: ", (nombre) => {
        rl.question("Ingrese la descripción de la especialidad: ", (descripcion) => {
            const nuevaEspecialidad = {
                Id: especialidades.length + 1,
                nombre: nombre,
                descripcion: descripcion
            };
            especialidades.push(nuevaEspecialidad);
            console.log("Especialidad agregada correctamente:", nuevaEspecialidad);
            continuar();
            // Continuar con lo que necesites después de agregar la especialidad
        });
    });
}
function ingresarDatosMedico() {
    rl.question("Ingrese el nombre del médico: ", (nom_med) => {
        rl.question("Ingrese el apellido del médico: ", (ape_med) => {
            rl.question("Ingrese el DNI del médico: ", (dni_med) => {
                rl.question("Ingrese la matrícula del médico: ", (mat_med) => {
                    console.log("Especialidades cargadas:");
                    especialidades.forEach(especialidad => {
                        console.log(`ID: ${especialidad.Id} - Nombre: ${especialidad.nombre}`);
                    });
                    rl.question("Ingrese el ID de la especialidad del médico: ", (idEspecialidad) => {
                        const especialidadExistente = especialidades.find(especialidad => especialidad.Id === parseInt(idEspecialidad));
                        if (especialidadExistente) {
                            const nuevoMedico = {
                                nom_med: nom_med,
                                ape_med: ape_med,
                                dni_med: dni_med,
                                mat_med: mat_med,
                                idEspecialidad: parseInt(idEspecialidad)
                            };
                            medicos.push(nuevoMedico);
                            console.log("Datos del médico registrados:", nuevoMedico);
                            continuar();
                        } else {
                            console.log("El ID de especialidad ingresado no existe. Por favor, ingrese uno válido.");
                            ingresarDatosMedico(); // Solicitar nuevamente los datos del médico
                        }
                    });
                });
            });
        });
    });
}
function registroObraSocial(){
    rl.question("Ingrese el nombre de la obra social: ", (nombre) => {
        rl.question("Ingrese el descuento correspondiente: ", (descuento) => {
            const nuevaObraSocial = {
                Id: obrasSociales.length + 1,
                nombre: nombre,
                descuento: descuento
            };
            obrasSociales.push(nuevaObraSocial);
            console.log("Obra Social agregada correctamente:", nuevaObraSocial);
            continuar();
        });
    });
}
//Consultas
function mostrarEspecialidades(){
    console.log('--- Especialidades cargadas ---');
    especialidades.forEach(especialidad => {
        console.log(`ID: ${especialidad.Id} - Nombre: ${especialidad.nombre}`);
    });
    rl.question('Presione enter para salir:', (choise) => {
        continuar(); 
    });
}
function mostrarMedicos(){
    console.log('--- Medicos Registrados ---');
    medicos.forEach(medico => {
        console.log(`Matricula: ${medico.mat_med} - Apellido: ${medico.ape_med} - Nombre: ${medico.nom_med} - Especialidad: ${medico.idEspecialidad}`);
    });
    rl.question('Presione enter para salir:', (choise) => {
        continuar(); 
    });
}
function mostrarObrasSociales(){

}
// Función para continuar con la siguiente acción después de agregar la especialidad
function continuar() {
    showMenu();
}
