//Declaración de variables
var facturaAgua = 350, facturaLuz = 210, facturaInternet = 570, facturaTelefono = 425, 
cuentaAmiga1 = 1234567, cuentaAmiga2 = 7654321, saldoCuenta, limiteExtraccion = 5000, limiteTransferencia = 20000, 
contrasenia;  

//Usuario Batman
var nombreUsuario_1 = "Batman", saldoCuenta_1 = 70000, codigoDeSeguridad_1 = 2244;

//Usuario Sylvester
var nombreUsuario_2 = "Sylvester", saldoCuenta_2 = 8000, codigoDeSeguridad_2 = 4422;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML
iniciarSesion();

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
	if(contrasenia == 2244 || contrasenia == 4422) {
		limiteExtraccion = prompt("Ingrese el limite de extracción que desea establecer.");
		if((limiteExtraccion == null) || (limiteExtraccion == "")) {
			alert("No se ha ingresado ningun valor.");
		} else if(isNaN(limiteExtraccion)) {
			alert("Operacion incorrecta. Utilice valores numericos.");
		} else {
			limiteExtraccion;
			if(contrasenia == 2244) {
				localStorage.setItem("limiteExtraccion_1", limiteExtraccion);
			} else {
				localStorage.setItem("limiteExtraccion_2", limiteExtraccion);
			}
			actualizarLimiteEnPantallaDeExtraccion();
			alert("Su limite de extracción es de: $" + limiteExtraccion + ".");
		}
	} else {
		alert("No es posible realizar esta operación ya que no ha ingresado al sistema.");
	}	
}

function cambiarLimiteDeTransferencia() {
	if(contrasenia == 2244 || contrasenia == 4422) {
		limiteTransferencia = prompt("Ingrese el limite de transferencia que desea establecer.");
		if((limiteTransferencia == null) || (limiteTransferencia == "")) {
			alert("No se ha ingresado ningun valor.");
		} else if(isNaN(limiteTransferencia)) {
			alert("Operacion incorrecta. Utilice valores numericos.");
		} else {
			limiteTransferencia;
			if(contrasenia == 2244) {
				localStorage.setItem("limiteTransferencia_1", limiteTransferencia);
			} else {
				localStorage.setItem("limiteTransferencia_2", limiteTransferencia);
			}	
			actualizarLimiteEnPantallaDeTransferencia();
			alert("Su limite de transferencia es de: $" + limiteTransferencia + ".");
		}
	} else {
		alert("No es posible realizar esta operación ya que no ha ingresado al sistema.");
	}	
}

function extraerDinero() {
	extraccion = prompt("Ingrese la cantidad que desea extraer."); 
	if((extraccion == null) || (extraccion == "")) {
		alert("No se ha ingresado ningun valor.");	
	} else if(isNaN(extraccion)) {
		alert("Operacion incorrecta. Utilice valores numericos.");
	} else if(extraccion > saldoCuenta) {
		alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero"); 
	} else if(extraccion > limiteExtraccion) {
		alert("La cantidad de dinero que estas intentando extraer supera tu limite de extracción");	
	} else if(extraccion % 100 != 0)  {
			alert("Solo podes retirar billetes de $100");
	} else {
		extraccion = parseInt(extraccion);
		actualizarSaldo(extraccion);
		actualizarSaldoEnLocalStorage();		
		alert("Retiraste: $" + extraccion + "\n Tu saldo anterior: $" + saldoAnterior + "\n Tu saldo actual: $" + saldoCuenta + ".");
	}
}

function depositarDinero() {
	deposito = prompt("Ingrese la cantidad que desea depositar.");
	if((deposito == null) || (deposito == "")) {
		alert("No se ha ingresado ningun valor.");
	} else if(isNaN(deposito)) {
		alert("Operacion incorrecta. Utilice valores numericos.");
	} else {
		deposito = parseInt(deposito);		
		saldoAnterior = saldoCuenta;
		saldoCuenta += deposito;
		actualizarSaldoEnPantalla();
		actualizarSaldoEnLocalStorage();
		alert("Depositaste: $" + deposito + "\n Tu saldo anterior: $" + saldoAnterior + "\n Tu saldo actual: $" + saldoCuenta + ".");
	}
}	

function pagarServicio() {
	servicio = prompt("Ingresá el numero que corresponda al servicio que vas a pagar \n 1 - Agua \n 2 - Luz \n 3 - Internet \n 4 - Telefono ");
	if((servicio == null) || (servicio == "")) {
		alert("No se ha ingresado ningun valor.");
	} else {	
		servicio = parseInt(servicio);	
		switch(servicio) {
			case 1: 
				pagar(facturaAgua);
				break;
			case 2: 
				pagar(facturaLuz);
				break;
			case 3: 
				pagar(facturaInternet);
				break;
			case 4: 
				pagar(facturaTelefono);
				break;
			default: alert("La opcion a la que intenta acceder no esta disponible.");
		}
	}		
}

