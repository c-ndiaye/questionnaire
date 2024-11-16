let currentPageIndex = 0;
const pages = document.querySelectorAll('.page');

function showPage(index) {
    pages.forEach((page, i) => {
        page.style.display = i === index ? 'block' : 'none';
    });

    // let currentPage = pages[currentPageIndex];
    // let inputs = currentPage.querySelectorAll('input');

    // for (let input of inputs) {
    //     if (input.type === 'text' || input.type === 'number') {
    //         if (input.value.trim() === '') {
    //             input.style.borderColor =  "black";
    //             return false;
    //         }
    //     } else if (input.type === 'radio') {
    //         let radios = currentPage.querySelectorAll('input[type="radio"]');
    //         let radioChecked = Array.from(radios).some(radio => radio.checked);
    //         if (!radioChecked) {
    //             input.style.borderColor = "black";
    //             return false;
    //         }
    //     }
    // }

}

function startQuestionnaire() {
    currentPageIndex = 1;
    showPage(currentPageIndex);
}

function nextQuestion(e, number) {    
    if (!validateCurrentPage()) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }


    if (e !== undefined) {
        if (number === undefined) number = 1;
        console.log(e); // e.length == null ou undefined mais il devrait pas passer la dedans
        for (var i = 0, length = e.length; i < length; i++) {
            if (e[i].defaultValue == 'Non' || e[i].defaultValue == 'Ne sait pas') {
                if (currentPageIndex < pages.length - 1) {
                    currentPageIndex += number;
                    showPage(currentPageIndex);
                }
            }
            if (e[i].checked) {
                break;
            }
        }
    }
        

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

function collectResponses() {
    const form = document.getElementById('questionnaire-form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });
    return data;
}

function finishQuestionnaire() {
    currentPageIndex = pages.length - 1;
    showPage(currentPageIndex);

    const responses = collectResponses();
    console.log(responses);

    // fetch('https://votre-serveur.com/submit', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(responses)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Réponses envoyées avec succès:', data);
    //     alert("Merci ! Vos réponses ont été soumises.");
    // })
    // .catch(error => {
    //     console.error('Erreur lors de l\'envoi des réponses:', error);
    //     alert("Une erreur est survenue lors de l'envoi des réponses. Veuillez réessayer.");
    // });
}

function returnToHome() {
    if (confirm("En retournant à la page d'accueil, les données du questionnaire en cours ne seront pas sauvegardées. Voulez-vous continuer ?")) {
        currentPageIndex = 0;
        showPage(currentPageIndex);
    }
}

function validateCurrentPage() {
    let currentPage = pages[currentPageIndex];
    let inputs = currentPage.querySelectorAll('input');

    for (let input of inputs) {
        if (input.type === 'text' || input.type === 'number') {
            if (input.value.trim() === '') {
                input.style.borderColor = "red";
                return false;
            }
        } else if (input.type === 'radio') {
            let radios = currentPage.querySelectorAll('input[type="radio"]');
            let radioChecked = Array.from(radios).some(radio => radio.checked);
            if (!radioChecked) {
                input.style.borderColor = "red";
                return false;
            }
        }
    }
    return true;
}


// Initialisation
showPage(currentPageIndex);
