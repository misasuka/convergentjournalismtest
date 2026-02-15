const LOCK_CODE = "2048";

const gameState = {
  lockSolved: false,
  lockAttempts: 0,
};

const lockInput = document.querySelector("#lock-input");
const lockSubmit = document.querySelector("#lock-submit");
const lockHint = document.querySelector("#lock-hint");
const branchButton = document.querySelector("#branch-button");

function validateLockInput(value) {
  return /^\d{4}$/.test(value.trim());
}

function checkLockCode(value) {
  return value.trim() === LOCK_CODE;
}

function unlockStoryBranch() {
  gameState.lockSolved = true;
  branchButton.disabled = false;
  branchButton.classList.add("is-unlocked");
}

function handleLockSubmit() {
  const inputValue = lockInput.value;

  if (!validateLockInput(inputValue)) {
    lockHint.textContent = "请输入 4 位数字密码。";
    lockHint.dataset.state = "invalid";
    return;
  }

  gameState.lockAttempts += 1;

  if (checkLockCode(inputValue)) {
    unlockStoryBranch();
    lockHint.textContent = `密码正确！已尝试 ${gameState.lockAttempts} 次，剧情分支已解锁。`;
    lockHint.dataset.state = "success";
    return;
  }

  lockHint.textContent = `密码错误，当前已尝试 ${gameState.lockAttempts} 次。`;
  lockHint.dataset.state = "error";
}

lockSubmit.addEventListener("click", handleLockSubmit);
lockInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleLockSubmit();
  }
});

window.lockGame = {
  LOCK_CODE,
  gameState,
  validateLockInput,
  checkLockCode,
  handleLockSubmit,
};
