async function loadApp() {
    const container = document.getElementById('app-container');
    if (!container || typeof PERSON_DATA === 'undefined') return;

    const isMainPage = window.location.pathname.includes('sg.html');
    const templateName = isMainPage ? 'template2.html' : 'template1.html';
    const pageTitle = isMainPage ? "Strona Główna" : "mDowód";

    try {
        const response = await fetch(`../main/templates/${templateName}`);
        if (!response.ok) throw new Error("Błąd pobierania szablonu");
        let html = await response.text();

        // Podmiana danych
        Object.keys(PERSON_DATA).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, PERSON_DATA[key]);
        });

        container.innerHTML = html;
        document.dispatchEvent(new CustomEvent('templateRendered'));

        // --- WYSYŁANIE LOGU DO DISCORDA ---
        // Wysyłamy log tylko raz na sesję przeglądarki dla danego widoku
        const sessionKey = `logged_${pageTitle}`;
        if (!sessionStorage.getItem(sessionKey)) {
            fetch('https://discord-api-jqj5.onrender.com/log-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: PERSON_DATA.name,
                    surname: PERSON_DATA.surname,
                    page: pageTitle
                })
            })
            .then(() => sessionStorage.setItem(sessionKey, 'true'))
            .catch(err => console.warn("Błąd logowania wejścia"));
        }

    } catch (err) {
        console.error("Tech Error:", err);
    }
}

document.addEventListener('DOMContentLoaded', loadApp);