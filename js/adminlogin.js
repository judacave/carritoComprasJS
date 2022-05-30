function goto() {
    var c = "123";
    var u = "admin";

    if(document.form.password.value == c && document.form.login.value == u){
        alert ("Bienvenido al Sistema Administrador");
        window.location = "pedidos.html";
    }else {
        alert ("Nombre de Usuario o Contraseña Incorrectos");
    }
}