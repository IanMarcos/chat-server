class Message {
    constructor( uid, name, msg ) {
        this.uid = uid;
        this.name = name;
        this.message = msg;
    }
}

class Chat {
    constructor() {
        this.messages = [];
        this.users = {}
    }

    get usersArr(){
        return Object.values(this.users);
    }

    get allMessages(){
        return this.messages;
    }

    sendMessage(uid, name, msg) {
        this.messages.unshift( new Message(uid, name, msg) );
    }

    connectUser( user ) {
        this.users[user._id] = user;
    }

    disconnectUser( uid ) {
        delete this.users[uid];
    }
}

module.exports = Chat;
