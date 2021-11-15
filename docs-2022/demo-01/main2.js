const App = {
    data() {
        return {
            audioInputDevices: [],
            selectedAudioDeviceIndex: 0
        }
    },
    mounted() {
        this._initDevice();
    },
    methods: {
        async _initDevice() {
            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                console.log("不支持 enumerateDevices() .");
                return;
            }
            // 读取所有设备
            await navigator.mediaDevices.enumerateDevices().then(function (devices) {
                console.log(device.kind + ": " + device.label +" id = " + device.deviceId);
                this.audioInputDevices.length = 0;
                this.audioInputDevices.push(...devices.filter(value => value.kind === 'audioinput'));
            }).then(function () {
                console.log(111);
                this.showSelectedDevice();
            }).catch(function (err) {
                console.log(err.name + "错误提示: " + err.message);
                return false;
            })
        },
        async showSelectedDevice(){
            let deviceInfo = this.audioInputDevices[this.selectedAudioDeviceIndex];
            let constraints = {
                video: false,
                audio: deviceInfo
            };
            // this.$refs.名字  获取的是标签对应的dom元素 ,
            this.$refs.audioDevice.srcObject = await navigator.mediaDevices.getUserMedia(constraints);
        }
    },
    watch: {
        selectedAudioDeviceIndex(){
            this.showSelectedDevice()
        }
    }
};
var vm = Vue.createApp(App).mount('#app');