let wordListsPromise;

function loadWordLists() {
    if (!wordListsPromise) {
        wordListsPromise = fetch("../data/wordlists.json")
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

async function generateRandomName(targetId) {
    let target;

    try {
        const { adjectives, nouns } = await loadWordLists();
        const randomNoun = selectRandomWord(nouns);
        const randomAdjective = selectRandomWord(adjectives);
        const randomName = randomAdjective + "-" + randomNoun;

        target = document.getElementById(targetId);
        if (target) {
            target.value = randomName;
        }

        return randomName;
    } catch (error) {
        console.error("Failed to generate a random name", error);
        target = target || document.getElementById(targetId);
        if (target) {
            target.value = "error-loading-names";
        }
        return null;
    }
}

function copyToClipboard(getValueFrom) {
    var textBox = document.getElementById(getValueFrom);
    textBox.select();
    document.execCommand("copy");
}