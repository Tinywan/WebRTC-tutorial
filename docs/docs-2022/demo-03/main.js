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
        async _initDevice (){
            this.$refs.video.srcObject = await navigator.mediaDevices.getUserMedia({
                video:true,
                audio:false
            });
            this._context2d = this.$refs.canvas.getContext("2d");
        },
        btnTakePhotoClicked() {
            // 开始绘制
            this._context2d.drawImage(this.$refs.video,0,0,400,300)
        }
    }
};
var vm = Vue.createApp(App).mount('#app');