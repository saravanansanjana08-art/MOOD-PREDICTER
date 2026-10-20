const questions = [
    {
        question: "If your morning were a landscape, what would it be?",
        answers: [
            { icon: "🌿", text: "A quiet garden after rain", mood: "calm" },
            { icon: "🦋", text: "A winding path into the woods", mood: "curious" },
            { icon: "☁️", text: "A soft, cloudy afternoon", mood: "low" },
            { icon: "🌅", text: "Sunlight over the hills", mood: "hopeful" }
        ]
    },

    {
        question: "What kind of company sounds nicest right now?",
        answers: [
            { icon: "🫖", text: "My own company and a warm drink", mood: "calm" },
            { icon: "💬", text: "Someone with a fascinating story", mood: "curious" },
            { icon: "🧸", text: "A familiar person and some quiet", mood: "low" },
            { icon: "🌼", text: "Friends and something to look forward to", mood: "hopeful" }
        ]
    },

    {
        question: "Choose a tiny treat for your day.",
        answers: [
            { icon: "📖", text: "A book and a peaceful corner", mood: "calm" },
            { icon: "🔎", text: "Trying something new", mood: "curious" },
            { icon: "🛌", text: "Rest, snacks, and fewer plans", mood: "low" },
            { icon: "🎨", text: "Making something creative", mood: "hopeful" }
        ]
    },

    {
        question: "Which little sentence feels closest to you?",
        answers: [
            { icon: "🍃", text: "I want to take things slowly.", mood: "calm" },
            { icon: "✨", text: "I wonder what I might discover.", mood: "curious" },
            { icon: "🌙", text: "I could use a gentle pause.", mood: "low" },
            { icon: "🌻", text: "Something good might be ahead.", mood: "hopeful" }
        ]
    },

    {
        question: "What would help you feel cared for today?",
        answers: [
            { icon: "🕯️", text: "A slower pace and some quiet", mood: "calm" },
            { icon: "🪁", text: "A new idea or change of scenery", mood: "curious" },
            { icon: "🧺", text: "Permission to rest", mood: "low" },
            { icon: "💌", text: "A small goal to look forward to", mood: "hopeful" }
        ]
    }
];

const moodResults = {
    calm: {
        title: "The Quiet Garden",
        icon: "🌿",
        description:
            "Your answers lean toward calm. You may be craving steadiness, breathing room, and a day without too much rushing.",
        tip:
            "Your tiny ritual: take three slow breaths, stretch your shoulders, and choose one gentle next step."
    },

    curious: {
        title: "The Butterfly Hour",
        icon: "🦋",
        description:
            "Your answers lean toward curiosity. A new question, a little experiment, or a fresh perspective might brighten your day.",
        tip:
            "Your tiny ritual: explore one interesting idea for ten minutes, just for the joy of it."
    },

    low: {
        title: "The Cloudy Nook",
        icon: "☁️",
        description:
            "Your answers lean toward low energy. A kinder pace and fewer demands might help you feel more comfortable today.",
        tip:
            "Your tiny ritual: choose one manageable task and make room for something restful."
    },

    hopeful: {
        title: "The Sunlit Window",
        icon: "☀️",
        description:
            "Your answers lean toward hopefulness. You may be ready to reconnect with a goal or make room for something promising.",
        tip:
            "Your tiny ritual: write down one thing you are looking forward to and take one small step toward it."
    }
};

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answers");
const progressBar = document.getElementById("progressBar");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const quizBox = document.getElementById("quizBox");


function displayQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent =
        `QUESTION ${currentQuestion + 1} OF ${questions.length}`;

    questionText.textContent = current.question;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    answersContainer.innerHTML = "";

    current.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer";

        if (selectedAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        const icon = document.createElement("span");
        icon.textContent = answer.icon;

        const label = document.createElement("span");
        label.textContent = answer.text;

        button.append(icon, label);

        button.addEventListener("click", () => {
            selectedAnswers[currentQuestion] = index;
            displayQuestion();
        });

        answersContainer.appendChild(button);
    });

    backButton.disabled = currentQuestion === 0;

    nextButton.disabled =
        selectedAnswers[currentQuestion] === null;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Reveal My Mood ✨"
            : "Next →";
}


backButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    }
});


nextButton.addEventListener("click", () => {
    if (selectedAnswers[currentQuestion] === null) {
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResult();
    }
});


function showResult() {
    const scores = {
        calm: 0,
        curious: 0,
        low: 0,
        hopeful: 0
    };

    selectedAnswers.forEach((answerIndex, questionIndex) => {
        const mood =
            questions[questionIndex].answers[answerIndex].mood;

        scores[mood]++;
    });

    const highestScore = Math.max(...Object.values(scores));

    const tiedMoods = Object.keys(scores).filter(
        mood => scores[mood] === highestScore
    );

    const winningMood =
        tiedMoods[Math.floor(Math.random() * tiedMoods.length)];

    const result = moodResults[winningMood];

    progressBar.style.width = "100%";

    quizBox.innerHTML = "";

    const resultDiv = document.createElement("div");
    resultDiv.className = "quiz-result";

    const icon = document.createElement("div");
    icon.className = "result-icon";
    icon.textContent = result.icon;

    const heading = document.createElement("h2");
    heading.textContent = result.title;

    const description = document.createElement("p");
    description.className = "result-description";
    description.textContent = result.description;

    const tip = document.createElement("div");
    tip.className = "result-tip";
    tip.textContent = result.tip;

    const note = document.createElement("p");
    note.className = "small-note";
    note.textContent =
        "This is a playful reflection of your answers, not a diagnosis or certain prediction. Every mood is welcome.";

    const actions = document.createElement("div");
    actions.className = "quiz-actions";

    const retryButton = document.createElement("button");
    retryButton.className = "main-button soft-button";
    retryButton.textContent = "↻ Try Again";

    retryButton.addEventListener("click", () => {
        currentQuestion = 0;
        selectedAnswers = Array(questions.length).fill(null);
        displayQuestion();
    });

    const journalButton = document.createElement("a");
    journalButton.className = "main-button";
    journalButton.textContent = "Save to Journal ♡";
    journalButton.href = "journal.html";

    try {
        localStorage.setItem(
            "mossMoonLatestMood",
            JSON.stringify({
                mood: winningMood,
                title: result.title,
                date: new Date().toISOString()
            })
        );
    } catch (error) {
        console.log("Browser storage is unavailable.");
    }

    actions.append(retryButton, journalButton);

    resultDiv.append(
        icon,
        heading,
        description,
        tip,
        note,
        actions
    );

    quizBox.appendChild(resultDiv);
}


displayQuestion();