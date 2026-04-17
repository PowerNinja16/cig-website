// media.js
import { decryptFile } from "./crypto.js";

export async function playEncryptedMusic() {
  const password = sessionStorage.getItem("cig_pass");
  if (!password) return;

  try {
    const res = await fetch("files_dashboard/LoginSong.enc.json");
    const encJson = await res.json();

    const buffer = await decryptFile(encJson, password);
    const blob = new Blob([buffer], { type: "audio/mpeg" });

    const audio = document.getElementById("login-music");
    audio.src = URL.createObjectURL(blob);
    audio.volume = 0.02;

    const play = audio.play();
    if (play !== undefined) {
      play.catch(() => {
        document.addEventListener(
          "click",
          () => audio.play(),
          { once: true }
        );
      });
    }
  } catch {
    // silent fail — music is non‑critical
  }
}

window.addEventListener("load", playEncryptedMusic);