// audio_processor.js

class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
    }

    process(inputs, outputs, parameters) {
        return this.whiteNoise(outputs);
    }

    whiteNoise(outputs) {
        const output = outputs[0];

        output.forEach((channel) => {
            for (let i = 0; i < channel.length; i++) {
                channel[i] = Math.random() * 3 - 1;
            }
        });
        return true;
    }
}

registerProcessor("audio-processor", AudioProcessor);