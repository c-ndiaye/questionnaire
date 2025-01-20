let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;
const pageHistory = [];

// Navigate to the next question or a specific question if jumpToQuestion is provided
function nextQuestion(jumpToQuestion) {
    const currentPageElement = pages[currentPage];
    let currentPageJumpedIndex = -1;

    // Check if jumpToQuestion has a parentElement
    if (jumpToQuestion && jumpToQuestion.parentElement) {
        currentPageJumpedIndex = Array.from(pages).indexOf(jumpToQuestion.parentElement);
    }

    // Validate the current page
    if (!validatePage(currentPageElement)) {
        return;
    }
    document.querySelector(".error").textContent = "";

    // Hide the current page and update history
    currentPageElement.style.display = 'none';
    pageHistory.push(currentPage);

    // Determine the next page to show
    if (currentPageJumpedIndex !== -1) {
        currentPage = currentPageJumpedIndex;
    } else {
        currentPage++;
    }

    // Show the next page if within bounds
    if (currentPage < pages.length) {
        pages[currentPage].style.display = 'block';
    }
}

// Navigate to the previous question
function prevQuestion() {
    if (currentPage > 0) {
        pages[currentPage].style.display = 'none';
        currentPage = pageHistory.pop() || currentPage - 1;
        pages[currentPage].style.display = 'block';
    }
}

// Validate the current page's inputs
function validatePage(page) {
    const inputs = page.querySelectorAll('input');
    let hasError = false;

    // Special case for page "q_a11"
    if (page.id === "q_a11") {
        const textInputs = page.querySelectorAll('input[type="text"]');
        if (Array.from(textInputs).some(input => input.value.trim() !== "")) {
            return true; // Allow passing to the next question if at least one text input is filled
        }
    }

    inputs.forEach(input => {
        if ((input.type === 'number' || input.type === 'text' || input.type === 'textarea') && !input.value.trim()) {
            hasError = true;
        }
        if (input.type === 'radio' || input.type === 'checkbox') {
            const groupName = input.name;
            const groupInputs = page.querySelectorAll(`input[name="${groupName}"]`);
            if (!Array.from(groupInputs).some(a => a.checked)) {
                hasError = true;
            }
        }
        if (input.type === 'checkbox') {
            if (!Array.from(inputs).some(a => a.checked)) {
                hasError = true;
            }
        }
    });

    if (hasError) {
        document.querySelector(".error").textContent = "Veuillez remplir tous les champs obligatoires.";
        return false;
    }

    return true;
}

// Start the questionnaire by showing the consent page
function startQuestionnaire() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('consent-page').style.display = 'block';
    currentPage = 1;
}

// Return to the home page with a confirmation prompt
function returnToHome() {
    if (confirm("En retournant à la page d'accueil, les données du questionnaire en cours ne seront pas sauvegardées. Voulez-vous continuer ?")) {
        document.querySelector(".error").textContent = "";
        pages[currentPage].style.display = 'none';
        currentPage = 0;
        pages[currentPage].style.display = 'block';
    }
}

// Submit the form data to the server
const serverUrl = 'http://localhost:3000';

function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('questionnaire-form'));
    const data = {
        interviewerName: formData.get('interviewerName'),
        dataSheetNumber: formData.get('dataSheetNumber'),
        createdAt: formData.get('createdAt'),
        data: {}
    };

    formData.forEach((value, key) => {
        if (key !== 'interviewerName' && key !== 'dataSheetNumber' && key !== 'createdAt') {
            if (data.data[key]) {
                if (Array.isArray(data.data[key])) {
                    data.data[key].push(value);
                } else {
                    data.data[key] = [data.data[key], value];
                }
            } else {
                data.data[key] = value;
            }
        }
    });

    fetch(`${serverUrl}/responses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert('Questionnaire soumis avec succès !');
        })
        .catch((error) => {
            alert('Une erreur s\'est produite lors de la soumission du questionnaire.');
        });
}

// Skip to a specific page by ID
function skipTo(pageId) {
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        pageHistory.push(currentPage);
        if (currentPage >= 0 && currentPage < pages.length) {
            pages[currentPage].style.display = 'none';
        }
        currentPage = Array.from(pages).indexOf(targetPage);
        targetPage.style.display = 'block';
    } else {
        console.error(`Page avec l'ID "${pageId}" introuvable.`);
    }
}

// Initialize the questionnaire on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const questionPages = document.querySelectorAll('.question-page');
    pages.forEach((page, index) => {
        if (index !== 0) {
            page.style.display = 'none';
        }
    });

    const form = document.getElementById('questionnaire-form');
    if (form) {
        form.addEventListener('submit', submitForm);
    } else {
        console.error('Le formulaire avec l\'ID "questionnaire-form" est introuvable.');
    }
});

// Show the next page by ID
function showNext(pageId) {
    if (typeof pageId === 'string') {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            pages[currentPage].style.display = 'none';
            currentPage = Array.from(pages).indexOf(targetPage);
            targetPage.style.display = 'block';
        } else {
            console.error(`Page with ID "${pageId}" not found.`);
        }
    }
}