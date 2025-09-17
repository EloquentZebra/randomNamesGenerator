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
