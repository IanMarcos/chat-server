const User = require('../models/user');
const Chat = require('../models/chat');
const { verifyJWT } = require('../helpers/jwt');

const chat = new Chat();

const socketController = async(client, ioServer) => {
    let user;
    try {
        const {uid} = await verifyJWT(client.handshake.headers.cvtoken);
        user = await User.findById(uid).select('-password -__v');
        if(!user || !user.active){
            return client.disconnect();
        }
    } catch (error) {
        return client.disconnect();
    } 
    
    //Conectar al usuario
    chat.connectUser(user);
    
    //Emitir todos los usuarios activos
    ioServer.emit('active-users', chat.usersArr);
    
    //Unir a una sala privada con el propio ID
    client.join(user._id.toString());

    client.on('join-room', ({user1, user2}, callback) => {
        const roomIndex = chat.joinRoom(user1, user2);
        callback(roomIndex);
    })

    client.on('get-room-messages', ({roomIndex}, callback) => {
        callback(chat.rooms[roomIndex].allMessages);
    })

    //Manejo de mensajes
    client.on('send-message', ({uid, msg, room}) => {
        chat.rooms[room].sendMessage(user._id, user.name, msg);
        client.to(uid).emit('priv-message', {msgs: chat.rooms[room].allMessages});
        client.emit('priv-message', {msgs: chat.rooms[room].allMessages});
    });

    client.on('disconnect', () => {
        chat.disconnectUser(user._id);
        ioServer.emit('active-users', chat.usersArr); 
    });
}

module.exports = {
    socketController
};
