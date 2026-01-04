document.addEventListener('templateRendered', () => {
    initClock();
    initAccordion();
    initCopyAction();
    initUpdateAction();
    initErrorModals();
});

// --- 1. ZEGAR ---
function initClock() {
    const updateTime = () => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
        const el = document.getElementById('current-time');
        if (el) el.innerText = timeStr;
    };
    setInterval(updateTime, 1000);
    updateTime();
}

// --- 2. ROZWIJANIE DANYCH ---
function initAccordion() {
    const header = document.getElementById('additional-data-header');
    if (header) {
        header.addEventListener('click', () => {
            const content = document.getElementById('additional-data-content');
            const arrow = document.getElementById('rotate-arrow');
            const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
            
            content.style.maxHeight = isOpen ? '0px' : content.scrollHeight + 'px';
            if (arrow) arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
        });
    }
}

// --- 3. KOPIOWANIE ---
function initCopyAction() {
    const btn = document.getElementById('btn-copy');
    if (btn) {
        btn.addEventListener('click', function() {
            const serialNum = document.getElementById('serial-number').innerText;
            navigator.clipboard.writeText(serialNum).then(() => {
                const originalText = this.innerText;
                this.innerText = 'Skopiowano';
                this.classList.replace('bg-blue-50', 'bg-green-50');
                this.classList.replace('text-blue-600', 'text-green-600');
                setTimeout(() => {
                    this.innerText = originalText;
                    this.classList.replace('bg-green-50', 'bg-blue-50');
                    this.classList.replace('text-green-600', 'text-blue-600');
                }, 2000);
            });
        });
    }
}

// --- 4. PRZYCISK AKTUALIZACJI ---
function initUpdateAction() {
    const btn = document.getElementById('btn-update');
    if (btn) {
        btn.addEventListener('click', function() {
            this.innerHTML = '<span class="animate-pulse">Aktualizowanie...</span>';
            setTimeout(() => {
                const now = new Date();
                const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
                const updateEl = document.getElementById('update-date');
                if (updateEl) updateEl.innerText = dateStr;
                this.innerText = 'Aktualizuj';
            }, 1500);
        });
    }
}

// --- 5. MODAL BŁĘDU ---
function initErrorModals() {
    const errorModal = document.getElementById('connection-error');
    const triggers = document.querySelectorAll('.trigger-error, .opacity-50');

    triggers.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            if (errorModal) {
                errorModal.classList.remove('hidden');
                setTimeout(() => errorModal.classList.add('hidden'), 2000);
            }
        });
    });
}