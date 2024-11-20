
import Notificacion from './classes/Notificacion.js';
import AdminCitas from './classes/AdminCitas.js';
import {citaObj, editando} from './variables.js';
import {formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput} from './selectores.js';

const citas = new AdminCitas();

//* Agrega los datos al arreglo del formulario
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
};

//* Valida que no haya campos vacios
export function submitCita(e) {
    e.preventDefault();

    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios.',
            tipo: 'error',
        });
        return;
    };

    if (editando.value) {
        citas.editar({ ...citaObj });
        new Notificacion({
            texto: 'Guardado Correctamente',
            tipo: 'exito',
        });
    } else {
        citas.agregar({ ...citaObj });
        new Notificacion({
            texto: 'Paciente registrado 🥳',
            tipo: 'exito',
        });
    };

    formulario.reset();
    reiniciarObjetoCita();
    formularioInput.value = 'Registar Paciente';
    editando.value = false;
};

//* Reinicia los valores del formulario
export function reiniciarObjetoCita() {
    //~ Reiniciar el Objeto
    // citaObj.id = generarId();
    // citaObj.paciente = '';
    // citaObj.propietario = '';
    // citaObj.email = '';
    // citaObj.fecha = '';
    // citaObj.sintomas = '';

    Object.assign(citaObj, {
        id: generarId(),
        paciente: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: '',
    });
};

//* Genera un ID unico para cada cita
export function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
};

//* Tomar la cita y asignarla al objeto
export function cargarEdicion(cita) {
    Object.assign(citaObj, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;
    editando.value = true;
    formularioInput.value = 'Guardar Cambios';
};
