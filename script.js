const searchInput = document.getElementById("searchInput");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const definition = document.getElementById("definition");
const synonyms = document.getElementById("synonyms");
const antonyms = document.getElementById("antonyms");
const example = document.getElementById("example");
const audio = document.getElementById("audio");
const wordOfDay = document.getElementById("wordOfDay");
const voiceSearchBtn = document.getElementById("voiceSearch");

// Fetch word meaning
async function fetchAPI(word) {
    try {
        infoText.innerText = `Searching for '${word}'...`;
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then(res => res.json());

        if (result.title) {
            meaningContainer.style.display = "block";
            title.innerText = word;
            definition.innerText = "No definition found";
        } else {
            meaningContainer.style.display = "block";
            title.innerText = result[0].word;
            definition.innerText = result[0].meanings[0].definitions[0].definition;
            synonyms.innerText = result[0].meanings[0].synonyms.join(", ") || "N/A";
            antonyms.innerText = result[0].meanings[0].antonyms.join(", ") || "N/A";
            example.innerText = result[0].meanings[0].definitions[0].example || "No example available";
            audio.src = result[0].phonetics[0]?.audio || "";
        }
    } catch (error) {
        console.log(error);
        infoText.innerText = "Error fetching data. Try again!";
    }
}

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";

voiceSearchBtn.addEventListener("click", () => {
    recognition.start();
});

recognition.onresult = function (event) {
    let spokenWord = event.results[0][0].transcript;
    searchInput.value = spokenWord;
    fetchAPI(spokenWord);
};

// Word of the Day Feature
async function fetchWordOfDay() {
    let words = ["ephemeral", "serendipity", "ubiquitous", "quixotic", "melancholy"];
    let randomWord = words[Math.floor(Math.random() * words.length)];
    wordOfDay.innerText = randomWord;
    fetchAPI(randomWord);
}

// Event Listeners
searchInput.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});

fetchWordOfDay();
