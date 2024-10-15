const wLine = document.getElementById("word-line");
const wpmIP = document.getElementById("typing-input");
const wpmD = document.getElementById("wpm");
const errD = document.getElementById("errors");
const bestWpmD = document.getElementById("best-wpm");
const rBtn = document.getElementById("restart-btn");
const msg = document.getElementById("completion-message");

//------------------------------------------------------

const words = [
  "Chintan",
  "Aman",
  "Drashti",
  "Smruti",
  "Kaushal",
  "Honey",
  "Heer",
  "Meet",
  "Jaimin",
  "Khushi",
  "Nitya",
  "Krish",
  "Smith",
  "Devanshi",
  "Dekavadiya",
  "Deep",
  "Pratham",
];

let line = "";
let startT = null;
let curIdx = 0;
let err = 0;
let bestWpm = localStorage.getItem("bestWpm") || 0;

//------------------------------------------------------//

// 8 word line
function genLine() {
  line = Array.from({ length: 8 })
    .map(() => words[Math.floor(Math.random() * words.length)])
    .join(" ");
  wLine.textContent = line;
  wpmIP.value = "";
  wpmIP.focus();
  startT = null;
  err = 0;
  curIdx = 0;
  updateStats();
  msg.textContent = "";
}

// console.log(line);

//------------------------------------------------------
// Update WPM and error stats in real-time
//Here i m using 5 char. in  one word to calc the speed of typing

function updateStats() {
  const elapsedT = (Date.now() - startT) / 60000; // in minutes
  const wpm = Math.round((curIdx + 1) / 5 / elapsedT || 0); // 5 chars = 1 word
  wpmD.textContent = wpm;
  errD.textContent = err;

  //checking the score which is generated
  if (wpm > bestWpm) {
    bestWpm = wpm;
    localStorage.setItem("bestWpm", bestWpm);
  }
  bestWpmD.textContent = bestWpm;
}

//------------------------------------------------------
wpmIP.addEventListener("input", () => {
  if (!startT) startT = Date.now();

  const typedText = wpmIP.value;
  const curChar = line[curIdx];

  //correct char.
  if (typedText[curIdx] === curChar) {
    curIdx++;
    if (curIdx === line.length) {
      // end of the line
      const elapsedM = (Date.now() - startT) / 60000;
      const finalWpm = Math.round(line.length / 5 / elapsedM || 0);
      msg.textContent = `You have done this..!!! WPM: ${finalWpm}, Errors: ${err}`;
      wpmIP.disabled = true;
    }
  } else {
    err++;
  }
  updateStats();
});

// Restart buttonnnnn
rBtn.addEventListener("click", () => {
  wpmIP.disabled = false;
  genLine();
});

/// yuppp it is staring
genLine();
