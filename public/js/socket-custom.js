var socket = io();

// Conectar al servidor
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Escuchar informaciòn 
socket.on('disconnect', function() {
    console.log('Perdimos conexiòn con sel servidor');
});

// Enviar informaciòn 
socket.emit('enviarMensaje', {
    usuario: 'jeison',
    mensaje: 'Hola mundo'
}, function(resp) {
    // console.log('Se disparò el callback');
    console.log('Respuesta server: ', resp);
});

// Escuchar informaciìon
socket.on('enviarMensaje', function(mensaje) {
    console.log('Servidor: ', mensaje);
});