import { getThemeToggle } from "./src/theme.js";
import { getVideo, drawVideo } from "./src/camera.js";
import { drawText } from "./src/text.js";
import { Modal } from "./src/modal.js";

const memeCanvas = document.getElementById("meme");

// Create unattached canvas elements
// to serve as "layers" of the meme
const selfieLayer = document.createElement("canvas");
const textLayer = document.createElement("canvas");
for (let canvas of [selfieLayer, textLayer]) {
  canvas.width = memeCanvas.width;
  canvas.height = memeCanvas.height;
}

// When either layer has changed, we'll
// call this function to redraw the
// meme with the layers' new data
function redrawMeme() {
  const memeCtx = memeCanvas.getContext("2d");
  memeCtx.drawImage(selfieLayer, 0, 0);
  memeCtx.drawImage(textLayer, 0, 0);
}

function setupSettings() {
  const settings = document.getElementById("settings");
  getThemeToggle();

  const darkModal = new Modal(
    "Settings",
    settings,
    settings.querySelector(".modal-content")
  );
  darkModal.render();
}

function setupAddText() {
  const textInputs = document.getElementById("add-text");
  const saveTextBtn = document.getElementById("text-save");

  saveTextBtn.addEventListener("click", () => {
    drawText(textLayer);
    redrawMeme();
  });

  const textModal = new Modal(
    "Add some text",
    textInputs,
    textInputs.querySelector(".modal-content")
  );
  textModal.render();
}

async function setupTakeSelfie() {
  const selfie = document.getElementById("take-selfie");
  const savePhotoBtn = document.getElementById("save-photo");

  const selfieModal = new Modal(
    "Take a selfie",
    selfie,
    selfie.querySelector(".modal-content")
  );
  selfieModal.render();

  const previewCanvas = document.getElementById("preview");

  const video = await getVideo(previewCanvas);

  savePhotoBtn.addEventListener("click", () => {
    drawVideo(video, selfieLayer);
    redrawMeme();
  });
}

// IIFE in case we don't have top-level await
(async function run() {
  setupSettings();
  setupAddText();
  await setupTakeSelfie();
})();
