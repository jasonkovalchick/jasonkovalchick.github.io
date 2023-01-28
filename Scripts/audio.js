
x = -2;
y = 0;
z = 1;

function pipeSound() {
    var sound = new Howl({
        src: ['/metalpipe.mp3'],
        // loop: true
      });
    //   sound.orientation(-1,-1,-0.5);
      sound.pos(x,y,z);
      sound.orientation(-x,-y,-z); 
      sound.volume(0.5);
      sound.play();
  }

  function dolbySound() {
    var dolbySound = new Howl({
      src: ['/condoctortrailer.mp4'],
      format: ['dolby', 'mp4']
    });
    //   sound.orientation(-1,-1,-0.5);

    dolbySound.pos(x,y,z);
    dolbySound.orientation(-x,-y,-z); 
    dolbySound.play();
  }


// Create an AudioContext
const audioContext = new AudioContext();

// Create a PannerNode
const panner = audioContext.createPanner();
panner.panningModel = 'HRTF';

// Set the position of the listener
// audioContext.listener.positionX.setValueAtTime(-5, audioContext.currentTime);
// audioContext.listener.positionY.setValueAtTime(0, audioContext.currentTime);
// audioContext.listener.positionZ.setValueAtTime(0, audioContext.currentTime);

audioContext.listener.forwardX.value = 0;
audioContext.listener.forwardY.value = 0;
audioContext.listener.forwardZ.value = -1;
audioContext.listener.upX.value = 0;
audioContext.listener.upY.value = 1;
audioContext.listener.upZ.value = 0;

// Set the position of the PannerNode
panner.positionX.setValueAtTime(x, audioContext.currentTime);
panner.positionY.setValueAtTime(y, audioContext.currentTime);
panner.positionZ.setValueAtTime(z, audioContext.currentTime);

// panner.orientationX.setValueAtTime(-x, audioContext.currentTime);
// panner.orientationY.setValueAtTime(-y, audioContext.currentTime);
// panner.orientationZ.setValueAtTime(-z, audioContext.currentTime);

// Connect the PannerNode to the audio context's destination
panner.connect(audioContext.destination);

// Load and play an audio file using the PannerNode as the source
const audioElementMine = new Audio();
// audioElement.src = '/metalpipe.mp3';
audioElementMine.src = '/condoctortrailer.mp4';
audioElementMine.onload = () => {
  const source = audioContext.createMediaElementSource(audioElementMine);
  source.connect(panner);
  audioElement.play();
};






// The audio context must be initialized after a user interaction
let audioCtx;
let listener;

