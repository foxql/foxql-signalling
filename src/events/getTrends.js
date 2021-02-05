const name = 'getTrends';

exports.listener = (socket, server, country) => {
    socket.emit(name, 
        server.trends.list(country)    
    )
}
exports.name = name;