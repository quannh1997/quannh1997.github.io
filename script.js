document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ĐỒNG HỒ ĐẾM NGƯỢC ---
    // !!! THAY ĐỔI NGÀY CƯỚI CỦA BẠN TẠI ĐÂY !!!
    const weddingDate = new Date("Dec 21, 2025 11:00:00").getTime(); 
    

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Tính toán
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Hiển thị
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

        // Khi hết giờ
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "<h2>Chúc Mừng Hạnh Phúc!</h2>";
        }
    }, 1000);

    // --- 2. BẬT/TẮT NHẠC ---
    const music = document.getElementById("wedding-music");
    const musicToggle = document.getElementById("music-toggle");
    let isPlaying = false;
    
    // Tự động bật nhạc khi người dùng tương tác lần đầu
    document.body.addEventListener('click', playMusicOnce, { once: true });
    document.body.addEventListener('scroll', playMusicOnce, { once: true });

    function playMusicOnce() {
        if (!isPlaying) {
            music.play();
            isPlaying = true;
            musicToggle.innerText = "🔇";
        }
    }

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

    // --- 3. GỬI LỜI CHÚC (Guestbook) ---
    const guestbookForm = document.getElementById("guestbook-form");
    guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn form gửi đi thật
        
        const name = document.getElementById("guest-name").value;
        const message = document.getElementById("guest-message").value;

        // **LƯU Ý QUAN TRỌNG:**
        // Việc lưu lời chúc vĩnh viễn cần có Máy chủ (Backend) hoặc dịch vụ bên thứ 3 (như Google Sheets, Firebase, Formspree...).
        // Code bên dưới chỉ là MÔ PHỎNG: nó thêm lời chúc vào trang nhưng sẽ MẤT khi tải lại.

        // Mô phỏng việc thêm lời chúc vào danh sách
        const wishesList = document.querySelector(".wishes-list");
        const newWish = document.createElement("div");
        newWish.className = "wish-item";
        newWish.innerHTML = `<strong>${name}:</strong><p>${message}</p>`;
        
        // Thêm lời chúc mới lên đầu
        wishesList.insertBefore(newWish, wishesList.children[1]); 

        // Xóa nội dung trong form
        guestbookForm.reset();

        // Thông báo (bạn có thể dùng alert hoặc một pop-up đẹp hơn)
        alert("Cảm ơn bạn đã gửi lời chúc!");
    });

});
