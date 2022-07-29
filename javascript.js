var cuentas = [
    { nombre: "Mali", saldo: 200, password: '123' },
    { nombre: "Gera", saldo: 290, password: '147' },
    { nombre: "Maui", saldo: 67, password: '258' }
];

var Inicio = '<button type="button" class="btn btn-success" onclick="login()">Iniciar sesión</button> <button type="button" class="btn btn-success" onclick="crearCuenta()">Crear cuenta</button> ';
var Operaciones = '<h3>Operaciones disponibles </h3><div class="btn-group-vertical"><button type="button" class="btn btn-primary btn-lg"  onclick="consultarDisponible()">Consultar saldo</button> <button type="button" class="btn btn-primary btn-lg"  onclick="ingresar()">Ingresar monto</button> <button type="button" class="btn btn-primary btn-lg"  onclick="retirar()">Retirar monto</button> <button type="button" class="btn btn-primary btn-lg" onclick="salir()">Salir</button> </div>';
var Respuesta = '<h2 id="texto"></h2><button type="button" class="btn btn-danger"  onclick="operaciones()">Volver</button>';

//Mandamos llamar al Div que se encuentra el Index 
function operaciones() {
    document.getElementById("cajero").innerHTML = Operaciones;
};


function login() { 
    var usuario;
    for (var i = 0; i < cuentas.length; i++) {
            if (i==0) {
                usuario=prompt("USUARIO: "); 
            };
             if (usuario == null) {
            } else if (usuario == cuentas[i].nombre) { //Valido que el nombre se encuentre en el arreglo

    var indiceCuenta = i;
    var contraseña ;
            while (contraseña !== cuentas[indiceCuenta].password) {
                contraseña = prompt('CONTRASEÑA '+ cuentas[indiceCuenta].nombre);
                if (contraseña === null) {
                    indiceCuenta === -1;
                    break;
                } else if (contraseña === cuentas[indiceCuenta].password) {
                    operaciones();
                    // Sacar el valor de indice
                    indice = indiceCuenta;
                } else {
                    alert("Error. Intente nuevamente.");
                };
            };
            break;
        } else if (i === cuentas.length-1) {
            alert("Usuario no existente.");
            i=-1;
        };
    };
};
function crearCuenta() { 
    var user = true;
    while (user !== false) {
        var Nombre = prompt("Nombre de Usuario:");
        if (Nombre !== null) {
            // Verificar si existe la cuenta
            for (var i = 0; i < cuentas.length; i++) {
                if (Nombre === cuentas[i].nombre) {
                    user = true;
                    alert("Usuario existente.");
                    break;
                } else {
                    user = false;
                };
            };
            // Seguir solo si no existe
            if (user === false) {
                var Password = prompt("Ingrese una contraseña:");
                if (Password !== null) {
                    var Saldo=NaN;
                    while (isNaN(Saldo)===true) {
                        Saldo = prompt("Ingrese su saldo inicial:");
                        if (Saldo !== null) {
                            Saldo = Number(Saldo);
                            if (isNaN(Saldo)===true) {
                                alert("El valor ingresado no es numérico");
                            } else if (Saldo === null) {
                                break;
                            } else if (Saldo < 10) {
                                alert("El monto mínimo que puede tener la cuenta es  $10."); 
                                Saldo = NaN;                               
                            } else if (Saldo > 990) {
                                alert(" El monto máximo que puede tener la cuenta es  $990");
                                Saldo = NaN;                              
                            } else {
                                cuentas.push({ nombre: Nombre, saldo: Saldo, password:Password });
                                alert('Se ha guardado tu cuenta. Tu nombre de usuario es "'+Nombre+'". Tu contraseña es "'+Password+'". Tu saldo inicial es de $'+Saldo+'.')
                            };
                        } else {
                            break;
                        };
                    };
                };
            };
        } else {
            break;
        };
    };
};


function consultarDisponible() {
    var textToShow = (cuentas[indice].nombre +" Tu saldo disponible  $ "+cuentas[indice].saldo);
    document.getElementById("cajero").innerHTML = Respuesta
    document.getElementById("texto").innerHTML = textToShow;
};


function ingresar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var strMonto = prompt("Monto a ingresar:");
        var monto = Number(strMonto);
        if (strMonto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Monto no  válido.");
        } else {
            var nuevoSaldo = monto + saldoActual
            if (nuevoSaldo>990) {
                alert(monto + " supera el maximo de operacion");
            } else {
                var text= ("El monto ingresado es de $"+ monto + "</b>. Su nuevo saldo disponible $"+ nuevoSaldo +"</b>.");
                cuentas[indice].saldo =  nuevoSaldo;
                document.getElementById("cajero").innerHTML = Respuesta;
                document.getElementById("texto").innerHTML = text
            };
        };
    };
};


function retirar() {
    var saldoActual = cuentas[indice].saldo;
    while (saldoActual === cuentas[indice].saldo) {
        var Monto = prompt("Monto a ingresar:");
        var monto = Number(Monto);
        if (Monto === null) {
            break;
        } else if ((isNaN(monto)===true)||(monto <= 0)) {
            alert("Por favor, ingrese un monto válido.");
        } else {
            var nuevoSaldo = saldoActual - monto;
            if (nuevoSaldo<10) {
                alert("Su saldo actual es de $"+ saldoActual + " Operación no es permitida.");
            } else {
                var text = ("Su monto ingresado es $"+monto+" . Saldo actual $"+nuevoSaldo);
                cuentas[indice].saldo =  nuevoSaldo;
                document.getElementById("cajero").innerHTML = Respuesta;
                document.getElementById("texto").innerHTML = text;
            };
        };
    };
};


function salir() {
    indice = -1;
    document.getElementById("cajero").innerHTML = Inicio;
};