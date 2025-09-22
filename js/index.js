const WORD_LIST_PATH = "../data/wordlists.json";
let wordListsPromise;

function loadWordLists() {
  if (!wordListsPromise) {
    wordListsPromise = fetch(WORD_LIST_PATH)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load word lists");
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
        wordListsPromise = undefined;
        throw error;
      });
  }

  return wordListsPromise;
}

function selectRandomWord(words) {
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error("Word list must be a non-empty array");
  }

  return words[Math.floor(Math.random() * words.length)];
}

function setStatus(message, { isError = false } = {}) {
  const statusElement = document.getElementById("statusMessage");

  if (!statusElement) {
    return;
  }

  if (!message) {
    statusElement.hidden = true;
    statusElement.textContent = "";
    statusElement.classList.remove("error");
    return;
  }

  statusElement.textContent = message;
  statusElement.hidden = false;

  if (isError) {
    statusElement.classList.add("error");
  } else {
    statusElement.classList.remove("error");
  }
}

function setLoadingState(isLoading) {
  const generateButton = document.getElementById("generateName");
  const copyButton = document.getElementById("copyName");
  const input = document.getElementById("ansRandomName");

  if (generateButton) {
    generateButton.disabled = isLoading;
  }

  if (copyButton) {
    copyButton.disabled = isLoading || !input || !input.value;
  }
}

async function generateRandomName() {
  const target = document.getElementById("ansRandomName");

  if (!target) {
    return null;
  }

  setLoadingState(true);
  setStatus("Generating name…");

  try {
    const { adjectives, nouns } = await loadWordLists();
    const randomName = `${selectRandomWord(adjectives)}-${selectRandomWord(nouns)}`;
    target.value = randomName;
    setStatus("Name generated. You can copy it now.");
    return randomName;
  } catch (error) {
    console.error("Failed to generate a random name", error);
    target.value = "";
    setStatus("Sorry, we couldn't load fresh names. Please try again.", {
      isError: true,
    });
    return null;
  } finally {
    setLoadingState(false);
  }
}

async function copyToClipboard() {
  const target = document.getElementById("ansRandomName");
  const copyButton = document.getElementById("copyName");

  if (!target || !target.value) {
    return;
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(target.value);
    } else {
      target.focus();
      target.select();
      document.execCommand("copy");
      target.setSelectionRange(target.value.length, target.value.length);
    }

    setStatus("Copied to clipboard!", { isError: false });
    copyButton?.focus();
  } catch (error) {
    console.error("Failed to copy to clipboard", error);
    setStatus("Copy failed. Please copy the text manually.", { isError: true });
  }
}

function initialize() {
  const generateButton = document.getElementById("generateName");
  const copyButton = document.getElementById("copyName");

  generateButton?.addEventListener("click", generateRandomName);
  copyButton?.addEventListener("click", copyToClipboard);

  generateRandomName();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialize);
} else {
  initialize();
}
