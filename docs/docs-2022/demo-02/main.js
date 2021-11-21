(async function () {
    let devices = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
    console.log(devices);
    document.querySelector('video').srcObject = devices;
})();