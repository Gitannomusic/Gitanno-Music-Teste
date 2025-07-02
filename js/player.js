// Função para tocar uma música
function playSong(songId) {
  const songCard = document.querySelector(`[data-song="${songId}"]`);
  const audioUrl = songCard.getAttribute("data-url");
  const audioPlayer = document.getElementById("audioPlayer");
  const globalPlayer = document.getElementById("globalPlayer");

  // Atualiza o player
  audioPlayer.src = audioUrl;
  audioPlayer.play();

  // Atualiza texto
  const title = songCard.querySelector("h3").textContent;
  const artist = songCard.querySelector(".artist").textContent;
  document.getElementById("nowPlaying").textContent = `▶ Tocando agora: ${title} - ${artist}`;

  globalPlayer.hidden = false;
}

// Função para copiar link
function copyLink(songId) {
  const url = window.location.href.split("#")[0];
  const link = `${url}#${songId}`;
  navigator.clipboard.writeText(link).then(() => {
    alert("Link copiado!");
  });
}

// Botões do player global
function togglePlay() {
  const audioPlayer = document.getElementById("audioPlayer");
  const btn = document.getElementById("playPauseBtn");

  if (audioPlayer.paused) {
    audioPlayer.play();
    btn.textContent = "⏸";
  } else {
    audioPlayer.pause();
    btn.textContent = "⏯";
  }
}

function skipToStart() {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.currentTime = 0;
}

function skipToEnd() {
  const audioPlayer = document.getElementById("audioPlayer");
  audioPlayer.currentTime = audioPlayer.duration;
}

// Atualiza barra de progresso
const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.addEventListener("timeupdate", () => {
  const progressBar = document.getElementById("progressBar");
  const currentTime = document.getElementById("currentTime");
  const totalTime = document.getElementById("totalTime");

  const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = percent + "%";

  currentTime.textContent = formatTime(audioPlayer.currentTime);
  totalTime.textContent = formatTime(audioPlayer.duration);
});

function seek(event) {
  const audioPlayer = document.getElementById("audioPlayer");
  const container = event.currentTarget;
  const clickX = event.offsetX;
  const width = container.clientWidth;

  const newTime = (clickX / width) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
