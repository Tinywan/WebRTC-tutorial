const App = {
    data() {
        return {
            currentWebmData: null,
        }
    },
    mounted() {
        this._initDevice();
    },
    methods: {
        async _initDevice (){
            // (1) 获取摄像头的音频和视频
            let cameraConstraints = {
                video:true,
                audio:true
            };
            this._cameraStream = await navigator.mediaDevices.getUserMedia(cameraConstraints);
            this.$refs.videoPreview.srcObject = this._cameraStream;

            // (2) 获取课件视频
            let displayMediaOptions = {
                video: {
                    cursor: "always"
                },
                audio: false
            }
            this._documentStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            // 预览
            this.$refs.documentPreview.srcObject = this._documentStream;

            // this._context2d = this.$refs.documentPreview.getContext("2d");
            // this._context2d.drawImage(this._documentStream,0,0,400,300)

            // (3) 合并音轨
            // this._cameraStream.getTracks().forEach(value => this._documentStream.addTrack(value));

            // (4) 通过RTC进行推流
            // this._context2d = this.$refs.canvas.getContext("2d");
            // this._context2d.drawImage(this._cameraStream,0,0,400,300)
        }
    }
};
var vm = Vue.createApp(App).mount('#app');