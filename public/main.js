const LINE_COUNT = 5;
const CHAR_COUNT = 5;

const wordsWordly = document.getElementById("words");

for (let i = 0; i < LINE_COUNT; i++) {
  const wordDiv = document.createElement("div");

  wordDiv.className = "word";
  for (let j = 0; j < CHAR_COUNT; j++) {
    const chardiv = document.createElement("div");
    chardiv.className = "char";
    wordDiv.appendChild(chardiv);
  }

  wordsWordly.appendChild(wordDiv);
}

let currentChar = 0;
let currentWord = 0;

document.getElementById("VirtualKey").addEventListener("click", (event) => {
  console.log(event);
});

document.addEventListener("keydown", async (event) => {
  const firstWord = wordsWordly.children[currentWord];

  if (event.code == "Enter") {
    if (currentChar == CHAR_COUNT) {
      const answer = getCurrentWord();
      const result = await guess(answer);
      colorize(result);
      currentWord++;
      currentChar = 0;
    }
    if (currentWord == LINE_COUNT) {
      alert("you are fnish");
    }
  } else if (event.code == "Backspace") {
    if (currentChar > 0) {
      currentChar--;
      firstWord.children[currentChar].innerHTML = "";
    }
  } else if (currentChar < CHAR_COUNT) {
    if (charIsLetter(event.key)) {
      firstWord.children[currentChar].innerHTML = event.key;
      currentChar++;
    }
  } else {
    alert("Stooooooooop");
  }
});

function charIsLetter(char) {
  if (char >= "a" && char <= "z") {
    return true;
  } else {
    return false;
  }
}

async function guess(word) {
  const res = await fetch("/guess/" + word);
  const result = await res.json();
  return result;
}

function getCurrentWord() {
  var word = "";
  var wordDiv = document.getElementById("words").children[currentWord];
  for (var i = 0; i < wordDiv.children.length; i++) {
    word = word + wordDiv.children[i].innerHTML;
  }
  return word;
}

function colorize(results) {
  const wordDiv =
    document.getElementById("words").children[currentWord].children;
  for (let i = 0; i < results.length; i++) {
    if (results[i] == 1) {
      wordDiv[i].style.backgroundColor = "green";
    } else if (results[i] == 0) {
      wordDiv[i].style.backgroundColor = "yellow";
    } else {
      wordDiv[i].style.backgroundColor = "red";
    }
  }
}
