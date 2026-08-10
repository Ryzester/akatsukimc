let chosenPlan = "";
let chosenPrice = 0;
let chosenDays = 0;

const STRIPE_LINKS = {
    3: "https://buy.stripe.com/7sY00c7CKaEq39xbKj0ZW02",
    30: "https://buy.stripe.com/28EaEQ4qybIufWj15F0ZW01",
    90: "https://buy.stripe.com/6oU6oA7CKbIu8tRdSr0ZW00",
    180: "https://buy.stripe.com/9B6bIU4qydQCdOb6pZ0ZW03"
};

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});

function copyIP() {
  const el = document.getElementById("serverIp");
  if (!el) return;
  navigator.clipboard.writeText(el.textContent).then(() => {
    const btn = document.getElementById("copyBtn");
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = "コピーしました";
    setTimeout(() => btn.textContent = old, 1400);
  });
}

function selectPlan(name, price, days) {
  chosenPlan = name;
  chosenPrice = price;
  chosenDays = days;

  const box = document.getElementById("purchaseBox");
  if (!box) return;

  document.getElementById("selectedPlan").textContent = name;
  document.getElementById("selectedPrice").textContent = "¥" + price.toLocaleString("ja-JP");
  document.getElementById("selectedDays").textContent = "有効期間：" + days + "日間（JSTの日付単位）";

  box.classList.add("active");
  box.scrollIntoView({ behavior: "smooth", block: "center" });
}

function startCheckout() {
  const mcidInput = document.getElementById("mcid");
  const error = document.getElementById("error");
  const id = mcidInput ? mcidInput.value.trim() : "";

  if (!chosenPlan || chosenDays <= 0) {
    error.style.display = "block";
    error.textContent = "VIPプランを選択してください。";
    return;
  }

  if (!/^[A-Za-z0-9_]{3,16}$/.test(id)) {
    error.style.display = "block";
    error.textContent = "Minecraft Java版のIDを正しく入力してください。";
    return;
  }

  const baseUrl = STRIPE_LINKS[chosenDays];
  if (!baseUrl) {
    error.style.display = "block";
    error.textContent = "このプランの決済リンクが設定されていません。";
    return;
  }

  error.style.display = "none";
  const url = baseUrl + "?client_reference_id=" + encodeURIComponent(id);
  window.location.href = url;
}
