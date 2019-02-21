import openSocket from 'socket.io-client';
import uid from 'uuid/v4';
import { User } from "../model/user";


//const socket = openSocket('http://eeriel.fr:4000/');
/*const socket = openSocket('http://localhost:4000/', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax : 5000,
    reconnectionAttempts: Infinity
});*/
 // const socket = openSocket('http://10.212.106.107:4000/');

// const socket = openSocket('http://eeriel.fr:4000/');

const socket = openSocket('http://localhost:4000/');
//const socket = openSocket('http://localhost:4000/');


// const socket = openSocket('https://server-app-tablet.herokuapp.com/');
//const socket = openSocket('http://eeriel.fr:4000/');
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
    console.log('send: ', chanel);
    let message = {
        uuid: user.uuid,
        team: user.team,
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

function reset(){
    console.log('reset');
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

function dashboardDataRequest(callback) {
    socket.on("dashboard-datas", (response) => callback(response));
}


function sedeconnecte(toSend) {
    socket.emit('disconnect', toSend);
}

export { getUser, sedeconnecte, getImage, getSocket, reset, send, setNavigation,
    getSimpleQuestion, getSimpleQuestionResponse, waitingScreen, dashboardDataRequest
};