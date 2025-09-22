import json
import random
from pathlib import Path


def _load_wordlists():
        wordlist_path = Path(__file__).resolve().parents[1] / "data" / "wordlists.json"
        with wordlist_path.open() as wordlist_file:
                return json.load(wordlist_file)


WORD_LISTS = _load_wordlists()


def generateRandomName():
        adjective = WORD_LISTS.get("adjectives")
        noun = WORD_LISTS.get("nouns")

        if not adjective or not noun:
                raise ValueError("Word lists are missing adjectives or nouns")

        return random.choice(adjective) + "_" + random.choice(noun)

def main():
	print(generateRandomName())

if __name__ == "__main__":
	main()
=======
import random


def generate_random_name():
    adjectives = [
        "admiring",
        "adoring",
        "affectionate",
        "amazing",
        "angry",
        "awesome",
        "beautiful",
        "busy",
        "charming",
        "clever",
        "cool",
        "competent",
        "confident",
        "crazy",
        "distracted",
        "dreamy",
        "eager",
        "elegant",
        "eloquent",
        "epic",
        "exciting",
        "gifted",
        "goofy",
        "funny",
        "great",
        "happy",
        "hopeful",
        "hungry",
        "inspiring",
        "intelligent",
        "interesting",
        "kind",
        "loving",
        "magical",
        "naughty",
        "nervous",
        "nice",
        "nostalgic",
        "peaceful",
        "quirky",
        "relaxed",
        "romantic",
        "sad",
        "sharp",
        "silly",
        "sleepy",
        "strange",
        "suspicious",
        "sweet",
        "thirsty",
        "tired",
        "wonderful",
    ]

    nouns = [
        "ant",
        "bat",
        "bee",
        "butterfly",
        "cat",
        "dog",
        "dragonfly",
        "elephant",
        "falcon",
        "fish",
        "flamingo",
        "fly",
        "giraffe",
        "gnu",
        "gorilla",
        "hamster",
        "kangaroo",
        "lemur",
        "lion",
        "monkey",
        "opossum",
        "ostrich",
        "panda",
        "penguin",
        "pig",
        "pigeon",
        "rabbit",
        "seagull",
        "sheep",
        "snake",
        "tiger",
        "turtle",
        "whale",
        "wolf",
        "zebra",
    ]
    return random.choice(adjectives) + "_" + random.choice(nouns)


def main():
    print(generate_random_name())


if __name__ == "__main__":
    main()