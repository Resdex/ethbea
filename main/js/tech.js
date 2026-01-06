/**
 * Plik: main/js/tech.js
 * Odpowiada za:
 * 1. Weryfikację sesji logowania.
 * 2. Ładowanie szablonów HTML.
 * 3. Podmianę danych z info.js (PERSON_DATA).
 * 4. Naprawę ścieżek do grafik i CSS.
 * 5. Powiadomienia Discord przez API bota (Czysta konsola).
 */

async function loadApp() {
    const container = document.getElementById('app-container');
    
    if (!container || typeof PERSON_DATA === 'undefined') {
        return;
    }

    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = '../index.html';
        return;
    }

    const isMainPage = window.location.pathname.includes('sg.html');
    const templateName = isMainPage ? 'template2.html' : 'template1.html';
    const pageTitle = isMainPage ? "Strona Główna" : "mDowód";

    try {
        const response = await fetch(`../main/templates/${templateName}`);
        if (!response.ok) throw new Error(`Błąd pobierania szablonu: ${templateName}`);
        
        let html = await response.text();

        // 1. Podmiana danych {{klucz}} na wartości z info.js
        Object.keys(PERSON_DATA).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, PERSON_DATA[key]);
        });

        // 2. NAPRAWA ŚCIEŻEK
        html = html.replace(/src="main\//g, 'src="../main/');
        html = html.replace(/href="main\//g, 'href="../main/');
        html = html.replace(/url\(main\//g, 'url(../main/');
        html = html.replace(/url\(['"]main\//g, (match) => match.replace('main/', '../main/'));

        container.innerHTML = html;
        
        document.dispatchEvent(new CustomEvent('templateRendered'));

        // --- LOGOWANIE DO DISCORDA + IP (BEZ LOGÓW W KONSOLI) ---
        const sessionKey = `logged_${pageTitle}`;
        if (!sessionStorage.getItem(sessionKey)) {
            
            let userIP = "Nieznane";
            try {
                const ipRes = await fetch('https://api.ipify.org?format=json');
                const ipData = await ipRes.json();
                userIP = ipData.ip;
            } catch (e) { 
                // Ciche przechwycenie błędu
            }

            fetch('https://discord-api-jqj5.onrender.com/log-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: PERSON_DATA.name,
                    surname: PERSON_DATA.surname,
                    page: pageTitle,
                    ip: userIP,
                    timestamp: new Date().toLocaleString('pl-PL')
                })
            })
            .then(() => {
                sessionStorage.setItem(sessionKey, 'true');
            })
            .catch(() => {
                // Ciche przechwycenie błędu
            });
        }

    } catch (err) {
        container.innerHTML = `
            <div style="color:white;text-align:center;padding:50px;font-family:sans-serif;background:#121212;height:100vh;">
                <h2 style="color: #ff4d4d;">Błąd krytyczny aplikacji</h2>
                <p>Wystąpił nieoczekiwany błąd podczas ładowania danych.</p>
                <button onclick="location.reload()" style="background:#3498db;border:none;padding:12px 24px;color:white;border-radius:25px;cursor:pointer;margin-top:20px;">Spróbuj ponownie</button>
            </div>`;
    }
}

document.addEventListener('DOMContentLoaded', loadApp);