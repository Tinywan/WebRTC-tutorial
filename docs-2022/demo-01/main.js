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
            // 读取所有设备
            let devices = await navigator.mediaDevices.enumerateDevices();
            console.log(devices);
            // 筛选输入设备
            let audioInputDeviceInfo = devices.filter(value => value.kind === 'audioinput')
            this.audioInputDevices.length = 0;
            this.audioInputDevices.push(...audioInputDeviceInfo);
            await this.showSelectedDevice();
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