const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const tickeControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = tickeControl.siguiente();

        console.log(siguiente);
        callback(siguiente);

    });

    //emitir un evento estadoActual
    client.emit('estadoActual', {
        actual: tickeControl.getUltimoTicket(),
        ultimos4: tickeControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = tickeControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // Actualizar / Notificar cambios en los ultimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: tickeControl.getUltimos4()
        });


    });
});