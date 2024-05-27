document.addEventListener("DOMContentLoaded", function () {
    const submitButton = document.getElementById("submit-btn");
    const nextButton = document.getElementById("next-btn");
    const resultDiv = document.getElementById("result");
    const questionContainer = document.getElementById("question-container");
    let currentQuestionIndex = 0;
    // Define an array to keep track of shown question indices
    const shownQuestionIndices = [];
    let questionCounter = 0;
    const questions = shuffleArray(getQuestions());
    if (!questions) return;

    gifsCorrect = ['https://giphy.com/embed/orUBPAFddnyo5HhQNC', 'https://giphy.com/embed/9Ai5dIk8xvBm0', 'https://giphy.com/embed/12EGL6Lj9e1AuQ', 'https://giphy.com/embed/cMq7gwTNX4jTO', 'https://giphy.com/embed/y9PHMVW6j0CB2', 'https://giphy.com/embed/J0a9SREMHkBAA', 'https://giphy.com/embed/Rs7iE0xMIwLzJ9cdX3', 'https://giphy.com/embed/L0O3TQpp0WnSXmxV8p'];
    gifsWrong = ['https://giphy.com/embed/hPPx8yk3Bmqys', 'https://giphy.com/embed/3orif5JHN2ymsSryRq', 'https://giphy.com/embed/ywV7YEcRbKI3WX05q1', 'https://giphy.com/embed/XazTKKTogKXQI', 'https://giphy.com/embed/12gzyin737yluE', 'https://giphy.com/embed/2OP9jbHFlFPW', 'https://giphy.com/embed/iHskdY9SMLFZuQ2u5c', 'https://giphy.com/embed/fAnRd2Vexak0mnqYYq', 'https://giphy.com/embed/wn3hk5esy9OkKSVxPW'];
    displayRandomQuestion(currentQuestionIndex);

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    submitButton.addEventListener("click", function () {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            displayResult("Please select an answer before submitting.", "#ff4747");
            return;
        }

        const answerValue = selectedAnswer.value;
        const correctAnswer = questions[currentQuestionIndex].answer;
        const isCorrect = answerValue === correctAnswer;

        const funnyMessages = isCorrect
            ? [
                "Correct! You have a 'prescribed' sense of humor!",
                "Well done! Your humor is 'diagnostically' funny!",
                "That's right! You're 'surgically' precise with your jokes!",
                "Correct! You must have a 'healthy' sense of humor!",
                "You nailed it! Your humor is 'therapeutically' good!",
                "Great job! You're 'certified' in comedy!",
                "Correct! You've passed the 'laughter check-up'!",
                "You're on fire! Your humor is 'clinically' proven!"
            ]
            : [
                "Oops, that's not quite right. Maybe you need a 'second opinion' on your answer.",
                "Hmmm, incorrect. Looks like your answer needs a 'diagnostic review'.",
                "Incorrect! You're 'prescribed' to pick a different option.",
                "Nope, that's not the 'diagnosis' we were looking for.",
                "Incorrect, but don't worry, even the best doctors 'misdiagnose' sometimes.",
                "Oopsie daisy, that's not the right answer. 'Consultation' is recommended.",
                "Close, but not quite. Your answer is 'overruled' by the medical board!",
                "Incorrect, but don't 'discharge' your humor yet. Keep guessing!"
            ];

        const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        displayResult(randomMessage, isCorrect ? "#00a300" : "#ff4747");

        var gif = document.getElementById("gif");
        console.log(gif);
        var gifIframe = gif.querySelector("iframe");
        console.log(gifIframe);

        if (isCorrect) {
            nextButton.style.display = "block";
            submitButton.style.display = "none";
            gif.style.display = "block";
            gifIframe.src = gifsCorrect[Math.floor(Math.random() * gifsCorrect.length)]
        } else if (!isCorrect) {
            gif.style.display = "block";
            gifIframe.src = gifsWrong[Math.floor(Math.random() * gifsWrong.length)]
        }
        else {
            gif.style.display = "none";
        }
    });


    nextButton.addEventListener("click", function () {
        gif.style.display = "none";

        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayRandomQuestion(currentQuestionIndex);
            displayResult("", "");
            submitButton.style.display = "block";
            nextButton.style.display = "none";
        } else {
            questionContainer.innerHTML = "Congratulations! You've completed the quiz.";
            displayResult("", "");
            nextButton.style.display = "none";
            submitButton.style.display = "none";
        }
    });

    function displayResult(message, color) {
        resultDiv.textContent = message;
        resultDiv.style.color = color;
    }

    function getRandomQuestionIndex() {
        // Generate a random index that hasn't been shown yet
        const remainingIndices = questions.filter((_, index) => !shownQuestionIndices.includes(index));
        if (remainingIndices.length === 0) {
            // All questions have been shown, reset the array
            shownQuestionIndices.length = 0;
        }
        const randomIndex = Math.floor(Math.random() * remainingIndices.length);
        return randomIndex;
    }

    function displayRandomQuestion() {
        // Get a random index for the next question
        const index = getRandomQuestionIndex();
        if (index !== undefined) {
            debugger;
            const question = questions[index];
            const options = question.options.map((option, idx) => `
            <label>
                <input type="radio" name="answer" value="${String.fromCharCode(97 + idx)}"> ${option}
            </label>
        `).join('');

            if (questionCounter != 1) questionCounter++;
            questionContainer.innerHTML = `
            <p class="question-counter">Question ${questionCounter}/${questions.length}</p>
            <p class="legal-question">${question.question}</p>
            <div class="options-container">${options}</div>
        `;

            // Add the index to the shown question indices
            shownQuestionIndices.push(index);
        }
    }

    // Call displayRandomQuestion to show the first question
    displayRandomQuestion();


    function getQuestions() {
        var questions = [
            {
                "question": "Why did the doctor carry a red pen?",
                "options": ["To draw blood!", "For emergency prescriptions!", "To correct the heartbeats!", "To highlight medical errors!"],
                "answer": "a"
            },
            {
                "question": "What do you call a doctor who fixes websites?",
                "options": ["A 'web surgeon'!", "A 'tech doc'!", "A 'site physician'!", "A 'digital healer'!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor join a band?",
                "options": ["To cure the 'blues'!", "To play 'sick' beats!", "To be the 'heartbeat' of the group!", "To diagnose 'music fever'!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite instrument?",
                "options": ["A 'thermometer' flute!", "A 'stethoscope' guitar!", "A 'syringe' saxophone!", "A 'scalpel' violin!"],
                "answer": "b"
            },
            {
                "question": "How do doctors keep their breath fresh?",
                "options": ["With 'anesthesia' mints!", "With 'minty' prescriptions!", "By brushing with 'medicinal' toothpaste!", "By 'surgical' mouthwash!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring a ladder to the hospital?",
                "options": ["To reach 'new heights' in treatment!", "For 'high-risk' surgeries!", "To climb 'patient care' levels!", "To 'elevate' their practice!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite game?",
                "options": ["'Operation' for steady hands!", "'Diagnosis' for quick thinking!", "'Check-up' for careful analysis!", "'Bandage' for speedy recovery!"],
                "answer": "a"
            },
            {
                "question": "Why do doctors love art?",
                "options": ["For 'patient' drawing!", "To create 'health' masterpieces!", "To 'paint' a picture of health!", "To express 'medical' creativity!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite type of music?",
                "options": ["'Rhythm and bruise'!", "'Patient beats'!", "'Healing harmonies'!", "'Prescription pop'!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay fit?",
                "options": ["With 'cardio' exercises!", "By 'operating' on their muscles!", "With 'healthy' routines!", "By 'medically' approved workouts!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor go to the beach?",
                "options": ["For a 'vitamin sea' boost!", "To 'diagnose' the waves!", "To 'prescribe' some sunshine!", "For 'therapeutic' sandcastles!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite vegetable?",
                "options": ["A 'heart' of palm!", "A 'carrot' for vision!", "A 'spinach' for strength!", "A 'broccoli' for bones!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor bring a map?",
                "options": ["To find the 'artery'!", "To locate 'patient' care!", "To navigate 'medical' issues!", "To explore 'health' territories!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dance move?",
                "options": ["The 'stethoscope' shuffle!", "The 'scalpel' slide!", "The 'heartbeat' hop!", "The 'prescription' pirouette!"],
                "answer": "c"
            },
            {
                "question": "Why do doctors make good DJs?",
                "options": ["They know how to 'mix' treatments!", "They can 'spin' good vibes!", "They keep the 'beat' alive!", "They have a 'healthy' playlist!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay organized?",
                "options": ["With 'prescription' planners!", "By using 'medical' charts!", "With 'clinical' schedules!", "By 'doctoring' their time!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go to school?",
                "options": ["For a 'degree' in patience!", "To learn 'new' treatments!", "For 'medical' education!", "To 'diagnose' learning!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite fruit?",
                "options": ["A 'healthy' apple!", "A 'citrus' cure!", "A 'banana' for energy!", "A 'berry' for antioxidants!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor take up gardening?",
                "options": ["To grow 'medicinal' herbs!", "To 'cultivate' health!", "For 'therapeutic' relaxation!", "To 'prescribe' fresh vegetables!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dessert?",
                "options": ["'Jello' for all ages!", "'Healthy' fruit salad!", "'Yogurt' for digestion!", "'Ice cream' for sore throats!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become a chef?",
                "options": ["To 'prescribe' delicious meals!", "To 'diagnose' food flavors!", "For 'healthy' cooking!", "To create 'nutritious' dishes!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite color?",
                "options": ["'Red' for blood!", "'Blue' for scrubs!", "'Green' for surgery!", "'White' for coats!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor get a dog?",
                "options": ["For 'pawsitive' vibes!", "To 'diagnose' pet health!", "For 'therapeutic' companionship!", "To 'prescribe' walks!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite holiday?",
                "options": ["'Health' Day!", "'National' Nurses Week!", "'World' Health Day!", "'Doctor's' Appreciation Day!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor join a gym?",
                "options": ["For 'cardio' health!", "To 'muscle' up!", "For 'stress' relief!", "To 'prescribe' fitness!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite drink?",
                "options": ["'Green' juice!", "'Vitamin' water!", "'Herbal' tea!", "'Prescription' smoothies!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become an astronaut?",
                "options": ["To 'explore' new health frontiers!", "For 'zero-gravity' medicine!", "To 'diagnose' space sickness!", "To 'prescribe' moon vitamins!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite TV show?",
                "options": ["'Health' Heroes!", "'Medical' Mysteries!", "'Surgical' Secrets!", "'Diagnosis' Detectives!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring an umbrella?",
                "options": ["For 'rainy' diagnoses!", "To 'shield' from patient sneezes!", "To stay 'dry' during rounds!", "For 'emergency' cover!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite type of joke?",
                "options": ["'Sick' humor!", "'Healthy' puns!", "'Medical' one-liners!", "'Prescription' laughs!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor wear sunglasses?",
                "options": ["To see patients in a better light!", "To avoid 'glare' from X-rays!", "For 'cool' diagnostics!", "To 'shade' eyes from bright screens!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite candy?",
                "options": ["'Jaw'breakers!", "'Lollipop' prescriptions!", "'Gummy' vitamins!", "'Medical' chocolates!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor bring a flashlight?",
                "options": ["For 'in-depth' examinations!", "To see in 'dark' alleys!", "For 'light-hearted' moments!", "To 'brighten' patient spirits!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite animal?",
                "options": ["A 'nurse' shark!", "A 'lab' retriever!", "A 'heart' worm!", "A 'medic' cat!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor carry a red pen?",
                "options": ["To draw blood!", "For emergency prescriptions!", "To correct the heartbeats!", "To highlight medical errors!"],
                "answer": "a"
            },
            {
                "question": "What do you call a doctor who fixes websites?",
                "options": ["A 'web surgeon'!", "A 'tech doc'!", "A 'site physician'!", "A 'digital healer'!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor join a band?",
                "options": ["To cure the 'blues'!", "To play 'sick' beats!", "To be the 'heartbeat' of the group!", "To diagnose 'music fever'!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite instrument?",
                "options": ["A 'thermometer' flute!", "A 'stethoscope' guitar!", "A 'syringe' saxophone!", "A 'scalpel' violin!"],
                "answer": "b"
            },
            {
                "question": "How do doctors keep their breath fresh?",
                "options": ["With 'anesthesia' mints!", "With 'minty' prescriptions!", "By brushing with 'medicinal' toothpaste!", "By 'surgical' mouthwash!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring a ladder to the hospital?",
                "options": ["To reach 'new heights' in treatment!", "For 'high-risk' surgeries!", "To climb 'patient care' levels!", "To 'elevate' their practice!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite game?",
                "options": ["'Operation' for steady hands!", "'Diagnosis' for quick thinking!", "'Check-up' for careful analysis!", "'Bandage' for speedy recovery!"],
                "answer": "a"
            },
            {
                "question": "Why do doctors love art?",
                "options": ["For 'patient' drawing!", "To create 'health' masterpieces!", "To 'paint' a picture of health!", "To express 'medical' creativity!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite type of music?",
                "options": ["'Rhythm and bruise'!", "'Patient beats'!", "'Healing harmonies'!", "'Prescription pop'!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay fit?",
                "options": ["With 'cardio' exercises!", "By 'operating' on their muscles!", "With 'healthy' routines!", "By 'medically' approved workouts!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor go to the beach?",
                "options": ["For a 'vitamin sea' boost!", "To 'diagnose' the waves!", "To 'prescribe' some sunshine!", "For 'therapeutic' sandcastles!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite vegetable?",
                "options": ["A 'heart' of palm!", "A 'carrot' for vision!", "A 'spinach' for strength!", "A 'broccoli' for bones!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor bring a map?",
                "options": ["To find the 'artery'!", "To locate 'patient' care!", "To navigate 'medical' issues!", "To explore 'health' territories!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dance move?",
                "options": ["The 'stethoscope' shuffle!", "The 'scalpel' slide!", "The 'heartbeat' hop!", "The 'prescription' pirouette!"],
                "answer": "c"
            },
            {
                "question": "Why do doctors make good DJs?",
                "options": ["They know how to 'mix' treatments!", "They can 'spin' good vibes!", "They keep the 'beat' alive!", "They have a 'healthy' playlist!"],
                "answer": "a"
            },
            {
                "question": "How do doctors stay organized?",
                "options": ["With 'prescription' planners!", "By using 'medical' charts!", "With 'clinical' schedules!", "By 'doctoring' their time!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor go to school?",
                "options": ["For a 'degree' in patience!", "To learn 'new' treatments!", "For 'medical' education!", "To 'diagnose' learning!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite fruit?",
                "options": ["A 'healthy' apple!", "A 'citrus' cure!", "A 'banana' for energy!", "A 'berry' for antioxidants!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor take up gardening?",
                "options": ["To grow 'medicinal' herbs!", "To 'cultivate' health!", "For 'therapeutic' relaxation!", "To 'prescribe' fresh vegetables!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite dessert?",
                "options": ["'Jello' for all ages!", "'Healthy' fruit salad!", "'Yogurt' for digestion!", "'Ice cream' for sore throats!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become a chef?",
                "options": ["To 'prescribe' delicious meals!", "To 'diagnose' food flavors!", "For 'healthy' cooking!", "To create 'nutritious' dishes!"],
                "answer": "c"
            },
            {
                "question": "What's a doctor's favorite color?",
                "options": ["'Red' for blood!", "'Blue' for scrubs!", "'Green' for surgery!", "'White' for coats!"],
                "answer": "b"
            },
            {
                "question": "Why did the doctor get a dog?",
                "options": ["For 'pawsitive' vibes!", "To 'diagnose' pet health!", "For 'therapeutic' companionship!", "To 'prescribe' walks!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite holiday?",
                "options": ["'Health' Day!", "'National' Nurses Week!", "'World' Health Day!", "'Doctor's' Appreciation Day!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor join a gym?",
                "options": ["For 'cardio' health!", "To 'muscle' up!", "For 'stress' relief!", "To 'prescribe' fitness!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite drink?",
                "options": ["'Green' juice!", "'Vitamin' water!", "'Herbal' tea!", "'Prescription' smoothies!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor become an astronaut?",
                "options": ["To 'explore' new health frontiers!", "For 'zero-gravity' medicine!", "To 'diagnose' space sickness!", "To 'prescribe' moon vitamins!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite TV show?",
                "options": ["'Health' Heroes!", "'Medical' Mysteries!", "'Surgical' Secrets!", "'Diagnosis' Detectives!"],
                "answer": "d"
            },
            {
                "question": "Why did the doctor bring an umbrella?",
                "options": ["For 'rainy' diagnoses!", "To 'shield' from patient sneezes!", "To stay 'dry' during rounds!", "For 'emergency' cover!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite type of joke?",
                "options": ["'Sick' humor!", "'Healthy' puns!", "'Medical' one-liners!", "'Prescription' laughs!"],
                "answer": "a"
            },
            {
                "question": "Why did the doctor wear sunglasses?",
                "options": ["To see patients in a better light!", "To avoid 'glare' from X-rays!", "For 'cool' diagnostics!", "To 'shade' eyes from bright screens!"],
                "answer": "a"
            },
            {
                "question": "What's a doctor's favorite candy?",
                "options": ["'Jaw'breakers!", "'Lollipop' prescriptions!", "'Gummy' vitamins!", "'Medical' chocolates!"],
                "answer": "c"
            },
            {
                "question": "Why did the doctor bring a flashlight?",
                "options": ["For 'in-depth' examinations!", "To see in 'dark' alleys!", "For 'light-hearted' moments!", "To 'brighten' patient spirits!"],
                "answer": "d"
            },
            {
                "question": "What's a doctor's favorite animal?",
                "options": ["A 'nurse' shark!", "A 'lab' retriever!", "A 'heart' worm!", "A 'medic' cat!"],
                "answer": "b"
            }
        ]


        return questions;
    }
});
