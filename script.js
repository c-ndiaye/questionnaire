let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');

function showPage(index) {
    pages.forEach((page, i) => {
        page.style.display = i === index ? 'block' : 'none';
    });
}

function startQuestionnaire() {
    currentPageIndex = 1;
    showPage(currentPageIndex);
}

function nextQuestion() {
    if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
        showPage(currentPageIndex);
    }
}

function prevQuestion() {
    if (currentPageIndex > 1) {
        currentPageIndex--;
        showPage(currentPageIndex);
    }
}

function finishQuestionnaire() {
    currentPageIndex = pages.length - 1;
    showPage(currentPageIndex);
}

function returnToHome() {
    if (confirm("En retournant à la page d'accueil, les données du questionnaire en cours ne seront pas sauvegardées. Voulez-vous continuer ?")) {
        currentPageIndex = 0;
        showPage(currentPageIndex);
    }
}

// Initialisation
showPage(currentPageIndex);
