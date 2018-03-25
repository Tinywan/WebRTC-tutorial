WebRTC  
========================

**WebRTC **(Web Real-Time Communications) 是一项实时通讯技术，它允许网络应用或者站点，在不借助中间媒介的情况下，建立浏览器之间点对点（Peer-to-Peer）的连接，实现视频流和（或）音频流或者其他任意数据的传输。WebRTC包含的这些标准使用户在无需安装任何插件或者第三方的软件的情况下，创建点对点（Peer-to-Peer）的数据分享和电话会议成为可能。  

它并不是单一的协议，包含了媒体、加密、传输层等在内的多个协议标准以及一套基于 JavaScript 的 API。通过简单易用的 JavaScript API ，在不安装任何插件的情况下，让浏览器拥有了 P2P音视频和数据分享的能力。  

同时WebRTC 并不是一个孤立的协议，它拥有灵活的信令，可以便捷的对接现有的SIP 和电话网络的系统。   

## WebRTC内部结构  

![demo-01](/docs/images/WebRTC内部结构.png)   

架构图颜色标识说明：  

* 紫色部分是Web开发者API层  
* 蓝色实线部分是面向浏览器厂商的API层  
* 蓝色虚线部分浏览器厂商可以自定义实现  

## WebRTC 的核心组件  

* 音视频引擎：OPUS、VP8 / VP9、H264  

* 传输层协议：底层传输协议为 UDP  

* 媒体协议：SRTP / SRTCP  

* 数据协议：DTLS / SCTP  

* P2P 内网穿透：STUN / TURN / ICE / Trickle ICE  

* 信令与 SDP 协商：HTTP / WebSocket / SIP、 Offer Answer 模型  

## WebRTC音频和视频引擎  

![demo-01](/docs/images/WebRTC音频和视频引擎.png)  

* 最底层是硬件设备，上面是音频捕获模块和视频捕获模块  

* 中间部分为音视频引擎。音频引擎负责音频采集和传输，具有降噪、回声消除等功能。视频引擎负责网络抖动优化，互联网传输编解码优化  

* 在音视频引擎之上是 一套 C++ API，在 C++ 的 API 之上是提供给浏览器的Javascript API       　　　　
## WebRTC 协议栈  

![WebRTC协议栈](/docs/images/WebRTC协议栈.png)   

* WebRTC 核心的协议都是在右侧基于 UDP 基础上搭建起来的  

* 其中，ICE、STUN、TURN 用于内网穿透, 解决了获取与绑定外网映射地址，以及 keep alive 机制  
* DTLS 用于对传输内容进行加密，可以看做是 UDP 版的 TLS。由于 WebRTC 对安全比较重视，这一层是必须的  

* SRTP 与 SRTCP 是对媒体数据的封装与传输控制协议  

* SCTP 是流控制传输协议，提供类似 TCP 的特性，SCTP 可以基于 UDP 上构建，在 WebRTC 里是在 DTLS 协议之上  

* RTCPeerConnection 用来建立和维护端到端连接，并提供高效的音视频流传输  

* RTCDataChannel 用来支持端到端的任意二进制数据传输  

* WebRTC协议栈  
  * ICE：互动式连接建立（RFC 5245）  
  * STUN：用于NAT的会话遍历实用程序（RFC 5389）  
  * TURN：在NAT周围使用继电器进行遍历（RFC 5766）  
  * SDP：会话描述协议（RFC 4566）  
  * DTLS：数据报传输层安全性（RFC 6347）  
  * SCTP：流控制传输协议（RFC 4960）  
  * SRTP：安全实时传输协议（RFC 3711）  

##  实战目录  

#### 1 - [MediaDevices.getUserMedia() 接口详解](/docs/webrtc_tutorial_01.md)   


