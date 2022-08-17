require('dotenv').config()

const foxql = require('@foxql/foxql-server');

let server = new foxql.server(connection, [
    'https://foxql-bridge.herokuapp.com' // bridge server url
], process.env.NODE_HOST_ADDRESS);

server.use('serverOptions', {
    port : process.env.PORT || 3000,
    host : '0.0.0.0'
});

server.open();

async function connection(socket)
{
    console.log(socket.id, 'Connected.');

    /** Your custom socket listeners... */
}