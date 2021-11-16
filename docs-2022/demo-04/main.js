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
            this._stream = await navigator.mediaDevices.getUserMedia({video:false,audio:true});
            this._recorder = new MediaRecorder(this._stream, {mimeType:"video/webm;codes=h264"});
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