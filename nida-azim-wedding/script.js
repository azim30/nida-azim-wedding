const weddingDate = new Date("2027-01-01T11:00:00+05:30").getTime();

function updateCountdown(){
  const now = Date.now();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById("days").textContent = String(d).padStart(2,"0");
  document.getElementById("hours").textContent = String(h).padStart(2,"0");
  document.getElementById("minutes").textContent = String(m).padStart(2,"0");
  document.getElementById("seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown,1000);

const curtain = document.getElementById("curtain");
document.getElementById("openInvite").addEventListener("click",()=>{
  curtain.classList.add("open");
  setTimeout(()=>curtain.style.display="none",1900);
  const audio = document.getElementById("music");
  audio.play().then(()=>document.getElementById("musicBtn").textContent="❚❚").catch(()=>{});
});

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click",()=>{
  if(music.paused){
    music.play().then(()=>musicBtn.textContent="❚❚").catch(()=>alert("Add your licensed music file at music/jashn-e-bahaara.mp3 first."));
  }else{
    music.pause();
    musicBtn.textContent="♪";
  }
});

document.querySelectorAll(".rsvp-option").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".rsvp-option").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
  });
});

document.getElementById("sendRsvp").addEventListener("click",()=>{
  const name = document.getElementById("guestName").value.trim() || "Guest";
  const response = document.querySelector(".rsvp-option.active").dataset.value;
  const message = document.getElementById("message").value.trim();
  const text = `Assalamu Alaikum Nida & Azim!%0A%0AName: ${encodeURIComponent(name)}%0ARSVP: ${encodeURIComponent(response)}${message ? `%0AMessage: ${encodeURIComponent(message)}` : ""}%0A%0A01 January 2027`;
  window.open(`https://wa.me/919664320421?text=${text}`,"_blank");
});
