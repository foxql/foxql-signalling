const name = 'getTrends';

exports.listener = (socket, server, data) => {
    socket.emit(name, 
        server.trends.list()    
    )
}
exports.name = name;