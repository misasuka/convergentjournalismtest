const storyNodes = {
  start: {
    id: 'start',
    text: '你在一座废弃灯塔前醒来，海风里夹杂着低语。你要先做什么？',
    choices: [
      { label: '推开灯塔大门', nextId: 'towerEntrance' },
      { label: '沿着海岸寻找线索', nextId: 'shoreline' }
    ]
  },
  towerEntrance: {
    id: 'towerEntrance',
    text: '门后是一段旋转楼梯，顶部闪烁着幽蓝色的光。',
    choices: [
      { label: '继续向上攀爬', nextId: 'lanternRoom' },
      { label: '回到海岸边', nextId: 'shoreline' }
    ]
  },
  shoreline: {
    id: 'shoreline',
    text: '你在礁石间发现一只密封木箱，箱盖上刻着奇怪符号。',
    choices: [
      { label: '撬开木箱', nextId: 'sealedChest' },
      { label: '带着木箱回灯塔', nextId: 'lanternRoom' }
    ]
  },
  sealedChest: {
    id: 'sealedChest',
    text: '木箱里藏着一封旧信，提醒你不要点亮灯塔。你迟疑了。',
    choices: [
      { label: '无视警告，前往灯室', nextId: 'lanternRoom' },
      { label: '把信投入海中，离开此地', nextId: 'endingEscape' }
    ]
  },
  lanternRoom: {
    id: 'lanternRoom',
    text: '灯室中央悬浮着一盏古灯，灯芯像心脏般跳动。',
    choices: [
      { label: '点亮古灯', nextId: 'endingAwaken' },
      { label: '熄灭灯芯并封印灯室', nextId: 'endingSeal' }
    ]
  },
  endingAwaken: {
    id: 'endingAwaken',
    text: '古灯被点亮，海面升起巨大的影子。你成为新任守灯人。',
    choices: []
  },
  endingSeal: {
    id: 'endingSeal',
    text: '你成功封印灯室，低语声停止，黎明在海平线上升起。',
    choices: []
  },
  endingEscape: {
    id: 'endingEscape',
    text: '你转身离开海岸，再也没回头。传说中的灯塔成了梦魇。',
    choices: []
  }
};

const OPENING_NODE_ID = 'start';
let currentNodeId = OPENING_NODE_ID;

function renderStoryNode(nodeId) {
  const container = document.getElementById('story-branch-container');
  if (!container) {
    return;
  }

  const node = storyNodes[nodeId] || storyNodes[OPENING_NODE_ID];
  currentNodeId = node.id;
  container.innerHTML = '';

  const storyText = document.createElement('p');
  storyText.className = 'story-text';
  storyText.textContent = node.text;
  container.appendChild(storyText);

  if (Array.isArray(node.choices) && node.choices.length > 0) {
    const choicesWrapper = document.createElement('div');
    choicesWrapper.className = 'story-choices';

    node.choices.forEach((choice) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'story-choice-button';
      button.textContent = choice.label;
      button.addEventListener('click', () => onChoiceSelected(choice.nextId));
      choicesWrapper.appendChild(button);
    });

    container.appendChild(choicesWrapper);
    return;
  }

  const restartButton = document.createElement('button');
  restartButton.type = 'button';
  restartButton.className = 'story-restart-button';
  restartButton.textContent = '重新开始';
  restartButton.addEventListener('click', resetStory);
  container.appendChild(restartButton);
}

function onChoiceSelected(nextId) {
  if (!storyNodes[nextId]) {
    return;
  }

  currentNodeId = nextId;
  renderStoryNode(currentNodeId);
}

function resetStory() {
  currentNodeId = OPENING_NODE_ID;
  renderStoryNode(currentNodeId);
}

function initStory() {
  renderStoryNode(currentNodeId);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStory);
} else {
  initStory();
}

window.storyNodes = storyNodes;
window.renderStoryNode = renderStoryNode;
window.onChoiceSelected = onChoiceSelected;
window.resetStory = resetStory;
