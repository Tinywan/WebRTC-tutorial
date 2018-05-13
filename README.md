<div align="center">
  <img src="/docs/images/webrtc-logo740x140.png"><br><br>
</div>  

> WebRTC is a free, open project that provides browsers and mobile applications with Real-Time Communications (RTC) capabilities via simple APIs. The WebRTC components have been optimized to best serve this purpose.  

---

## 支持的浏览器和平台  

|   [Chrome](http://chrome.google.com/)    | [Firefox](https://www.mozilla.org/en-US/firefox/new/) |      [Opera](http://www.opera.com/)      | [Safari](https://webrtc.org/native-code/ios/) | [Android](https://webrtc.org/native-code/android/) | [iOS](https://webrtc.org/native-code/ios/) |
| :--------------------------------------: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: | :--------------------------------------: |
| ![chrome](/docs/images/chrome-128x128.png) | ![firefox](/docs/images/firefox-128x128.png) | ![Opera](/docs/images/opera-128x128.png) | ![apple](/docs/images/Safari-128x128.png) | ![android](/docs/images/android-128x128.png) | ![apple](/docs/images/apple-128x128.png) |
| Latest ✔ | Latest ✔ | Latest ✔ | 11+ ✔ | Latest ✔ | 11+ ✔ |

**WebRTC** （Web Real-Time Communications） 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。  

它并不是单一的协议，包含了媒体、加密、传输层等在内的多个协议标准以及一套基于 JavaScript 的 API。通过简单易用的 JavaScript API ，在不安装任何插件的情况下，让浏览器拥有了 P2P音视频和数据分享的能力。同时WebRTC 并不是一个孤立的协议，它拥有灵活的信令，可以便捷的对接现有的SIP 和电话网络的系统。   

## WebRTC 内部结构  

![demo-01](/docs/images/WebRTC内部结构.png)   

架构图颜色标识说明：  

* 紫色部分是Web开发者API层  
* 蓝色实线部分是面向浏览器厂商的API层  
* 蓝色虚线部分浏览器厂商可以自定义实现  

WebRTC有三个模块：  
* Voice Engine（音频引擎）  

  * Voice Engine包含iSAC/iLBC Codec（音频编解码器，前者是针对宽带和超宽带，后者是针对窄带）  
  * NetEQ for voice（处理网络抖动和语音包丢失）  
  * Echo Canceler（回声消除器）/ Noise Reduction（噪声抑制）  

* Video Engine（视频引擎）  
  * VP8 Codec（视频图像编解码器）  
  * Video jitter buffer（视频抖动缓冲器，处理视频抖动和视频信息包丢失）  
  * Image enhancements（图像质量增强）  
* Transport   
  * SRTP（安全的实时传输协议，用以音视频流传输）  
  * Multiplexing（多路复用）  
  * P2P，STUN+TURN+ICE（用于NAT网络和防火墙穿越的）  
  * 除此之外，安全传输可能还会用到DTLS（数据报安全传输），用于加密传输和密钥协商   
  * 整个WebRTC通信是基于UDP的  

## WebRTC 的核心组件  

* 音视频引擎：OPUS、VP8 / VP9、H264  

* 传输层协议：底层传输协议为 UDP  

* 媒体协议：SRTP / SRTCP  

* 数据协议：DTLS / SCTP  

* P2P 内网穿透：STUN / TURN / ICE / Trickle ICE  

* 信令与 SDP 协商：HTTP / WebSocket / SIP、 Offer Answer 模型  

## WebRTC 音频和视频引擎  

![demo-01](/docs/images/WebRTC音频和视频引擎.png)  

* 最底层是硬件设备，上面是音频捕获模块和视频捕获模块  

* 中间部分为音视频引擎。音频引擎负责音频采集和传输，具有降噪、回声消除等功能。视频引擎负责网络抖动优化，互联网传输编解码优化  

* 在音视频引擎之上是 一套 C++ API，在 C++ 的 API 之上是提供给浏览器的Javascript API       　　　　
## WebRTC 协议栈  

![WebRTC协议栈](/docs/images/WebRTC协议栈.png)   

* WebRTC 核心的协议都是在右侧基于 UDP 基础上搭建起来的  

* 其中，ICE、STUN、TURN 用于内网穿透, 解决了获取与绑定外网映射地址，以及 keep alive 机制  
* DTLS 用于对传输内容进行加密，可以看做是 UDP 版的 TLS。由于 WebRTC 对安全比较重视，这一层是必须的。所有WebRTC组件都必须加密，并且其JavaScript API只能用于安全源（HTTPS或本地主机）。信令机制并不是由WebRTC标准定义的，所以您必须确保使用安全协议。  

* SRTP 与 SRTCP 是对媒体数据的封装与传输控制协议  

* SCTP 是流控制传输协议，提供类似 TCP 的特性，SCTP 可以基于 UDP 上构建，在 WebRTC 里是在 DTLS 协议之上  

* RTCPeerConnection 用来建立和维护端到端连接，并提供高效的音视频流传输  

* RTCDataChannel 用来支持端到端的任意二进制数据传输  

* WebRTC 协议栈解释  
  * ICE：互动式连接建立（RFC 5245）  
  * STUN：用于NAT的会话遍历实用程序（RFC 5389）  
  * TURN：在NAT周围使用继电器进行遍历（RFC 5766）  
  * SDP：会话描述协议（RFC 4566）  
  * DTLS：数据报传输层安全性（RFC 6347）  
  * SCTP：流控制传输协议（RFC 4960）  
  * SRTP：安全实时传输协议（RFC 3711）  

## :hibiscus:  JavaScript API  

* [getUserMedia()](https://webrtc.github.io/samples/src/content/getusermedia/gum/)：捕捉音频和视频  
* [RTCPeerConnection](https://webrtc.github.io/samples/src/content/peerconnection/pc1/)：在用户之间流式传输音频和视频  
* [RTCDataChannel](https://webrtc.github.io/samples/src/content/datachannel/basic/)：在用户之间传输数据  
* [MediaRecorder](https://webrtc.github.io/samples/src/content/getusermedia/record/)：录制音频和视频  

## :tulip: 接口教程  
- [x] [MediaDevices.getUserMedia() 接口详解](/docs/webrtc_tutorial_01.md)     
- [x] [RTCPeerConnection 接口详解](/docs/webrtc_tutorial_02.md)   

## :bouquet: 实战和DEMO教程  

- [x] 从您的摄像头流式传输视频   :memo: [源码](/docs/demo-01/index.html)  :computer: [在线演示](https://webrtc.tinywan.com/demo-01/index.html)  
- [x] 使用RTCPeerConnection流式传输视频  :memo: [源码](/docs/demo-02/index.html)  :computer: [在线演示](https://webrtc.tinywan.com/demo-02/index.html)  
- [x] 使用RTCDataChannel交换数据 :memo: [源码](/docs/demo-03/index.html)  :computer: [在线演示](https://webrtc.tinywan.com/demo-03/index.html)   
- [x] 获取摄像头信息流  :memo: [源码](/docs/tinywan-demo-01/index.html)  :computer: [在线演示](https://webrtc.tinywan.com/tinywan-demo-01/index.html)   
- [x] 创建一个拍照室应用  :memo: [源码](/docs/tinywan-demo-02/index.html)  :computer: [在线演示](https://webrtc.tinywan.com/tinywan-demo-02/index.html)  
- [x] 修改媒体流，添加CSS样式滤镜  :memo: [源码](/docs/tinywan-demo-03/index.html)  :computer: [在线演示](https://webrtc.tinywan.com/tinywan-demo-03/index.html)  

## :blue_book: 相关参考  

* [WebRTC官网](https://webrtc.org/)  
* [WebRTC中文网](http://webrtc.org.cn/)  
* [一步一步学习 WebRTC](https://codelabs.developers.google.com/codelabs/webrtc-web)  

