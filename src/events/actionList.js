const name = 'actionList';

exports.listener = (socket, server, data) => {
    socket.emit(name, server.actions.list())
}
exports.name = name;