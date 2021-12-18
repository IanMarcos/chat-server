class Message {
    constructor( uid, name, msg ) {
        this.uid = uid;
        this.name = name;
        this.message = msg;
    }
}

class Room {
    constructor(user1, user2) {
        this.id = user1 + '|' + user2;
        // this.uid1 = user1;
        // this.uid2 = user2;
        this.messages = []
    }

    get users(){
        return[this.uid1, this.uid2]
    }

    sendMessage(uid, name, msg) {
        this.messages.unshift( new Message(uid, name, msg) );
    }
}

class Chat {
    constructor() {
        this.rooms = [];
        this.users = {}
    }

    get usersArr(){
        return Object.values(this.users);
    }

    get allMessages(){
        return this.messages;
    }

    joinRoom(user1, user2) {
        const roomIndex = this.findRoom(user1, user2);
        if(roomIndex !== -1) return roomIndex;

        this.rooms.push(new Room(user1, user2));
        return this.rooms.length - 1;
    }

    findRoom(user1, user2) {
        let roomIndex = -1;
        this.rooms.some((room, i) => {
            if(room.id.includes(user1) && room.id.includes(user2)){
                roomIndex = i;
                return true;
            }
        });
        return roomIndex;
    }

    connectUser( user ) {
        this.users[user._id] = user;
    }

    disconnectUser( uid ) {
        delete this.users[uid];
    }
}

module.exports = Chat;
