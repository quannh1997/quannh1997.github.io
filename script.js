// Countdown
const weddingDate = new Date("2025-12-20T00:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  if (diff <= 0) {
    document.getElementById("timer").innerText = "🎉 Đã đến ngày cưới rồi!";
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById("timer").innerText = `${d} ngày ${h}h ${m}m ${s}s`;
}, 1000);

// Gửi lời chúc lên Google Sheets
document.getElementById("wishForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const status = document.getElementById("status");

  try {
    const res = await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      method: "POST",
      body: data,
    });
    if (res.ok) {
      status.innerText = "Cảm ơn lời chúc của bạn 💖";
      form.reset();
    } else {
      status.innerText = "Gửi thất bại 😢";
    }
  } catch (err) {
    status.innerText = "Lỗi kết nối!";
  }
});
