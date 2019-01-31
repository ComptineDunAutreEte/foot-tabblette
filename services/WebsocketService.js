import {Platform} from 'react-native';
import openSocket from 'socket.io-client';
import uid from 'uuid/v4';
//const socket = openSocket('https://server-app-tablet.herokuapp.com/');
/*var socket;
if(Platform.OS === 'ios'){
    socket = openSocket('http://localhost:4000/');
}else{
    socket = openSocket('http://10.0.2.2:4000/');
}*/

const socket = openSocket('http://localhost:4000/');

class User{
    constructor(){
        this.uuid = "";
        this.speudo = "";
    }
}

const user = new User();
user.uuid = uid();

const navigation ={};

//getSocket().on('navigate',(url)=>navigation.navigate(url));

function seconnecte(cb, toSend) {
    socket.on('login', message => cb(message));
    socket.emit('login', toSend);
}

function setNavigation(_navigation){
    //console.log(_navigation);
    ///const {navigation} = _navigation;
    //console.log({navigation});
    ////navigation.navigate = navigation;
}

function send(chanel, message){
    socket.emit(chanel, message);
}

function getSocket(){
    return socket;
}

function getUser(){
    return user;
}

function reset(){
    socket.emit('reset', 'reset');
}

function getImage(cb) {
    socket.on('img', message => cb(message));
}

function listen(){

}


function sedeconnecte(toSend) {
    socket.emit('disconnect', toSend);
}
export { getUser , sedeconnecte, getImage, getSocket, reset, send,setNavigation};