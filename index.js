const foxql = require('@foxql/foxql-server');
const ActionMap = require('./src/core/actionMap.js')

let server = new foxql.server(connection);

server.actions = new ActionMap();


server.use('serverOptions', {
    port : process.env.PORT || 3000,
    host : '0.0.0.0'
});

server.pushEvent(
    require('./src/events/newDoc.js')
);

server.pushEvent(
    require('./src/events/getTrends.js')
);

server.pushEvent(
    require('./src/events/actionList.js')
)

server.pushEvent(
    require('./src/events/search.js')
)


server.open();


async function connection(socket)
{
    console.log(socket.id, 'Bağlandı.');

    /*server.actions.new({
        type : 'new-connection',
        socketId : socket.id
    });*/

    socket.broadcast.emit('actionList', server.actions.list())

    
}