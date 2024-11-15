
//! Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');

//! Eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);

formulario.addEventListener('submit', submitCita);

//~ Objeto de Cita
const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
};

//! Classes
class Notificacion {

    constructor({ texto, tipo }) {
        this.texto = texto;
        this.tipo = tipo;

        this.mostrar();
    };

    // Esto es un metodo
    mostrar() {
        //~ Crear la notificacion
        const alerta = document.createElement('DIV');
        alerta.classList.add('text-center', 'w-full', 'p-3', 'text-white', 'my-5', 'alert', 'uppercase', 'font-bold', 'text-sm');

        //~ Eliminar las alertas duplicadas
        const alertaPrevia = document.querySelector('.alert');
        alertaPrevia?.remove();

        //~ Si es de tipo error, agrega una clase
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        //~ Mensaje de error
        alerta.textContent = this.texto;

        //~ Insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario); // El primer elemento es lo que quieres insertar, el segundo donde lo quieres insertar

        //~ Quitar despues de 3 seg.
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    };

};

class AdminCitas {

    constructor() {
        this.citas = [];
    };

    agregar(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
        
    };

};

//* Agrega los datos al arreglo del formulario
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
};

const citas = new AdminCitas();

//* Valida que no haya campos vacios
function submitCita(e) {
    e.preventDefault();
    if (Object.values(citaObj).some(valor => valor.trim() === '')) {
        new Notificacion({
            texto: 'Todos los campos son obligatorios.',
            tipo: 'error',
        });
        return;
    };

    citas.agregar(citaObj);
};




