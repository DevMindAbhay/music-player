// Select DOM elements
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave = document.getElementById("wave");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio"); // Create an audio element

// Initialize variables
let track_index = 0; // Index of the current track
let isPlaying = false; // Track play/pause state
let isRandom = false; // Random play state
let updateTimer; // Timer for updating the seek slider and time

// List of music tracks
const music_list = [
  {
    img: "images/apnabanale.jpg",
    name: "Apna Bana Le",
    artist: "Arijit Singh",
    music: "music/Apna Bana Le.mp3",
  },
  {
    img: "images/sochnasake.jpg",
    name: "Soch Na Sake",
    artist: "Arijit Singh, Tulsi Kumar",
    music: "music/Soch Na Sake.mp3",
  },
  {
    img: "images/terebin.jpg",
    name: "Tere Bin",
    artist: "Javed-Mohsin, Yaseer Desai",
    music: "music/Tere Bin.mp3",
  },
  {
    img: "images/vehaaniyaan.jpg",
    name: "Ve Haaniyaan",
    artist: "Danny, Avvy Sra, Sagar",
    music: "music/Ve Haaniyaan.mp3",
  },
  {
    img: "images/shayad.jpg",
    name: "Shayad",
    artist: "Arijit Singh",
    music: "music/Shayad.mp3",
  },
  {
    img: "images/ghungroo.avif",
    name: "Ghungroo",
    artist: "Arijit Singh, Shilpa Rao",
    music: "music/Ghungroo.mp3",
  },
  {
    img: "images/tumhiho.jpg",
    name: "Tum Hi Ho",
    artist: "Arijit Singh",
    music: "music/Tum Hi Ho.mp3",
  },
  {
    img: "images/dil_diyan_gallan.jpg",
    name: "Dil Diyan Gallan",
    artist: "Atif Aslam",
    music: "music/Dil Diyan Gallan.mp3",
  },
  {
    img: "images/humraah.jpg",
    name: "Humraah",
    artist: "Sachet Tandon",
    music: "music/Humraah.mp3",
  },
  {
    img: "images/stay.png",
    name: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    music: "music/stay.mp3",
  },
  {
    img: "images/fallingdown.jpg",
    name: "Falling Down",
    artist: "Wid Cards",
    music: "music/fallingdown.mp3",
  },
  {
    img: "images/faded.png",
    name: "Faded",
    artist: "Alan Walker",
    music: "music/Faded.mp3",
  },
  {
    img: "images/ratherbe.jpg",
    name: "Rather Be",
    artist: "Clean Bandit",
    music: "music/Rather Be.mp3",
  }
];

// Load the track
loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer); // Clear the update timer
  reset(); // Reset the track information

  curr_track.src = music_list[track_index].music; // Set the audio source
  curr_track.load(); // Load the track

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")"; // Update track art
  track_name.textContent = music_list[track_index].name; // Update track name
  track_artist.textContent = music_list[track_index].artist; // Update track artist
  now_playing.textContent =
    "Playing music " + (track_index + 1) + " of " + music_list.length; // Update now playing text

  updateTimer = setInterval(setUpdate, 1000); // Set update timer to update seek slider and time

  curr_track.addEventListener("ended", nextTrack); // Play next track when current track ends
  random_bg_color(); // Change background color
}

function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  let a;

  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate("#");
  let Color2 = populate("#");
  var angle = "to right";

  let gradient =
    "linear-gradient(" + angle + "," + Color1 + ", " + Color2 + ")";
  document.body.style.background = gradient; // Apply gradient as background
}

// Reset track information
function reset() {
  curr_time.textContent = "00:00"; // Reset current time
  total_duration.textContent = "00:00"; // Reset total duration
  seek_slider.value = 0; // Reset seek slider
}

// Toggle random play
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}
function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

// Repeat the current track
function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

// Play/pause the current track
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  curr_track.play(); // Play the track
  isPlaying = true;
  track_art.classList.add("rotate"); // Rotate track art
  wave.classList.add("loader"); // Show loader animation
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'; // Change play button to pause
}
function pauseTrack() {
  curr_track.pause(); // Pause the track
  isPlaying = false;
  track_art.classList.remove("rotate"); // Stop rotating track art
  wave.classList.remove("loader"); // Hide loader animation
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>'; // Change pause button to play
}

// Play the next track
function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

// Play the previous track
function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

// Seek to a specific position in the track
function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

// Set the volume
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// Update the seek slider and time
function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
