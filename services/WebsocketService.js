import { Platform } from 'react-native';
import openSocket from 'socket.io-client';
import uid from 'uuid/v4';
import { User } from "../model/user";

const socket = openSocket('http://eeriel.fr:4000/');
//const socket = openSocket('http://localhost:4000/');

//const socket = openSocket('https://server-app-tablet.herokuapp.com/');


const user = new User();
user.uuid = uid();

const navigation = {};

//getSocket().on('navigate',(url)=>navigation.navigate(url));

function seconnecte(cb, toSend) {
    socket.on('login', message => cb(message));
    socket.emit('login', toSend);
}

function setNavigation(_navigation) {
    //console.log(_navigation);
    ///const {navigation} = _navigation;
    //console.log({navigation});
    ////navigation.navigate = navigation;
}

function send(chanel, _data){
    let message = {
        uuid: user.uuid,
        type: 'tablet',
        data: _data
    };
    socket.emit(chanel, message);
}

function getSocket() {
    return socket;
}

function getUser() {
    return user;
}

<<<<<<< HEAD
function reset(){
    console.log('reset');
=======
function reset() {
>>>>>>> df2f0b5376a2ca0f61c1f22672d9df260a32c0f9
    socket.emit('reset', 'reset');
}

function getImage(cb) {
    socket.on('img', message => cb(message));
}

function listen() {

}

function waitingScreen(callback) {
    socket.on("waitingScreen", response => callback(response));
}

function getSimpleQuestion(callback) {
    socket.on("ask-simple-question", response => callback(response));
}

function getSimpleQuestionResponse(callback) {
    socket.on("response-simple-question", response => callback(response));
}


function sedeconnecte(toSend) {
    socket.emit('disconnect', toSend);
}

export { getUser, sedeconnecte, getImage, getSocket, reset, send, setNavigation, getSimpleQuestion, getSimpleQuestionResponse, waitingScreen };