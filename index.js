require('dotenv').config()

const foxql = require('@foxql/foxql-server');

let server = new foxql.server(connection);

server.use('serverOptions', {
    port : process.env.PORT || 3000,
    host : '0.0.0.0'
});

server.open();


async function connection(socket)
{
    console.log(socket.id, 'Bağlandı.');

    /** Your custom socket listeners... */

    
}