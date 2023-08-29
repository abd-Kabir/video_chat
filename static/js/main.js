console.log('In main.js!')

// let labelUsername = document.querySelector('#label-username');
let usernameInput = document.querySelector('#username');
let btnJoin = document.querySelector('#btn-join');

let username;

let webSocket;

function webSocketonMessage(event) {
    let parsedData = JSON.parse(event.data);
    let message = parsedData['message'];
    console.log('message: ', message)
}

btnJoin.addEventListener('click', () => {
    username = usernameInput.value

    console.log("username: ", username)

    if (username === '') {
        return;
    }
    usernameInput.value = '';
    usernameInput.disabled = true;
    usernameInput.style.visibility = 'hidden';

    btnJoin.disabled = true;
    btnJoin.style.visibility = 'hidden';

    let labelUsername = document.querySelector('#label-username');
    labelUsername.innerHTML = username;

    let loc = window.location;
    let wsStart = 'ws://';
    if (loc.protocol === 'https:') {
        wsStart = 'wss://';
    }

    let endPoint = wsStart + loc.host + loc.pathname;
    console.log('endPoint: ', endPoint);

    webSocket = new WebSocket(endPoint)

    webSocket.addEventListener('open', (e) => {
        console.log('Connection Opened!')

        let jsonStr = JSON.stringify({
            'message': 'This is a message',
        })

        webSocket.send(jsonStr)
    });

    webSocket.addEventListener('message', webSocketonMessage);

    webSocket.addEventListener('close', (e) => {
        console.log('Connection Closed!', e)
    });

    webSocket.addEventListener('error', (e) => {
        console.log('Error Occurred!')
    });

})

let localStream = new MediaStream();

const constraints = {
    'video': true,
    'audio': true
};

const localVideo = document.querySelector('#local-video');

let userMedia = navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        localStream = stream;
        localVideo.srcObject = localStream;
        localVideo.muted = true;
    })
    .catch(error => {
        console.log("Error accessing media devices.", error);
    })