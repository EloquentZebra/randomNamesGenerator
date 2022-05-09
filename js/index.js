var randomName;

function generateRandomName(targetId) {
	var adjectives = [
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
		"wounderful"
	];

	var nouns = [
		"bat",
		"cat",
		"giraff",
		"lion",
		"monkey",
		"panda",
		"penguin",
		"rabbit",
		"snake",
		"tiger",
		"zebra",
		"elephant",
		"dog",
		"dragonfly",
		"butterfly",
		"falcon",
		"gorilla",
		"flamingo",
		"fish",
		"fly",
		"gnu",
		"kangaroo",
		"hamster",
		"seagull",
		"turtle",
		"whale",
		"lemur",
		"pig",
		"ostrich",
		"opossum",
		"pigeon",
		"rabbit",
		"snake",
		"sheep",
		"turtle",
		"wolf",
		"zebra",
		"ant",
		"bee",
		"butterfly"
	];

	var randomNoun = nouns[Math.floor(Math.random()*nouns.length)];
	var randomAdjective = adjectives[Math.floor(Math.random()*adjectives.length)];

	var randomName = randomAdjective + "-" + randomNoun;

	var target = document.getElementById(targetId);
	target.value = randomName;

	return randomName;
}

function copyToClipboard(getValueFrom) {
    var textBox = document.getElementById(getValueFrom);
    textBox.select();
    document.execCommand("copy");
}