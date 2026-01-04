async function loadApp() {
    const container = document.getElementById('app-container');
    if (!container || typeof PERSON_DATA === 'undefined') return;

    // Rozpoznanie strony (sg.html = Strona Główna, inne = mDowód)
    const isMainPage = window.location.pathname.includes('sg.html');
    const templateName = isMainPage ? 'template2.html' : 'template1.html';

    try {
        const response = await fetch(`../main/templates/${templateName}`);
        if (!response.ok) throw new Error("Błąd pobierania szablonu");
        let html = await response.text();

        // Podmiana danych {{key}} na wartości z PERSON_DATA
        Object.keys(PERSON_DATA).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, PERSON_DATA[key]);
        });

        container.innerHTML = html;

        // POWIADOMIENIE: Szablon gotowy, można odpalać animacje
        document.dispatchEvent(new CustomEvent('templateRendered'));

    } catch (err) {
        console.error("Tech Error:", err);
    }
}

document.addEventListener('DOMContentLoaded', loadApp);