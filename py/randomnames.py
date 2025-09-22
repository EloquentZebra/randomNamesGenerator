"""Random name generator utilities."""

from __future__ import annotations

import json
import random
from pathlib import Path
from typing import Dict, List

_WORD_LISTS: Dict[str, List[str]] | None = None


def _load_wordlists() -> Dict[str, List[str]]:
    wordlist_path = Path(__file__).resolve().parents[1] / "data" / "wordlists.json"
    with wordlist_path.open(encoding="utf-8") as wordlist_file:
        data = json.load(wordlist_file)

    adjectives = data.get("adjectives")
    nouns = data.get("nouns")

    if not isinstance(adjectives, list) or not isinstance(nouns, list):
        raise ValueError("Word lists must contain 'adjectives' and 'nouns' arrays")

    if not adjectives or not nouns:
        raise ValueError("Word lists are missing adjectives or nouns")

    return {"adjectives": adjectives, "nouns": nouns}


def _get_wordlists() -> Dict[str, List[str]]:
    global _WORD_LISTS
    if _WORD_LISTS is None:
        _WORD_LISTS = _load_wordlists()
    return _WORD_LISTS


def generate_random_name(separator: str = "_") -> str:
    """Generate a random name from adjective and noun word lists."""

    word_lists = _get_wordlists()
    adjective = random.choice(word_lists["adjectives"])
    noun = random.choice(word_lists["nouns"])
    return f"{adjective}{separator}{noun}"


def main() -> None:
    """Print a random name to stdout."""

    print(generate_random_name())


if __name__ == "__main__":
    main()
