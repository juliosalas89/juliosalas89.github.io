let boton = document.getElementById("button");

function campoRequerido(input) {
    if (input.value == "") {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}

function revisarEmail(input) {
    let expresion = /\w+@\w+\.[a-z]/;
    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

function revisarConsulta(input) {
    if (input.value.length < 10) {
        input.className = "form-control is-invalid";
        return false;
    } else {
        input.className = "form-control is-valid";
        return true;
    }
}


function validarBoton(input) {
    input.preventDefault();
    if (campoRequerido(document.getElementById('nombre')) && revisarEmail(document.getElementById('mail')) && revisarConsulta(document.getElementById('consulta'))) {
        enviarMail();
    } else {
        alert("Something went wrong");
    }
}

function enviarMail() {
    let templateParams = {
        from_name: document.getElementById('nombre').value,
        message: `Mensaje: ${document.getElementById('consulta').value} - Email: ${document.getElementById('mail').value}`
    }
    let service_id = 'default_service';
    let template_id = 'template_ggk5sem';
    emailjs.send(service_id, template_id, templateParams).then(
        function (response) {
            document.getElementById("msjEnvio").className = "my-4 alert alert-primary";
            document.getElementById("msjEnvio").innerText = "SUCCESS! Your message was sent.";
            document.getElementById("formConsulta").reset();
        }, function (error) {
            document.getElementById("msjEnvio").className = "my-4 alert alert-danger"
            document.getElementById("msjEnvio").innerText = "Something went wrong, your message was not sent. Try again in a few minutes."
        });
}