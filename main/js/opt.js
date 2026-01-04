    document.addEventListener('DOMContentLoaded', () => {
    // --- 6. ZAAWANSOWANA OCHRONA (ZOPTYMALIZOWANA POD IPHONE) ---

    // Blokada prawego przycisku
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Blokada klawiszy i PrintScreen
    document.addEventListener('keydown', (e) => {
        if (e.key === "PrintScreen") {
            document.body.style.display = 'none';
            navigator.clipboard.writeText(""); 
            alert("Robienie zrzutów ekranu jest zablokowane.");
            setTimeout(() => { document.body.style.display = 'block'; }, 1000);
        }

        if (e.key === "F12" || (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) || (e.ctrlKey && ["U", "S", "P"].includes(e.key))) {
            e.preventDefault();
            return false;
        }
    });

    // Blur przy utracie fokusu
    window.addEventListener('blur', () => { document.body.style.filter = 'blur(15px)'; });
    window.addEventListener('focus', () => { document.body.style.filter = 'none'; });

    // Wykrywanie DevTools oparte na czasie (poprawka dla iOS)
    const checkDevTools = () => {
        const start = Date.now();
        debugger; 
        const end = Date.now();
        
        // Na iPhone bez Maca debugger się nie aktywuje, więc (end - start) będzie bliskie 0.
        // Jeśli zajmie to więcej niż 100ms, znaczy że konsola jest podpięta i aktywna.
        if (end - start > 100) {
            document.body.innerHTML = `
                <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; font-family:sans-serif; text-align:center; background:#f5f6fb; color:#1a1e22; padding:20px;">
                    <h1 style="font-size:24px; margin-bottom:10px;">Dostęp zabroniony</h1>
                    <p style="font-size:16px; opacity:0.7;">Wykryto narzędzia deweloperskie. Zamknij je i odśwież stronę.</p>
                </div>`;
        }
    };

    // Interwał sprawdzający - tylko jeśli urządzenie nie udaje dotyku (opcjonalnie)
    setInterval(checkDevTools, 2000);

    // Czyszczenie konsoli
    setInterval(() => {
        console.clear();
        console.log("%cSTOP!", "color:red; font-size:40px; font-weight:bold;");
    }, 1000);
});