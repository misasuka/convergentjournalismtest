const puzzleState = {
  chapter: 1,
  puzzleCompleted: false,
};

const originalImages = [
  { src: "assets/images/event-1.svg", caption: "线索传入" },
  { src: "assets/images/event-2.svg", caption: "现场采访" },
  { src: "assets/images/event-3.svg", caption: "证据拼接" },
  { src: "assets/images/event-4.svg", caption: "报道发布" },
].map((item, index) => ({ ...item, order: index }));

const container = document.getElementById("image-order-container");
const statusEl = document.getElementById("puzzle-status");
const storyEl = document.getElementById("story-state");

let shuffledImages = shuffleImages(originalImages);
let selectedIndexes = [];

function shuffleImages(imageList) {
  const list = imageList.map((item) => ({ ...item }));
  for (let i = list.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [list[i], list[randomIndex]] = [list[randomIndex], list[i]];
  }

  const solved = isCorrectOrder(list);
  if (solved && list.length > 1) {
    [list[0], list[1]] = [list[1], list[0]];
  }

  return list;
}

function renderImagePuzzle(list) {
  container.innerHTML = "";

  list.forEach((image, visualIndex) => {
    const card = document.createElement("article");
    card.className = "image-card";
    card.dataset.order = String(image.order);
    card.dataset.index = String(visualIndex);

    if (selectedIndexes.includes(visualIndex)) {
      card.classList.add("selected");
    }

    if (puzzleState.puzzleCompleted) {
      card.classList.add("correct");
    }

    card.innerHTML = `
      <img src="${image.src}" alt="${image.caption}" loading="lazy" />
      <div class="order-tag">当前槽位：${visualIndex + 1}</div>
    `;

    card.addEventListener("click", () => onSelectCard(visualIndex));
    container.appendChild(card);
  });
}

function onSelectCard(index) {
  if (puzzleState.puzzleCompleted) {
    return;
  }

  if (selectedIndexes.includes(index)) {
    selectedIndexes = selectedIndexes.filter((item) => item !== index);
    renderImagePuzzle(shuffledImages);
    return;
  }

  selectedIndexes.push(index);

  if (selectedIndexes.length === 2) {
    const [first, second] = selectedIndexes;
    [shuffledImages[first], shuffledImages[second]] = [shuffledImages[second], shuffledImages[first]];
    selectedIndexes = [];

    if (isCorrectOrder(shuffledImages)) {
      onPuzzleComplete();
    } else {
      statusEl.textContent = "已交换，继续调整顺序。";
    }
  }

  renderImagePuzzle(shuffledImages);
}

function isCorrectOrder(list) {
  return list.every((image, index) => image.order === index);
}

function onPuzzleComplete() {
  puzzleState.puzzleCompleted = true;
  puzzleState.chapter = 2;
  statusEl.textContent = "✅ 线索已解锁：顺序完全正确，进入下一章节。";
  statusEl.classList.add("success");
  storyEl.textContent = `当前章节：第 ${puzzleState.chapter} 章（追踪深入）`;
  renderImagePuzzle(shuffledImages);
}

renderImagePuzzle(shuffledImages);
