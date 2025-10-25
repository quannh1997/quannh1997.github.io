document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HIỆU ỨNG TRÁI TIM BAY ---
    const heartsContainer = document.querySelector('.hearts-container');
    if (heartsContainer) {
        for (let i = 0; i < 20; i++) { // Tạo 20 trái tim
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerText = '❤️';
            
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDelay = `${Math.random() * 10}s`;
            heart.style.fontSize = `${Math.random() * 0.5 + 0.5}rem`; // Kích thước ngẫu nhiên
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // Tốc độ ngẫu nhiên
            
            heartsContainer.appendChild(heart);
        }
    }

    // --- 2. ĐỒNG HỒ ĐẾM NGƯỢC ---
    // !!! THAY ĐỔI NGÀY CƯỚI CỦA BẠN TẠI ĐÂY !!!
    const weddingDate = new Date("Dec 25, 2025 18:00:00").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Hiển thị
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<h2>Chúc Mừng Hạnh Phúc!</h2>";
        }
    }, 1000);

    // --- 3. BẬT/TẮT NHẠC ---
    const music = document.getElementById("wedding-music");
    const musicToggle = document.getElementById("music-toggle");
    let isPlaying = false;

    if (music && musicToggle) {
        const playMusicOnce = () => {
            if (!isPlaying) {
                music.play().catch(error => console.log("Lỗi tự động phát nhạc:", error));
                isPlaying = true;
                musicToggle.innerText = "🔇";
            }
        };
        // Tự động bật nhạc khi người dùng tương tác
        document.body.addEventListener('click', playMusicOnce, { once: true });
        document.body.addEventListener('scroll', playMusicOnce, { once: true });

        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                music.pause();
                musicToggle.innerText = "🎵";
            } else {
                music.play();
                musicToggle.innerText = "🔇";
            }
            isPlaying = !isPlaying;
        });
    }

    // --- 4. HIỆU ỨNG FADE IN KHI CUỘN ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. TABS CÔ DÂU / CHÚ RỂ ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const brideGroomImage = document.getElementById('bride-groom-image');
    
    // Đặt sẵn đường dẫn ảnh (bạn phải thay cho đúng)
    const images = {
        bride: 'images/bride.jpg',
        groom: 'images/groom.jpg'
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Xóa active của tất cả
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm active cho nút được click
            button.classList.add('active');
            
            // Đổi ảnh
            const targetImage = button.getAttribute('data-target'); // 'bride' or 'groom'
            if (brideGroomImage && images[targetImage]) {
                brideGroomImage.src = images[targetImage];
            }
        });
    });

    // --- 6. XỬ LÝ FORM RSVP ---
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Tương tự mẫu trước, việc gửi form cần backend.
            // Chúng ta chỉ mô phỏng là đã gửi thành công.
            alert("Cảm ơn bạn đã xác nhận!");
            rsvpForm.reset();
        });
    }

});