const pages = document.querySelectorAll('.page');
let currentPage = 0;
const confettiContainer = document.querySelector('.confetti-container');

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('page')) {
        if (e.target.classList.contains('cover')) {
            pages[currentPage].style.transform = `rotateY(-180deg)`;
            currentPage++;
        } else if (e.target.classList.contains('back-cover')) {
            pages[currentPage - 1].style.transform = `rotateY(0deg)`;
            currentPage--;
        } else if (currentPage > 0 && currentPage < pages.length - 1) {
            if (e.pageX > window.innerWidth / 2) {
                pages[currentPage].style.transform = `rotateY(-180deg)`;
                currentPage++;
            } else {
                pages[currentPage - 1].style.transform = `rotateY(0deg)`;
                currentPage--;
            }
        }

        // 마지막 페이지까지 넘겼을 때 종이가루 효과 트리거
        if (currentPage === pages.length - 1) {
            triggerConfetti();
        }
    }
});

// 종이가루 생성 함수
function triggerConfetti() {
    confettiContainer.classList.remove('hidden');
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        // 색상의 채도와 밝기를 조정하여 더 진한 색상으로 변경
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`; // 밝기 40%로 낮춤
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);

        // 애니메이션 끝나면 종이가루 제거
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // 일정 시간 후 종이가루 컨테이너 다시 숨기기
    setTimeout(() => {
        confettiContainer.classList.add('hidden');
    }, 3000); // 3초 후 숨기기
}
