/**.-------------------------------------------------------------------------------------------------------------------
 * |  Github: https://github.com/Tinywan
 * |  Blog: http://www.cnblogs.com/Tinywan
 * |--------------------------------------------------------------------------------------------------------------------
 * |  Author: Tinywan(ShaoBo Wan)
 * |  DateTime: 2018/3/24 22:14
 * |  Mail: Overcome.wan@Gmail.com
 * '------------------------------------------------------------------------------------------------------------------*/
var errorElement = document.querySelector('#errorMsg');
console.log(errorElement);  // 打印：<div id="errorMsg"></div>

var video = document.querySelector('video');
console.log(video);  // <video id="gum-local" autoplay playsinline></video>

// 将变量放在全局范围中以使它们可供浏览器控制台使用。
var constraints = window.constraints = {
    audio:false,
    video:true
};

function handleSuccess(stream){
    var videoTracks = stream.getVideoTracks();
    console.log("有约束的流 : ",constraints);
    console.log("Using video device :"+videoTracks[0].label);
    stream.oninactive = function(){
        console.log("流不活动");
    }

    window.stream = stream; // 使变量可用于浏览器控制台
    video.srcObject = stream;
}

function handleError(error){
    if(error.name === "ConstraintNotSatisfiedError"){
        errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
            constraints.video.width.exact + ' px is not supported by your device.')
    }else if(error.name === "PermissionDeniedError"){
        errorMsg('权限未被授予使用您的相机和麦克风，您需要允许页面访问中的设备为了演示工作的顺序。');
    }
    errorMsg('getUserMedia error:'+error.name,error);
}

function errorMsg(msg, error) {
    errorElement.innerHTML += '<p>' + msg + '</p>';
    if (typeof error !== 'undefined') {
        console.error(error);
    }
}

// Navigator 对象包含有关浏览器的信息。
navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);