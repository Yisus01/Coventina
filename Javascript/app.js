document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    

    //Seleccionar los elemtnos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spiner = document.querySelector('#spiner');
    // console.log(inputEmail)
    // console.log(inputAsunto)
    // console.log(inputMensaje)


    // Asignar eventos
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();
        spiner.classList.add('spiner');
        spiner.classList.remove('hidden');
        setTimeout(() => {
            spiner.classList.remove('spiner');
            spiner.classList.add('hidden');

            resetFormulario();
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('mensajeexitoso');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);

    }

    function validar(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido.', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        console.log(email);

        // Comprobar el objecto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);


        // Generar alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('pformulario');
        

        // Inyectar el rror al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.pformulario');
        if(alerta){
            alerta.remove();
        }
        
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacidad');
            btnSubmit.disabled= true;
            return
        }
        btnSubmit.classList.remove('opacidad');
        btnSubmit.disabled= false;
    }

    function resetFormulario(){
        email: '';
        asunto: '';
        mensaje: ''

        // Reiniciar el objecto
        formulario.reset(); 
        comprobarEmail();
    }

   
    

});