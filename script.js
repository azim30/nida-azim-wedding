const weddingDate = new Date("2027-01-01T19:00:00+05:30").getTime();

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
const openInvite = document.getElementById("openInvite");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let invitationOpened = false;

// Start music directly from the Open Invitation CLICK gesture.
// Keeping play() inside the trusted click handler is the most reliable
// cross-platform approach for iOS Safari and Android Chrome.
function openInvitation(event) {
  if (event) event.preventDefault();
  if (invitationOpened) return;
  invitationOpened = true;

  // IMPORTANT: do not call music.load(), setTimeout(), or another
  // asynchronous function before play(). The browser must see play()
  // as part of the user's actual tap/click.
  music.muted = false;
  music.volume = 1;

  const playPromise = music.play();

  if (playPromise && typeof playPromise.then === "function") {
    playPromise
      .then(() => {
        musicBtn.textContent = "❚❚";
      })
      .catch((error) => {
        // Some browser/device settings can still block audio.
        // The music button below gives the user another direct gesture.
        console.log("Music playback was blocked:", error);
        musicBtn.textContent = "♪";
      });
  }

  curtain.classList.add("open");
  setTimeout(() => {
    curtain.style.display = "none";
  }, 1900);
}

// Use CLICK rather than pointerdown so Android Chrome and iOS Safari
// receive the normal trusted user activation for media playback.
openInvite.addEventListener("click", openInvitation);

// Keyboard accessibility for desktop users.
openInvite.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openInvitation(event);
  }
});

// Music button: play/pause is also always triggered directly by the user's click.
musicBtn.addEventListener("click", (event) => {
  event.stopPropagation();

  if (music.paused) {
    music.muted = false;
    music.volume = 1;

    music.play()
      .then(() => {
        musicBtn.textContent = "❚❚";
      })
      .catch((error) => {
        console.log("Unable to play music:", error);
        musicBtn.textContent = "♪";
      });
  } else {
    music.pause();
    musicBtn.textContent = "♪";
  }
});

// Keep the button icon synchronized with the actual audio state.
music.addEventListener("play", () => {
  musicBtn.textContent = "❚❚";
});

music.addEventListener("pause", () => {
  musicBtn.textContent = "♪";
});


// Scratch-to-reveal date
(() => {
  const canvas=document.getElementById("scratchCanvas"), card=document.getElementById("scratchCard");
  const progress=document.getElementById("scratchProgress"), status=document.getElementById("scratchStatus");
  if(!canvas||!card)return;
  const ctx=canvas.getContext("2d",{willReadFrequently:true}); let drawing=false,revealed=false;
  function setup(){
    const r=card.getBoundingClientRect(),dpr=Math.max(1,devicePixelRatio||1);
    canvas.width=Math.round(r.width*dpr); canvas.height=Math.round(r.height*dpr);
    canvas.style.width=r.width+"px";canvas.style.height=r.height+"px";ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.globalCompositeOperation="source-over";
    const g=ctx.createLinearGradient(0,0,r.width,r.height);g.addColorStop(0,"#741728");g.addColorStop(.5,"#b58a5d");g.addColorStop(1,"#5f1421");
    ctx.fillStyle=g;ctx.fillRect(0,0,r.width,r.height);ctx.fillStyle="#fff8ef";ctx.font='600 11px Montserrat,sans-serif';ctx.textAlign="center";ctx.fillText("SCRATCH TO REVEAL",r.width/2,r.height/2);
    ctx.globalCompositeOperation="destination-out";
  }
  function erase(x,y){
    if(revealed)return;const r=canvas.getBoundingClientRect();ctx.beginPath();ctx.arc(x-r.left,y-r.top,25,0,Math.PI*2);ctx.fill();measure();
  }
  function measure(){
    const d=ctx.getImageData(0,0,canvas.width,canvas.height).data;let c=0,t=0;
    for(let i=3;i<d.length;i+=64){t++;if(d[i]<35)c++} const pct=Math.round(c/Math.max(1,t)*100);
    if(progress)progress.style.width=Math.min(100,pct)+"%";
    if(pct>=55&&!revealed){revealed=true;canvas.classList.add("scratched");if(status)status.textContent="01 January 2027 — now scroll down for the countdown ✨";if(progress)progress.style.width="100%";}
  }
  canvas.addEventListener("pointerdown",e=>{drawing=true;canvas.setPointerCapture(e.pointerId);erase(e.clientX,e.clientY)});
  canvas.addEventListener("pointermove",e=>{if(drawing)erase(e.clientX,e.clientY)});
  canvas.addEventListener("pointerup",()=>drawing=false);canvas.addEventListener("pointercancel",()=>drawing=false);
  setup();window.addEventListener("resize",()=>{if(!revealed)setup()});
})();
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
