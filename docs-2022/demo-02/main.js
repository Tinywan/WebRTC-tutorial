(async function () {
    let devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
})();