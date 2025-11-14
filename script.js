const addTextBtn = document.getElementById("addText");
const deleteTextBtn = document.getElementById("deleteText");
const fontSizeInput = document.getElementById("fontSize");
const fontFamilySelect = document.getElementById("fontFamily");
const fontColorInput = document.getElementById("fontColor");

let selectedText = null;

// Function to make text draggable
function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;

  el.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("resize-handle")) return;
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    selectText(el);
  });

  document.addEventListener("mouseup", () => (isDragging = false));

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const parent = el.parentElement.getBoundingClientRect();
    let x = e.clientX - parent.left - offsetX;
    let y = e.clientY - parent.top - offsetY;

    x = Math.max(0, Math.min(x, parent.width - el.offsetWidth));
    y = Math.max(0, Math.min(y, parent.height - el.offsetHeight));

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  });
}

// Function to make text resizable
function makeResizable(el) {
  const handle = document.createElement("div");
  handle.classList.add("resize-handle");
  el.appendChild(handle);

  let isResizing = false;

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isResizing = true;
  });

  document.addEventListener("mouseup", () => (isResizing = false));

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement.getBoundingClientRect();
    const newWidth = Math.min(parent.width - rect.left + parent.left, e.clientX - rect.left);
    const newHeight = Math.min(parent.height - rect.top + parent.top, e.clientY - rect.top);

    el.style.width = `${newWidth}px`;
    el.style.height = `${newHeight}px`;
  });
}

// Select a text box
function selectText(el) {
  if (selectedText) selectedText.classList.remove("selected");
  selectedText = el;
  selectedText.classList.add("selected");
}

// for text button
addTextBtn.addEventListener("click", () => {
  const activeSlide = document.querySelector(".swiper-slide-active .slide-content");
  const newText = document.createElement("div");
  newText.textContent = "New Text";
  newText.className = "text-box";
  newText.style.left = "50px";
  newText.style.top = "50px";
  newText.style.fontSize = "18px";
  newText.style.fontFamily = "serif";
  newText.contentEditable = true;
  newText.style.width = "100px";
  newText.style.height = "auto";

  activeSlide.appendChild(newText);
  makeDraggable(newText);
  makeResizable(newText);
  selectText(newText);
});

// Delete text button
deleteTextBtn.addEventListener("click", () => {
  if (selectedText) {
    selectedText.remove();
    selectedText = null;
  }
});

// Font controls
fontSizeInput.addEventListener("input", () => {
  if (selectedText) selectedText.style.fontSize = `${fontSizeInput.value}px`;
});

fontFamilySelect.addEventListener("change", () => {
  if (selectedText) selectedText.style.fontFamily = fontFamilySelect.value;
});

fontColorInput.addEventListener("input", () => {
  if (selectedText) selectedText.style.color = fontColorInput.value;
});

// Swiper 
const swiper = new Swiper(".mySwiper", {
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
