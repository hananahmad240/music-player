const music_container = document.querySelector('#music-container'),
    title = document.querySelector('#title'),
    progress = document.querySelector('#progress'),
    audio = document.querySelector('#audio'),
    cover = document.querySelector('#cover'),
    prev = document.querySelector("#prev"),
    next = document.querySelector("#next"),
    play = document.querySelector("#play"),
    progress_container = document.querySelector("#progress-container");


const songs = ['hey', 'summer', 'ukulele'];
let songIndex = 1;



function loadSong(nameOfSong) {
    title.innerText = nameOfSong;
    // cover.src = `../images/${nameOfSong}.jpg`
    // console.log(cover.getAttribute("src"));;
    cover.setAttribute("src", `../public/images/${nameOfSong}.jpg`);
    audio.setAttribute("src", `../public/music/${nameOfSong}.mp3`);

};

function pauseSong() {
    music_container.classList.remove("play");
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function playSong() {
    music_container.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}


loadSong(songs[songIndex]);

play.addEventListener('click', (e) => {
    let isPlaying = music_container.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
    e.preventDefault();
})
prev.addEventListener('click', (e) => {

    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();


})

next.addEventListener('click', (e) => {
    e.preventDefault();
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();

})

audio.addEventListener('timeupdate', (e) => {
    // console.log(audio.currentTime);
    // console.log(e.target);
    const {
        duration,
        currentTime
    } = e.target;
    // console.log(duration, currentTime);
    // progress Percentage
    const progressPercentage = (((currentTime / duration) * 100)).toFixed(2);
    // console.log(progressPercentage);
    progress.style.width = `${progressPercentage}%`;

})

audio.addEventListener('ended', (e) => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
})

progress_container.addEventListener('click', (e) => {
    const width = progress_container.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    // console.log(width, clickX, duration);
    audio.currentTime = (clickX / width) * duration;

})