function transferirDinero() {
	var montoTransferido = prompt("Ingrese el monto que desea transferir.");
	if((montoTransferido == null) || (montoTransferido == "")) {
		alert("No se ha ingresado ningun valor.");	
	} else if(isNaN(montoTransferido)) {
		alert("Operacion incorrecta. Urilice valores numericos.");
	} else if(montoTransferido > saldoCuenta) {
		alert("No puede transferirse esa cantidad de dinero porque no existe en la cuenta.");
	} else if(montoTransferido > limiteTransferencia) {
		alert("La cantidad de dinero que estas intentando transferir supera tu limite de transferencia");	
	} else {
		var numeroDeCuenta = prompt("ingrese el numero de cuenta al que desea realizar la transferencia.");
		if((numeroDeCuenta == cuentaAmiga1) || (numeroDeCuenta == cuentaAmiga2)) {
			actualizarSaldo(montoTransferido);
			actualizarSaldoEnLocalStorage();
			alert("Se han transferido $" + montoTransferido + " a la cuenta " + numeroDeCuenta + ".");
		} else {
			alert("La cuenta a la cual desea iniciar la transferencia no está registrada.");
		}
	}
}

function iniciarSesion() {
	contrasenia = prompt("Ingrese el codigo de su cuenta.");
	if((contrasenia == null) || (contrasenia == "")) {
		alert("No se ha ingresado ninguna clave.");
		iniciarSesion();	
	} else if(contrasenia == codigoDeSeguridad_1) {
		saldoCuenta = saldoCuenta_1;
		if(localStorage.getItem("limiteExtraccion_1")) {
			limiteExtraccion = parseInt(localStorage.getItem("limiteExtraccion_1"));
		} else {
			limiteExtraccion;
		}
		if(localStorage.getItem("limiteTransferencia_1")) {
			limiteTransferencia = parseInt(localStorage.getItem("limiteTransferencia_1"));
		} else {
			limiteTransferencia;
		}
		if(localStorage.getItem("saldoCuenta_1")) {
			saldoCuenta = parseInt(localStorage.getItem("saldoCuenta_1"));
		} else {
			saldoCuenta;
		}		
		alert("Bienvenido Batman. Ya puedes realizar operaciones.");
		document.getElementById("foto").src = "img/batis.png";
		document.getElementsByClassName("green-container")[0].style.backgroundColor = "#393E46";
		cargarNombreEnPantalla("Batman");
		actualizarSaldoEnPantalla();
		actualizarLimiteEnPantallaDeExtraccion();
		actualizarLimiteEnPantallaDeTransferencia();
	} else if(contrasenia == codigoDeSeguridad_2) {
		saldoCuenta = saldoCuenta_2;
		if(localStorage.getItem("limiteExtraccion_2")) {
			limiteExtraccion = parseInt(localStorage.getItem("limiteExtraccion_2"));
		} else {
			limiteExtraccion;
		}
		if(localStorage.getItem("limiteTransferencia_2")) {
			limiteTransferencia = parseInt(localStorage.getItem("limiteTransferencia_2"));
		} else {
			limiteTransferencia;
		}	
		if(localStorage.getItem("saldoCuenta_2")) {
			saldoCuenta = parseInt(localStorage.getItem("saldoCuenta_2"));
		} else {
			saldoCuenta;
		}			
		alert("Bienvenido Sylvester. Ya puedes realizar operaciones.");
		document.getElementById("foto").src = "img/sylvester.png";
		document.getElementsByClassName("green-container")[0].style.backgroundColor = "#D95858";
		cargarNombreEnPantalla("Sylvester");
		actualizarSaldoEnPantalla();
		actualizarLimiteEnPantallaDeExtraccion();
		actualizarLimiteEnPantallaDeTransferencia();
	} else {
		saldoCuenta = 0;
		actualizarSaldoEnPantalla();
		document.getElementById("limite-extraccion").innerHTML = " ";
		document.getElementById("limite-transferencia").innerHTML = " ";
		alert("La clave es incorrecta. El dinero de la cuenta ha sido retenido por cuestiones de seguridad.");
	}
}

// Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla(usuario) {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + usuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantallaDeExtraccion() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function actualizarLimiteEnPantallaDeTransferencia() {
    document.getElementById("limite-transferencia").innerHTML = "Tu límite de transferencia es: $" + limiteTransferencia;
}

// Otras funciones

function pagar(factura) {	
	var confirmacionDePago = confirm("La tarifa del servicio es de $" + factura + ". ¿Desea pagar?");
	if((confirmacionDePago == true) && (saldoCuenta >= factura)) {
		actualizarSaldo(factura);
		actualizarSaldoEnLocalStorage();
		alert("Pagaste el servicio. \n Tu saldo anterior: $" + saldoAnterior + ". \n Dinero Descontado de tu cuenta: $" + factura + ". \n Tu saldo actual es: $" + saldoCuenta + ".");			
	} else {
		alert("La operacion ha sido cancelada o no hay dinero suficiente en tu cuenta para pagar el servicio.");
	}
}

function actualizarSaldo(cantidadDeDinero) {
	saldoAnterior = saldoCuenta;
	saldoCuenta -= cantidadDeDinero;
	actualizarSaldoEnPantalla();
}

function actualizarSaldoEnLocalStorage() {
	if(contrasenia == 2244) {
		localStorage.setItem("saldoCuenta_1", saldoCuenta);
	} else if (contrasenia == 4422) {
		localStorage.setItem("saldoCuenta_2", saldoCuenta);
	} else {
		alert("No es posible realizar esta operación ya que no ha ingresado al sistema.");
	}	
}