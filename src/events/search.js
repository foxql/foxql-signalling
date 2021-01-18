const name = 'search';

exports.listener = (socket, server, query) => {
    
    if(typeof query != 'string') return;

    if(query.length > 50) return;

    server.actions.new({
        type : 'new-search',
        query : query
    });
    
    socket.broadcast.emit('actionList', server.actions.list());

}
exports.name = name;