const gameState = {
  story: {
    currentNodeId: "intro",
    visitedNodes: ["intro"],
  },
  lockGame: {
    solved: false,
    attempts: 0,
    currentStep: 0,
  },
  imageOrder: {
    solved: false,
    currentOrder: [],
    targetOrder: [],
    moves: 0,
  },
};

window.gameState = gameState;

const moduleVisibility = {
  "story-branch-container": true,
  "lock-game-container": false,
  "image-order-container": false,
};

function setModuleVisibility(containerId, isVisible) {
  const element = document.getElementById(containerId);
  if (!element) return;

  element.classList.toggle("is-hidden", !isVisible);
  moduleVisibility[containerId] = isVisible;
}

window.appStateApi = {
  gameState,
  moduleVisibility,
  setModuleVisibility,
};