function init() {
  // A user interaction happened, we can initialize the audio context
  audioCtx = new AudioContext();
  listener = audioCtx.listener;

  // Let's set the position of our listener based on where our boombox is.
  const posX = window.innerWidth / 2;
  const posY = window.innerHeight / 2;
  const posZ = 300;

  if (listener.positionX) {
    // Standard way
    listener.positionX.value = posX;
    listener.positionY.value = posY;
    listener.positionZ.value = posZ - 5;
  } else {
    // Deprecated way; still needed (July 2022)
    listener.setPosition(posX, posY, posZ - 5);
  }

  if (listener.forwardX) {
    // Standard way
    listener.forwardX.value = 0;
    listener.forwardY.value = 0;
    listener.forwardZ.value = -1;
    listener.upX.value = 0;
    listener.upY.value = 1;
    listener.upZ.value = 0;
  } else {
    // Deprecated way; still needed (July 2022)
    listener.setOrientation(0, 0, -1, 0, 1, 0);
  }

  // UI controls
  const moveControls = document
    .querySelector("#move-controls")
    .querySelectorAll("button");

  const boombox = document.querySelector(".boombox-body");

  // Variable storing the current transform (modified by the buttons)
  let transform = {
    xAxis: 0,
    yAxis: 0,
    zAxis: 0.8,
    rotateX: 0,
    rotateY: 0,
  };

  // Set up our bounds, to constrain movements
  const topBound = -posY;
  const bottomBound = posY;
  const rightBound = posX;
  const leftBound = -posX;
  const innerBound = 0.1;
  const outerBound = 1.5;

  // Set up rotation constants for boombox
  const rotationRate = 20; // bigger number slower sound rotation

  const q = Math.PI / rotationRate; //rotation increment in radians

  // Get degrees for css
  const degreesX = (q * 180) / Math.PI;
  const degreesY = (q * 180) / Math.PI;

  // Define the boombox panner
  const panner = new PannerNode(audioCtx, {
    panningModel: "HRTF",
    distanceModel: "linear",
    positionX: posX,
    positionY: posY,
    positionZ: posZ,
    orientationX: 0.0,
    orientationY: 0.0,
    orientationZ: -1.0,
    refDistance: 1,
    maxDistance: 20_000,
    rolloffFactor: 10,
    coneInnerAngle: 40,
    coneOuterAngle: 50,
    coneOuterGain: 0.4,
  });

  // Function for setting the boombox panner values and changing the styling
  function moveBoombox(direction, prevMove) {
    switch (direction) {
      case "left":
        if (transform.xAxis > leftBound) {
          transform.xAxis -= 5;
          panner.positionX.value -= 0.1;
        }
        break;
      case "up":
        if (transform.yAxis > topBound) {
          transform.yAxis -= 5;
          panner.positionY.value -= 0.3;
        }
        break;
      case "right":
        if (transform.xAxis < rightBound) {
          transform.xAxis += 5;
          panner.positionX.value += 0.1;
        }
        break;
      case "down":
        if (transform.yAxis < bottomBound) {
          transform.yAxis += 5;
          panner.positionY.value += 0.3;
        }
        break;
      case "back":
        if (transform.zAxis > innerBound) {
          transform.zAxis -= 0.01;
          panner.positionZ.value -= 20;
        }
        break;
      case "forward":
        if (transform.zAxis < outerBound) {
          transform.zAxis += 0.01;
          panner.positionZ.value += 20;
        }
        break;
      case "rotate-right":
        transform.rotateY += degreesY;

        // 'left' is rotation about y-axis with negative angle increment
        z =
          panner.orientationZ.value * Math.cos(-q) -
          panner.orientationX.value * Math.sin(-q);
        x =
          panner.orientationZ.value * Math.sin(-q) +
          panner.orientationX.value * Math.cos(-q);
        y = panner.orientationY.value;

        panner.orientationX.value = x;
        panner.orientationY.value = y;
        panner.orientationZ.value = z;
        break;
      case "rotate-left":
        transform.rotateY -= degreesY;
        // 'right' is rotation about y-axis with positive angle increment
        z =
          panner.orientationZ.value * Math.cos(q) -
          panner.orientationX.value * Math.sin(q);
        x =
          panner.orientationZ.value * Math.sin(q) +
          panner.orientationX.value * Math.cos(q);
        y = panner.orientationY.value;
        panner.orientationX.value = x;
        panner.orientationY.value = y;
        panner.orientationZ.value = z;
        break;
      case "rotate-up":
        transform.rotateX += degreesX;
        // 'up' is rotation about x-axis with negative angle increment
        z =
          panner.orientationZ.value * Math.cos(-q) -
          panner.orientationY.value * Math.sin(-q);
        y =
          panner.orientationZ.value * Math.sin(-q) +
          panner.orientationY.value * Math.cos(-q);
        x = panner.orientationX.value;
        panner.orientationX.value = x;
        panner.orientationY.value = y;
        panner.orientationZ.value = z;
        break;
      case "rotate-down":
        transform.rotateX -= degreesX;
        // 'down' is rotation about x-axis with positive angle increment
        z =
          panner.orientationZ.value * Math.cos(q) -
          panner.orientationY.value * Math.sin(q);
        y =
          panner.orientationZ.value * Math.sin(q) +
          panner.orientationY.value * Math.cos(q);
        x = panner.orientationX.value;
        panner.orientationX.value = x;
        panner.orientationY.value = y;
        panner.orientationZ.value = z;
        break;
    }

    boombox.style.transform =
      `translateX(${transform.xAxis}px) translateY(${transform.yAxis}px) scale(${transform.zAxis}) ` +
      `rotateY(${transform.rotateY}deg) rotateX(${transform.rotateX}deg)`;

    const move = prevMove || {};
    move.frameId = requestAnimationFrame(() =>
      moveBoombox(direction, move)
    );
    return move;
  }

  moveControls.forEach((el) => {
    let moving;
    el.addEventListener(
      "mousedown",
      () => {
        let direction = el.dataset.control;
        if (moving && moving.frameId) {
          cancelAnimationFrame(moving.frameId);
        }
        moving = moveBoombox(direction);
      },
      false
    );

    addEventListener(
      "mouseup",
      () => {
        if (moving && moving.frameId) {
          cancelAnimationFrame(moving.frameId);
        }
      },
      false
    );
  });

  const track = new MediaElementAudioSourceNode(audioCtx, {
    mediaElement: audioElement,
  });

  // If track ends.
  // An event is fired once the track ends via the audio api.
  // We can listen for this and set the correct params on the html element
  audioElement.addEventListener(
    "ended",
    () => {
      playButton.dataset.playing = "false";
      playButton.setAttribute("aria-checked", "false");
    },
    false
  );

  // Create and control the volume slider
  const gainNode = new GainNode(audioCtx);
  const volumeControl = document.querySelector('[data-action="volume"]');
  volumeControl.addEventListener(
    "input",
    () => {
      gainNode.gain.value = volumeControl.value;
    },
    false
  );

  // Create and control the panning slider
  const stereoPanner = new StereoPannerNode(audioCtx, { pan: 0 });
  const pannerControl = document.querySelector('[data-action="panner"]');
  pannerControl.addEventListener(
    "input",
    () => {
      stereoPanner.pan.value = pannerControl.value;
    },
    false
  );

  track
    .connect(gainNode)
    .connect(stereoPanner)
    .connect(panner)
    .connect(audioCtx.destination);

  // Create and control the power button
  const powerButton = document.querySelector(".control-power");
  powerButton.addEventListener(
    "click",
    () => {
      switch (powerButton.dataset.power) {
        case "on": {
          audioCtx.suspend();
          powerButton.dataset.power = "off";
          break;
        }
        case "off": {
          audioCtx.resume();
          powerButton.dataset.power = "on";
          break;
        }
      }
      powerButton.setAttribute(
        "aria-checked",
        audioCtx.state ? "false" : "true"
      );
    },
    false
  );
}

// The boombox is an audio element with a play button
const audioElement = document.querySelector("audio");
const playButton = document.querySelector(".tape-controls-play");

// Play/pause the audio
playButton.addEventListener(
  "click",
  () => {
    if (!audioCtx) {
      // First user interaction: we initialize the audio context
      init();
    }

    // If context is in suspended state (autoplay policy), we resume it
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    if (playButton.dataset.playing === "false") {
      audioElement.play();
      playButton.dataset.playing = "true";
      // if track is playing pause it
    } else if (playButton.dataset.playing === "true") {
      audioElement.pause();
      playButton.dataset.playing = "false";
    }

    let state = playButton.getAttribute("aria-checked") === "true";
    playButton.setAttribute("aria-checked", state ? "false" : "true");
  },
  false
);
