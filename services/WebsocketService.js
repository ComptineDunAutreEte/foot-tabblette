import {Platform} from 'react-native';
import openSocket from 'socket.io-client';
const socket = openSocket('https://server-app-tablet.herokuapp.com/');
/*var socket;
if(Platform.OS === 'ios'){
    socket = openSocket('http://localhost:4000/');
}else{
    socket = openSocket('http://10.0.2.2:4000/');
}*/

function seconnecte(cb, toSend) {
    socket.on('login', message => cb(message));
    socket.emit('login', toSend);
}

function getSocket(){
    return socket;
}

function reset(){
    socket.emit('reset', 'reset');
}

function getImage(cb) {
    socket.on('img', message => cb(message));
}


function sedeconnecte(toSend) {
    socket.emit('disconnect', toSend);
}
export { seconnecte , sedeconnecte, getImage, getSocket, reset};