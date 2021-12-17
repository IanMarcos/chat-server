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

    //Manejo de mensajes
    client.on('send-message', ({uid, msg}) => {
        chat.sendMessage(user._id, user.name, msg);
        client.to(uid).emit('priv-message', {msgs: chat.allMessages});
        client.emit('priv-message', {msgs: chat.allMessages});
    })

    client.on('disconnect', () => {
        chat.disconnectUser(user._id);
        ioServer.emit('active-users', chat.usersArr); 
    })
}

module.exports = {
    socketController
};
