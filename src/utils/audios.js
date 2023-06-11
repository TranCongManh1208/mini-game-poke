
let music = new Audio(require("@/assets/audios/2.mp3"));
function playMusic(file) {
    music.pause();
    music = new Audio(require(file));
    music.play();
}

export default playMusic;