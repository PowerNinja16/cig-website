// dashboard.logic.js
import { decryptFile } from "./crypto.js";

const modal  = document.getElementById("modal");
const title  = document.getElementById("modal-title");
const body   = document.getElementById("modal-content");

const FILE_CONFIG = {
  email: {
    path: "files_dashboard/email.enc.json",
    mime: "image/png",
    filename: "email.png"
  },
  images: {
    path: "files_dashboard/group_codemind.enc.json",
    mime: "image/jpeg",
    filename: "group_codemind_embedded.jpg"
  },
  tools: {
    path: "files_dashboard/steghide.enc.json",
    mime: "application/zip",
    filename: "steghide.zip"
  },
  research: {
    path: "files_dashboard/ResearchLinks.enc.json",
    mime: "text/plain",
    filename: "ResearchLinks.txt"
  },
  communications: {
    path: "files_dashboard/CommunicationsFromWinners.enc.json",
    mime: "text/plain",
    filename: "CommunicationsFromWinners.txt"
  }
};

window.openFile = async function (type) {
  const config = FILE_CONFIG[type];
  if (!config) return;

  try {
    const password = sessionStorage.getItem("cig_pass");
    if (!password) throw new Error("NO SESSION KEY");

    const res = await fetch(config.path);
    const encJson = await res.json();

    const buffer = await decryptFile(encJson, password);
    const blob = new Blob([buffer], { type: config.mime });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = config.filename;
    document.body.appendChild(a);
    a.click();

    a.remove();
    URL.revokeObjectURL(url);

  } catch (err) {
    showError(
      "DECRYPTION FAILURE",
      "Archive integrity check failed.\n\n>> PASSWORD INVALID OR FILE CORRUPTED"
    );
  }
};

window.closeModal = () => {
  modal.style.display = "none";
};

function showError(titleText, contentText) {
  modal.style.display = "flex";
  title.textContent = titleText;
  body.textContent = contentText;
}