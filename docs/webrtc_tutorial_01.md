MediaDevices.getUserMedia()  
========================

## 演示效果  

![demo-01](/docs/images/demo-01.gif)     

[代码地址](/docs/demo-01/index.html)    

## 简介  

MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可，媒体输入会产生一个MediaStream，里面包含了请求的媒体类型的轨道。此流可以包含一个视频轨道（来自硬件或者虚拟视频源，比如相机、视频采集设备和屏幕共享服务等等）、一个音频轨道（同样来自硬件或虚拟音频源，比如麦克风、A/D转换器等等），也可能是其它轨道类型。  

它返回一个 Promise 对象，成功后会resolve回调一个 MediaStream 对象。若用户拒绝了使用权限，或者需要的媒体源不可用，promise会reject回调一个  PermissionDeniedError 或者 NotFoundError 。  

返回的promise对象可能既不会resolve也不会reject，因为用户不是必须选择允许或拒绝。  

通常你可以使用 navigator.mediaDevices 来获取 MediaDevices ，例如：  

```javascript
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  /* 使用这个stream stream */
})
.catch(function(err) {
  /* 处理error */
});
```

##  语法  

```javascript
var promise = navigator.mediaDevices.getUserMedia(constraints)
```

## 参数  

**constraints**，  

作为一个MediaStreamConstraints 对象，指定了请求的媒体类型和相对应的参数。  

`constraints` 参数是一个包含了`video` 和 `audio`两个成员的MediaStreamConstraints 对象，用于说明请求的媒体类型。必须至少一个类型或者两个同时可以被指定。如果浏览器无法找到指定的媒体类型或者无法满足相对应的参数要求，那么返回的Promise对象就会处于rejected［失败］状态，NotFoundError作为rejected［失败］回调的参数。   

以下同时请求不带任何参数的音频和视频：`{ audio: true, video: true }`  

如果为某种媒体类型设置了 true ，得到的结果的流中就需要有此种类型的轨道。如果其中一个由于某种原因无法获得，getUserMedia() 将会产生一个错误。  

当由于隐私保护的原因，无法访问用户的摄像头和麦克风信息时，应用可以使用额外的constraints参数请求它所需要或者想要的摄像头和麦克风能力。下面演示了应用想要使用1280x720的摄像头分辨率：  

```javascript
{
  audio: true,
  video: { width: 1280, height: 720 }
}
```

浏览器会试着满足这个请求参数，但是如果无法准确满足此请求中参数要求或者用户选择覆盖了请求中的参数时，有可能返回其它的分辨率。  

强制要求获取特定的尺寸时，可以使用关键字min, max, 或者 exact(就是 min == max). 以下参数表示要求获取最低为1280x720的分辨率。  

```javascript
{
  audio: true,
  video: {
    width: { min: 1280 },
    height: { min: 720 }
  }
}
```

如果摄像头不支持请求的或者更高的分辨率，返回的Promise会处于rejected状态，NotFoundError作为rejected回调的参数，而且用户将不会得到要求授权的提示。  

造成不同表现的原因是，相对于简单的请求值和ideal关键字而言，关键字min, max, 和 exact有着内在关联的强制性，请看一个更详细的例子：  

```javascript
{
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
}
```

当请求包含一个ideal（应用最理想的）值时，这个值有着更高的权重，意味着浏览器会先尝试找到最接近指定的理想值的设定或者摄像头（如果设备拥有不止一个摄像头）。  

简单的请求值也可以理解为是应用理想的值，因此我们的第一个指定分辨率的请求也可以写成如下：  

```javascript
{
  audio: true,
  video: {
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
}
```

并不是所有的constraints 都是数字。例如, 在移动设备上面，如下的例子表示优先使用前置摄像头（如果有的话）：  

```javascript
{ audio: true, video: { facingMode: "user" } }
```

强制使用后置摄像头，请用：  

```javascript
{ audio: true, video: { facingMode: { exact: "environment" } } }
```

## 返回值  

返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) ， 这个Promise成功后的回调函数带一个 [MediaStream](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream) 对象作为其参数。  

