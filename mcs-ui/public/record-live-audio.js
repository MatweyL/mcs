window.onload = function () {
    navigator.mediaDevices.getUserMedia({
        audio: true
    })
        .then((stream) => {
            var context = new AudioContext();
            var mediaStreamNode = context.createMediaStreamSource(stream);
            mediaStreamNode.connect(context.destination);
        });
};
