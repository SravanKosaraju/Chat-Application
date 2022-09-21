const socket = io('http://localhost:8000')

const form= document.getElementById('sendcontainer')
const messageinput=document.getElementById('msginp')
const messagecontainer= document.querySelector(".container")
var audio = new Audio('notification.wav')

const append = (message,position)=>{
    const messageelement = document.createElement('div')
    messageelement.innerText=message
    messageelement.classList.add('message')
    messageelement.classList.add(position)
    messagecontainer.append(messageelement)
    if(position=='left'){
    audio.play()}
} 

const name = prompt("Enter your name to join");
// name.classList.add('font')
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
 append(`${name} joined the chat`,'right')
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messageinput.value
    append(`You:${message}`,`right`)
    socket.emit('send',message)
    messageinput.value = ''
})

socket.on('recieve', data =>{
 append(`${data.name}:${data.message}`,'left')
})

socket.on('left', name =>{
 append(`${name} left the chat`,'right')
})