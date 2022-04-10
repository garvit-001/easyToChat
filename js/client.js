const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const name = prompt("What is your name ? buddy");
socket.emit('new-user-joined', name);

var audio = new Audio('whatsapp.mp3');
var audio2 = new Audio('Whatsapp Message.mp3');
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
    else{
    audio2.play();

    }
}


socket.on('user-joined', name => {
    append(`${name}  joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left')
})

socket.on('left', data => {
    append(`${name} left the chat`, 'right')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})





// const socket = io('http://localhost:8000');

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector('.container')

// var audio = new Audio('whatsapp.mp3');

// const name = prompt("Enter your name to join LetsChat")
// socket.emit('new-user-joined', name)

// const append = (message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position)
//     messageContainer.append(messageElement);
//     messageContainer.scrollTop = messageContainer.scrollHeight;
//     if(position == 'left'){
//         console.log('sound is playing');
//         audio.play();
//     }
// }


// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`, 'right');
//     socket.emit('send', message);
//     messageInput.value = '';
// })


// socket.on('user-joined', name=>{
//     append(`${name} joined the chat`, 'right');
// })

// socket.on('receive', data=>{
//     append(`${data.name }: ${data.message}`, 'left')
// })

// socket.on('left', name=>{
//     append(`${name } left the chat`, 'left');
// })