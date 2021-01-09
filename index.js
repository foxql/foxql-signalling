const foxql = require('@foxql/foxql-server');
const TrendsMap = require('./src/core/trendsMap.js')

let server = new foxql.server(connection);


server.trends = new TrendsMap();

server.trends.on('newDoc', (doc)=>{
    server.io.sockets.emit('newTrendTopic', doc)
})


server.trends.on('dropDoc', (doc)=>{
    server.io.sockets.emit('dropTrendTopic', doc)
})  


server.use('serverOptions', {
    port : process.env.PORT || 3000,
    host : '0.0.0.0'
});

server.pushEvent(
    require('./src/events/newDoc.js')
);


server.open();


async function connection(socket)
{
    console.log(socket.id, 'Bağlandı.');
}