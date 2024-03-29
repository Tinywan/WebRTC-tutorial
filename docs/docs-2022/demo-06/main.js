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
            // 录制屏幕
            this._stream = await navigator.mediaDevices.getDisplayMedia();
            this.$refs.preview.srcObject = this._stream;
            this._recorder = new MediaRecorder(this._stream, {mimeType:"video/webm;codes=h264"});
            // 用.bind(this)来绑定运行环境
            this._recorder.ondataavailable = this.recorderDataAvailableHandle.bind(this)
        },
        recorderDataAvailableHandle(e){
            this.currentWebmData = e.data;
        },
        btnRecordClicked(){
            this._recorder.start();
        },
        btnPauseClicked(){
            this._recorder.pause();
        },
        btnResumeClicked(){
            this._recorder.resume();
        },
        btnStopClicked(){
            this._recorder.stop();
        },
        btnPlayerClicked(){
            this.$refs.player.src = URL.createObjectURL(this.currentWebmData);
        }
    }
};
var vm = Vue.createApp(App).mount('#app');