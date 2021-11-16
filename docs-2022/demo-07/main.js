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
            // (1) 获取课件视频
            this._documentStream = await navigator.mediaDevices.getDisplayMedia();
            // 预览
            this.$refs.document.srcObject = this._documentStream;

            // (2) 获取摄像头的音频和视频
            this._cameraStream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
            // 预览
            this.$refs.preview.srcObject = this._cameraStream;

            // (3) 合并音轨
            // this._cameraStream.getTracks().forEach(value => this._documentStream.addTrack(value));

            // (4) 通过RTC进行推流
            // this._context2d = this.$refs.canvas.getContext("2d");
            // this._context2d.drawImage(this._cameraStream,0,0,400,300)
        }
    }
};
var vm = Vue.createApp(App).mount('#app');