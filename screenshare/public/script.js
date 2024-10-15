
const socket = io('/')
const videogrid = document.getElementById('video-grid')
const mypeer = new Peer(undefined,{
    host: '/',
    port: '3001',

})
  

const myVideo = document.createElement('video')
myVideo.muted = true
const peers= {}

navigator.mediaDevices.getUserMedia(
{    video: true,
    audio: true}
).then(stream => {
    addvideo(myVideo, stream)

    mypeer.on('call', call =>{
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVidStream =>{
            addvideo(video, userVidStream)
        })
    })

    socket.on('user-connected', userID =>{
        console.log(userID)
        connectToNewUser(userID, stream)
    }) 
})

socket.on('user-disconnected', userID =>{
    if (peers[userID]) peers[userID].close()
})

mypeer.on('open', id =>{

    socket.emit("joinRoom", Room_ID, id)

})

function connectToNewUser(userID, stream){
    const call = mypeer.call(userID, stream)

    const video = document.createElement('video')
    call.on('stream', userVidStream =>{
        addvideo(video, userVidStream)
    })
    call.on('close', () =>{
        video.remove()
    })

    peers[userID] = call
 }

function addvideo(video, stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata',()=>{
        video.play()
    })
    videogrid.append(video)
}