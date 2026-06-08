const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const contactForm = document.querySelector("[data-contact-form]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipient = contactForm.dataset.recipient;
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = `泰利達網站需求諮詢${name ? ` - ${name}` : ""}`;
  const body = [
    "泰利達貿易有限公司網站需求諮詢",
    "",
    `姓名 / 公司：${name || "未填寫"}`,
    `聯絡方式：${contact || "未填寫"}`,
    "",
    "需求簡述：",
    message || "未填寫",
    "",
    "此郵件由泰利達貿易有限公司網站表單產生。"
  ].join("\r\n");

  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

year.textContent = new Date().getFullYear();
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
