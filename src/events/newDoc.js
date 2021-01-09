const name = 'newDoc';

exports.listener = (socket, server, data) => {
    const id = socket.id;

    server.trends.push(data);
}
exports.name = name;