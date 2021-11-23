'use strict'

var videoplay = document.querySelector('video#player');
//var audioplay = document.querySelector('audio#audioplayer');

//record
var recvideo = document.querySelector('video#recplayer');
var btnRecord = document.querySelector('button#record');
var btnPlay = document.querySelector('button#recplay');
var btnDownload = document.querySelector('button#download');

var buffer;
var mediaRecorder;

function gotMediaStream(stream){
    window.stream = stream;
    videoplay.srcObject = stream;
}

function handleError(err){
    console.log('getUserMedia error:', err);
}

function start() {

    if(!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia){

        console.log('getUserMedia is not supported!');
        return false;
    }else{

        var constraints = {
            video : {
                width: 640,
                height: 480,
                frameRate:15
            },
            audio : false
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotMediaStream)
            .catch(handleError);
    }
}

start();

// function handleDataAvailable(e){
//     if(e && e.data && e.data.size > 0){
//         buffer.push(e.data);
//     }
// }

function startRecord(){

    buffer = [];

    var options = {
        // mimeType: 'video/webm;codecs=vp8'
        mimeType: 'video/webm;codecs=h264'
    }

    if(!MediaRecorder.isTypeSupported(options.mimeType)){
        console.error(`${options.mimeType} is not supported!`);
        return;
    }

    try{
        mediaRecorder = new MediaRecorder(window.stream, options);
    }catch(e){
        console.error('Failed to create MediaRecorder:', e);
        return;
    }

    // mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.ondataavailable = function (e) {
        if(e && e.data && e.data.size > 0){
            buffer.push(e.data);
        }
    };
    mediaRecorder.start(10);

}

function stopRecord(){
    mediaRecorder.stop();
}

btnRecord.onclick = ()=>{

    if(btnRecord.textContent === 'Start Record'){
        startRecord();
        btnRecord.textContent = 'Stop Record';
        btnPlay.disabled = true;
        btnDownload.disabled = true;
    }else{

        stopRecord();
        btnRecord.textContent = 'Start Record';
        btnPlay.disabled = false;
        btnDownload.disabled = false;

    }
}

btnPlay.onclick = ()=> {
    // Blob（Binary Large Object）是 JavaScript 的大型二进制对象类型，WebRTC 最终就是使用它将录制好的音视频流保存成多媒体文件的。
    // 而它的底层是由上面所讲的 ArrayBuffer 对象的封装类实现的，即 Int8Array、Uint8Array 等类型。
    var blob = new Blob(buffer, {type: 'video/webm'});
    // 其中，array 可以是 ArrayBuffer、ArrayBufferView、Blob、DOMString 等类型 ；option，用于指定存储成的媒体类型。
    recvideo.src = window.URL.createObjectURL(blob);
    recvideo.srcObject = null;
    recvideo.controls = true;
    recvideo.play();
}

btnDownload.onclick = ()=> {
    var blob = new Blob(buffer, {type: 'video/webm'});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');

    a.href = url;
    a.style.display = 'none';
    a.download = 'aaa.webm';
    a.click();
}