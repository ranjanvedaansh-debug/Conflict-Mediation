const audio = document.getElementById("audio");
const playButton = document.getElementById("play-button");
const backwardButton = document.getElementById("backward");
const forwardButton = document.getElementById("forward");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

playButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
});

backwardButton.addEventListener("click", function() {
    audio.currentTime = Math.max(0, audio.currentTime - 5);
});

forwardButton.addEventListener("click", function() {
    if (Number.isFinite(audio.duration)) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    }
});

audio.addEventListener("loadedmetadata", function() {
    progressBar.max = audio.duration;
    durationDisplay.textContent = formatTime(audio.duration);
});

audio.addEventListener("durationchange", function() {
    if (Number.isFinite(audio.duration)) {
        progressBar.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
    }
});

audio.addEventListener("timeupdate", function() {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

progressBar.addEventListener("input", function() {
    audio.currentTime = progressBar.value;
});

audio.addEventListener("ended", function() {
    playButton.textContent = "▶";
    progressBar.value = 0;
    currentTimeDisplay.textContent = "0:00";
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}