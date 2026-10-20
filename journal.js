const form = document.getElementById("journalForm");

const dateInput = document.getElementById("entryDate");
const moodInput = document.getElementById("entryMood");
const noteInput = document.getElementById("entryNote");

const entriesContainer =
    document.getElementById("journalEntries");

const STORAGE_KEY = "mossMoonJournalEntries";

dateInput.value = new Date().toLocaleDateString("en-CA");


function getEntries() {
    try {
        return JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );
    } catch (error) {
        return [];
    }
}


function saveEntries(entries) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(entries)
        );

        return true;
    } catch (error) {
        alert("Unable to save entries in this browser.");
        return false;
    }
}


function displayEntries() {
    const entries = getEntries();

    entriesContainer.innerHTML = "";

    if (entries.length === 0) {
        entriesContainer.innerHTML = `
            <p class="small-note">
                Your first little memory can grow here. 🌱
            </p>
        `;

        return;
    }

    entries.slice().reverse().forEach(entry => {
        const card = document.createElement("article");
        card.className = "journal-entry";

        const heading = document.createElement("h3");
        heading.textContent = entry.mood;

        const date = document.createElement("small");
        date.textContent = entry.date;

        const note = document.createElement("p");
        note.textContent = entry.note || "A little check-in.";

        card.append(heading, date, note);

        entriesContainer.appendChild(card);
    });
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newEntry = {
        date: dateInput.value,
        mood: moodInput.value,
        note: noteInput.value.trim()
    };

    const entries = getEntries();

    entries.push(newEntry);

    if (saveEntries(entries)) {
        noteInput.value = "";

        dateInput.value =
            new Date().toLocaleDateString("en-CA");

        displayEntries();

        alert("Your little memory has been planted! 🌱");
    }
});


displayEntries();