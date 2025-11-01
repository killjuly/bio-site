let playlist = [];
let currentIndex = 0;
const audio = new Audio();
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const backBtn = document.getElementById('back');
const volume = document.getElementById('volume');
const progress = document.getElementById('progress');
const progressTime = document.getElementById('progressTime');
const volumePercent = document.getElementById('volumePercent');

fetch('/playlist.json')
  .then(res => res.json())
  .then(data => {
    playlist = data;
    loadSong(currentIndex);
  });

function loadSong(index){
  if(!playlist.length) return;
  const song = playlist[index];
  audio.src = song.songurl;
  cover.src = song.coverurl;
  title.textContent = song.title;
  artist.textContent = song.artist;
}

function formatTime(sec){
  const m = Math.floor(sec/60);
  const s = Math.floor(sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

audio.addEventListener('timeupdate', () => {
  const current = formatTime(audio.currentTime);
  const total = audio.duration ? formatTime(audio.duration) : '0:00';
  progressTime.textContent = `${current} / ${total}`;
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    progress.style.setProperty('--progress', `${progress.value}%`);
  }
});

progress.addEventListener('input', e => {
  if(audio.duration) audio.currentTime = (e.target.value/100)*audio.duration;
});

volume.addEventListener('input', e => {
  audio.volume = e.target.value;
  volumePercent.textContent = `${Math.round(e.target.value*100)}%`;
  volume.style.setProperty('--volume', `${e.target.value*100}%`);
});

audio.addEventListener('ended', () => {
  if(!playlist.length) return;
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent = '||';
});

playBtn.addEventListener('click', ()=>{
  if(audio.paused) audio.play(), playBtn.textContent='||';
  else audio.pause(), playBtn.textContent='▶';
});

nextBtn.addEventListener('click', ()=>{
  if(!playlist.length) return;
  currentIndex = (currentIndex+1)%playlist.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent='||';
});

backBtn.addEventListener('click', ()=>{
  if(!playlist.length) return;
  currentIndex = (currentIndex-1+playlist.length)%playlist.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent='||';
});

const overlay = document.getElementById('overlay');
const clickEnter = document.getElementById('clickEnter');
const animationText = document.getElementById('animationText');
const siteContent = document.getElementById('content-wrapper');

clickEnter.addEventListener('click', () => {
  clickEnter.style.display = 'none';
  audio.currentTime = 82.5;
  audio.play();
  playBtn.textContent = '||';
  const words = [
    { text: 'reboot', time: 0 },
    { text: 'as', time: 500 },
    { text: 'soon', time: 900 },
    { text: 'as', time: 1400 },
    { text: 'i', time: 1700 },
    { text: 'am', time: 2000 },
    { text: 'a', time: 2200 },
    { text: 'a', time: 2400 },
    { text: 'a', time: 2600 },
    { text: 'able :3', time: 2850 },
  ];
  animationText.innerHTML = '';
  words.forEach((wordObj) => {
    const spanWord = document.createElement('span');
    spanWord.style.display = 'inline-block';
    spanWord.style.margin = '0 3px';
    animationText.appendChild(spanWord);
    spanWord.textContent = wordObj.text;
    spanWord.style.opacity = 0;
    spanWord.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { spanWord.style.opacity = 1; }, wordObj.time);
    animationText.appendChild(document.createTextNode(' '));
  });
  setTimeout(() => {
    overlay.style.opacity = 0;
    setTimeout(() => overlay.style.display = 'none', 500);
    siteContent.style.display = 'block';
  }, 3600);
});