## 异常  

返回一个失败状态的Promise，这个Promise失败后的回调函数带一个DOMException对象作为其参数。 可能的异常有：  

* AbortError［中止错误］  
  尽管用户和操作系统都授予了访问设备硬件的权利，而且未出现可能抛出NotReadableError异常的硬件问题，但仍然有一些问题的出现导致了设备无法被使用。  

* NotAllowedError［拒绝错误］
  用户拒绝了当前的浏览器实例的访问请求；或者用户拒绝了当前会话的访问；或者用户在全局范围内拒绝了所有媒体访问请求。  
  较旧版本的规范使用了SecurityError，但在新版本当中SecurityError被赋予了新的意义。  

* NotFoundError［找不到错误］  
  找不到满足请求参数的媒体类型。  

* NotReadableError［无法读取错误］  
  尽管用户已经授权使用相应的设备，操作系统上某个硬件、浏览器或者网页层面发生的错误导致设备无法被访问。  

* OverConstrainedError［无法满足要求错误］  
  指定的要求无法被设备满足，此异常是一个类型为OverconstrainedError的对象，拥有一个constraint属性，这个属性包含了当前无法被满足的constraint对象，还拥有一个message属性，包含了阅读友好的字符串用来说明情况。  
  因为这个异常甚至可以在用户尚未授权使用当前设备的情况下抛出，所以应当可以当作一个探测设备能力属性的手段［fingerprinting surface］。  

* SecurityError［安全错误］  
  在getUserMedia() 被调用的 Document 上面，使用设备媒体被禁止。这个机制是否开启或者关闭取决于单个用户的偏好设置。  

* TypeError［类型错误］  
  constraints对象未设置［空］，或者都被设置为false。  

## 示例  

####  宽度和高度  

这个例子设置了摄像头分辨率，并把结果的 [MediaStream](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream) 分配给了一个video元素。  

```javascript
// 想要获取一个最接近 1280x720 的相机分辨率
var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
```

## 在旧的浏览器中使用新的API  

这是一个使用 navigator.mediaDevices.getUserMedia()的例子，带一个polyfill以适应旧的浏览器。 要注意的是这个polyfill并不能修正一些约束语法上的遗留差异，这表示约束在某些浏览器上可能不会很好地运行。推荐使用处理了约束的 adapter.js polyfill 来替代。  

```javascript
// 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

// 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
// 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function(constraints) {

    // 首先，如果有getUserMedia的话，就获得它
    var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }

    // 否则，为老的navigator.getUserMedia方法包裹一个Promise
    return new Promise(function(resolve, reject) {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

navigator.mediaDevices.getUserMedia({ audio: true, video: true })
.then(function(stream) {
  var video = document.querySelector('video');
  // 旧的浏览器可能没有srcObject
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    // 防止再新的浏览器里使用它，应为它已经不再支持了
    video.src = window.URL.createObjectURL(stream);
  }
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});
```

## 帧率  

在某些情况下，比如WebRTC上使用受限带宽传输时，低帧率可能更适宜。  

```javascript
var constraints = { video: { frameRate: { ideal: 10, max: 15 } } };
```

## 前置或者后置摄像头  

在移动设备（电话）上  

```javascript
var front = false;
document.getElementById('flip-button').onclick = function() { front = !front; };

var constraints = { video: { facingMode: (front? "user" : "environment") } };
```

## 权限  

在一个可安装的app（如Firefox OS app）中使用 getUserMedia() ，你需要在声明文件中指定以下的权限：  

```javascript
"permissions": {
  "audio-capture": {
    "description": "Required to capture audio using getUserMedia()"
  },
  "video-capture": {
    "description": "Required to capture video using getUserMedia()"
  }
}
```

参见 [permission: audio-capture](https://developer.mozilla.org/en-US/Apps/Developing/App_permissions#audio-capture) 和 [permission: video-capture](https://developer.mozilla.org/en-US/Apps/Developing/App_permissions#video-capture) 来获取更多信息。  

[原文](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)
