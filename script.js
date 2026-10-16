(() => {
  const cover = document.getElementById("cover");
  const invitation = document.getElementById("invitation");
  const openButton = document.getElementById("openInvite");
  const music = document.getElementById("weddingMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicStatus = document.getElementById("musicStatus");

  openButton.addEventListener("click", () => {
    cover.classList.add("is-hidden");
    invitation.classList.remove("is-hidden");
    window.scrollTo({ top: 0, behavior: "instant" });
    startPetals();
    if (music && music.querySelector("source").getAttribute("src")) {
      music.play().then(() => setMusicLabel(true)).catch(() => setMusicLabel(false));
    }
  });

  function setMusicLabel(playing) {
    musicStatus.textContent = playing ? "Music on" : "Music off";
    musicToggle.setAttribute("aria-label", playing ? "Turn background music off" : "Turn background music on");
  }

  musicToggle.addEventListener("click", async () => {
    if (!music) return;
    if (music.paused) {
      try {
        await music.play();
        setMusicLabel(true);
      } catch (err) {
        setMusicLabel(false);
        musicStatus.textContent = "Add music file";
        alert("Add your licensed music file at assets/music/traditional-wedding-music.mp3, then reload the page.");
      }
    } else {
      music.pause();
      setMusicLabel(false);
    }
  });

  // Reveal sections as they enter the viewport.
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  // Countdown to the local Hyderabad muhurtham time (UTC+05:30).
  const weddingTime = new Date("2026-11-26T09:15:00+05:30").getTime();
  const countdownMessage = document.getElementById("countdownMessage");
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function updateCountdown() {
    const remaining = weddingTime - Date.now();
    if (remaining <= 0) {
      Object.values(fields).forEach((field) => field.textContent = "00");
      countdownMessage.textContent = "Today begins a beautiful forever. Thank you for celebrating with us!";
      return;
    }
    fields.days.textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
    fields.hours.textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, "0");
    fields.minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
    fields.seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
  }
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  // Scratch-to-reveal canvas supports mouse and touch.
  const canvas = document.getElementById("scratchCanvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const card = document.getElementById("scratchCard");
  let scratching = false;
  let revealed = false;

  function setupScratch() {
    const rect = card.getBoundingClientRect();
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#b88a43");
    gradient.addColorStop(0.45, "#ead59c");
    gradient.addColorStop(1, "#a97635");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = "rgba(255,248,225,.55)";
    ctx.lineWidth = 1;
    for (let x = -rect.height; x < rect.width + rect.height; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + rect.height, rect.height);
      ctx.stroke();
    }
    ctx.fillStyle = "#fff8e8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "15px Marcellus, Georgia, serif";
    ctx.fillText("✧  SCRATCH TO REVEAL  ✧", rect.width / 2, rect.height / 2);
    ctx.globalCompositeOperation = "destination-out";
    revealed = false;
  }

  function pointFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const point = event.touches ? event.touches[0] : event;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  function scratch(event) {
    if (!scratching || revealed) return;
    if (event.cancelable) event.preventDefault();
    const { x, y } = pointFromEvent(event);
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Reveal the card automatically once roughly 40% of the cover is scratched.
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    const total = pixels.length / 4;
    for (let i = 3; i < pixels.length; i += 4 * 20) {
      if (pixels[i] < 20) transparent++;
    }
    if (transparent / Math.ceil(total / 20) > 0.4) {
      canvas.style.transition = "opacity .45s ease";
      canvas.style.opacity = "0";
      revealed = true;
      window.setTimeout(() => { canvas.style.display = "none"; }, 500);
    }
  }

  canvas.addEventListener("pointerdown", (event) => {
    scratching = true;
    canvas.setPointerCapture?.(event.pointerId);
    scratch(event);
  });
  canvas.addEventListener("pointermove", scratch);
  ["pointerup", "pointercancel", "pointerleave"].forEach((name) => {
    canvas.addEventListener(name, () => { scratching = false; });
  });
  window.addEventListener("resize", () => {
    if (!revealed) setupScratch();
  });
  setupScratch();

  // Subtle floating gold petals, limited to keep the page light.
  let petalsStarted = false;
  function startPetals() {
    if (petalsStarted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    petalsStarted = true;
    const layer = document.querySelector(".petal-layer");
    const symbols = ["✿", "✧", "❀"];
    window.setInterval(() => {
      if (document.hidden) return;
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.fontSize = `${10 + Math.random() * 12}px`;
      petal.style.animationDuration = `${7 + Math.random() * 7}s`;
      layer.appendChild(petal);
      window.setTimeout(() => petal.remove(), 15000);
    }, 1200);
  }
})();