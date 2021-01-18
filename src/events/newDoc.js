const name = 'newDoc';

exports.listener = (socket, server, data) => {

    server.actions.new({
        type : 'new-document',
        document : data
    });
    
    socket.broadcast.emit('actionList', server.actions.list());

    server.trends.push(data);
}
exports.name = name;