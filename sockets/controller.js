
const socketController = client => {
    console.log(`socket ${client.id} conectado`);
    client.on('disconnect', () => console.log(`${client.id} desconectado`))
}

module.exports = {
    socketController
};
