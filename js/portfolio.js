document.addEventListener("DOMContentLoaded", () => {

    // 상단메뉴 배경색 조절
    function adjustNavBackground() {
        const nav = document.querySelector('nav');
        const topElement = document.getElementById('top');
        const change = topElement ? topElement.offsetHeight - 100 : 0;

        function updateNavBackground() {
            if (window.scrollY >= change) {
                nav.classList.add('act');
            } else {
                nav.classList.remove('act');
            }
        }

        if (window.innerWidth <= 600) {
            nav.classList.add('act');
        } else {
            window.removeEventListener('scroll', updateNavBackground);
            window.addEventListener('scroll', updateNavBackground);
            updateNavBackground();
        }
    }

    window.addEventListener('load', adjustNavBackground);
    window.addEventListener('resize', adjustNavBackground);

    // 타자치는 효과
    const typingText = "안녕하세요.\n홍길동의 포트폴리오입니다.";
    const typingElement = document.querySelector("#typing");
    let index = 0;
    let displayedText = "";

    function type() {
        if (index < typingText.length) {
            displayedText += typingText[index];
            typingElement.innerText = displayedText;
            index++;
            setTimeout(type, 200);
        }
    }

    type();

    // 상단 메뉴 호버 활성화 유지
    const menuLinks = document.querySelectorAll("#menu a");

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(item => item.classList.remove('act'));
            link.classList.add('act');
        });
    });

    // 콘텐츠의 top값을 절대값으로 얻어온다
    function updateScrollPositions() {
        return {
            homeTop: document.body.getBoundingClientRect().top + window.scrollY,
            aboutTop: document.querySelector("#about").getBoundingClientRect().top + window.scrollY,
            port1Top: document.querySelector("#port1").getBoundingClientRect().top + window.scrollY - 400,
            port2Top: document.querySelector("#port2").getBoundingClientRect().top + window.scrollY - 400,
            port3Top: document.querySelector("#port3").getBoundingClientRect().top + window.scrollY - 400,
            eventTop: document.querySelector("#event").getBoundingClientRect().top + window.scrollY - 400,
            contactTop: document.querySelector("#contact").getBoundingClientRect().top + window.scrollY - 200
        };
    }

    let position = 0;

    // Progress 애니메이션 함수
    function animateProgress(selector, value, duration = 500) {
        const progress = document.querySelector(selector);
        if (progress) {
            const startValue = parseFloat(progress.value);
            const startTime = performance.now();

            function updateProgress(timestamp) {
                const elapsed = timestamp - startTime;
                const progressValue = Math.min(startValue + (value - startValue) * (elapsed / duration), value);
                progress.value = progressValue;

                if (elapsed < duration) {
                    requestAnimationFrame(updateProgress);
                } else {
                    progress.value = value;
                }
            }

            requestAnimationFrame(updateProgress);
        }
    }

    function handleScroll() {
        const { homeTop, aboutTop, port1Top, port2Top, port3Top, eventTop, contactTop } = updateScrollPositions();
        const scrollTop = window.scrollY;

        if (scrollTop >= homeTop && scrollTop < aboutTop) {
            position = 0;
        }
        if (scrollTop >= aboutTop && scrollTop < port1Top) {
            // About에서 오른쪽 "skill" bar 애니메이션
            animateProgress("#photo progress", 90, 1000);
            animateProgress("#html progress", 80, 1200);
            animateProgress("#script progress", 70, 1400);
            animateProgress("#oven progress", 80, 1600);
            position = 1;
        }
        if (scrollTop >= port1Top) {
            document.querySelector("#port1").classList.add("act");
            position = 2;
        }
        if (scrollTop >= port2Top) {
            document.querySelector("#port2").classList.add("act");
        }
        if (scrollTop >= port3Top) {
            document.querySelector("#port3").classList.add("act");
        }
        if (scrollTop >= eventTop && scrollTop < contactTop) {
            position = 3;
        }
        if (scrollTop >= contactTop) {
            position = 4;
        }

        const menuLinks = document.querySelectorAll("#menu a");
        menuLinks.forEach((link, index) => {
            if (index === position) {
                link.classList.add('act');
            } else {
                link.classList.remove('act');
            }
        });
    }

    function setupEventHandlers() {
        window.addEventListener('scroll', handleScroll);

        document.querySelectorAll("#event > div > div").forEach(div => {
            div.addEventListener('click', () => {
                const img = div.querySelector("img");
                const thumbSrc = img.getAttribute("src");
                const bigImgSrc = thumbSrc.replace('.', '_big.');
                document.querySelector("#popup img").setAttribute("src", bigImgSrc);
                document.querySelector("#popup h3").textContent = img.getAttribute("alt");
                document.querySelector("#popup").style.display = "block";
            });
        });

        document.querySelector("#popup").addEventListener('click', () => {
            document.querySelector("#popup").style.display = "none";
        });
    }

    adjustNavBackground();
    type();
    setupEventHandlers();
});
