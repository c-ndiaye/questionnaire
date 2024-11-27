let currentPage = 0;
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;
const pageHistory = [];

function nextQuestion(jumpToQuestion) {
    const currentPageElement = pages[currentPage];
    console.log('currentpageelement', currentPageElement);
    let currentPageJumpedIndex = -1;

    if (jumpToQuestion instanceof HTMLElement) {
        for (let i = 0; i < totalPages; i++) {
            if (pages[i] === jumpToQuestion.parentElement) {
                currentPageJumpedIndex = i;
                break;
            }
        }
    }

    if (!validatePage(currentPageElement)) {
        return;
    }
    document.querySelector(".error").innerHTML = "";

    currentPageElement.style.display = 'none';
    pageHistory.push(currentPage);

    if (currentPageJumpedIndex !== -1) {
        currentPage = currentPageJumpedIndex;
        pages[currentPage].style.display = 'block';
    } else {
        currentPage++;
        if (currentPage < totalPages) {
            pages[currentPage].style.display = 'block';
        }
    }
}

function prevQuestion() {    
    if (currentPage > 0) {
        pages[currentPage].style.display = 'none';
        if (pageHistory.length > 0) {
            console.log('pageHistory.slice: ', pageHistory.slice(-1)[0])
            console.log('pageHistory: ', pageHistory);
            currentPage = pageHistory.slice(-1)[0];
            pageHistory.pop();
            pages[pageHistory[pageHistory.length-1]].style.display = 'block';
        } else {
            currentPage--;
            pages[currentPage].style.display = 'block';
        };
    }
}

function validatePage(page) {
    const inputs = page.querySelectorAll('input');
    let hasError = false;
    
    if (inputs !==  undefined) {
        for (const input of inputs) {
            if ((input.type == ('number' || 'text') || input.type == 'textarea') && !Array.from(inputs).some(a => a.value)) {
                hasError = true;
            } else if ((input.type == 'radio' && !Array.from(inputs).some(a => a.checked)) || (input.type == 'checkbox' && Array.from(inputs).some(a => a.checked) == false)) {
                hasError = true;
            } else if (!Array.from(inputs).some(a => a.value)) {
                hasError = true;
            }
        }
    } 
    
    if (hasError) {
        //alert('Veuillez remplir tous les champs obligatoires.');
        document.querySelector(".error").innerHTML = "<span style='color:red'>Veuillez remplir tous les champs obligatoires.</span>";
        return false;
    }

    return true;
}

function startQuestionnaire() {
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('consent-page').style.display = 'block';
    currentPage = 1;
}

function returnToHome() {
    if (confirm("En retournant à la page d'accueil, les données du questionnaire en cours ne seront pas sauvegardées. Voulez-vous continuer ?")) {
        document.querySelector(".error").innerHTML = "";
        pages[currentPage].style.display = 'none';
        currentPage = 0;
        if (currentPage < totalPages) {
            pages[currentPage].style.display = 'block';
        }
    }
}

function submitForm(event) {
    const formData = new FormData(document.getElementById('questionnaire-form'));
    console.log('formData: ', formData);

    // Simuler l'envoi des données (exemple avec fetch API)
    // fetch('/submit', {
    //     method: 'POST',
    //     body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Merci pour vos réponses !');
    //     // Réinitialiser le formulaire après soumission
    //     document.getElementById('questionnaire-form').reset();
    //     currentPage = 0;
    //     pages.forEach(page => page.style.display = 'none');
    //     document.getElementById('home-page').style.display = 'block';  // Retour à la page d'accueil
    // })
    // .catch(error => {
    //     alert('Une erreur est survenue lors de l\'envoi.');
    // });
}

function skipTo(pageId) {
    // Récupérer toutes les pages
    console.log('pageId', pageId);
    for (let i = 0; i < totalPages; i++) {
        if (document.querySelectorAll('.page')[i].id === pageId) {
            currentPage = i;
            break;
        }
    }
    const pages = document.querySelectorAll('.question-page');

    // document.getElementById(pageId).style.display = 'none';
    pageHistory.push(currentPage);

    // Masquer toutes les pages
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Afficher la page ciblée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';

        // Mettre à jour currentPage avec l'index de la page ciblée
        // currentPage = Array.from(pages).indexOf(targetPage);
        // console.log('currentpage',currentPage)
        // if (currentPage === -1) {
        //     console.error(`Page avec l'ID "${pageId}" introuvable dans la liste des pages.`);
        // }
    } else {
        console.error(`Page avec l'ID "${pageId}" introuvable.`);
    }
}



document.addEventListener('DOMContentLoaded', () => {
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
