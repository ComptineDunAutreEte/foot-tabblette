import io from 'socket.io-client';
import { channels } from "../model/channels";

const socket = io("http://eeriel.fr:3000");

function initParty(cb) {
    socket.on(channels.init, (game) => cb(game));
}

function login(cb, player) {
    socket.emit(channels.login, player);
    socket.on(channels.login, (isUserAdd) => cb(isUserAdd))
}

function confirmReady(cb, user) {
    socket.emit(channels.ready, user);
    socket.on(channels.ready, (question) => cb(question));
}

function sendPlayerResponse(response) {
    socket.emit(channels.question, response);
}

export { initParty, login, confirmReady, sendPlayerResponse };


/*import openSocket from 'socket.io-client';
const socket = openSocket('https://server-app-tablet.herokuapp.com/');

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
export { seconnecte , sedeconnecte, getImage, getSocket, reset};*/