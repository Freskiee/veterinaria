
//! Selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

//! Objeto de Cita
const citaObj = {
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: '',
};

//! Eventos
pacienteInput.addEventListener('change', (e) => {
    citaObj.paciente = e.target.value;
    console.log(citaObj);
});

propietarioInput.addEventListener('change', (e) => {
    citaObj.propietario = e.target.value;
    console.log(citaObj);
});

