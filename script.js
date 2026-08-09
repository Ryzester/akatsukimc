
document.addEventListener("DOMContentLoaded",()=>{
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
});

function copyIP(){
  const el=document.getElementById("serverIp");
  if(!el)return;
  navigator.clipboard.writeText(el.textContent).then(()=>{
    const b=document.getElementById("copyBtn");
    if(b){const old=b.textContent;b.textContent="コピーしました";setTimeout(()=>b.textContent=old,1400);}
  });
}

let chosenPlan="",chosenPrice=0,chosenDays=0;
const STRIPE_LINKS = {
    3: "https://buy.stripe.com/test_3cI8wI1dLemb99IdL79bO00",
    30: "https://buy.stripe.com/test_8x2bIU5u17XNeu27mJ9bO01",
    90: "https://buy.stripe.com/test_eVq8wI09H91R71A5eB9bO02",
    180: "https://buy.stripe.com/test_00weV609H2Dt99I6iF9bO03"
};

function selectPlan(name,price,days){
  chosenPlan=name;chosenPrice=price;chosenDays=days;
  const plan=document.getElementById("selectedPlan");
  if(!plan)return;
  plan.textContent=name;
  document.getElementById("selectedPrice").textContent="¥"+price.toLocaleString();
  document.getElementById("selectedDays").textContent="有効期間："+days+"日間";
  const box=document.getElementById("purchaseBox");
  box.classList.add("active");
  box.scrollIntoView({behavior:"smooth",block:"center"});
}

function startCheckout() {

    const id =
        document.getElementById("mcid")
            .value
            .trim();

    const error =
        document.getElementById("error");

    if (!chosenPlan || chosenDays <= 0) {
        error.style.display = "block";
        error.textContent =
            "VIPプランを選択してください。";
        return;
    }

    if (!/^[A-Za-z0-9_]{3,16}$/.test(id)) {
        error.style.display = "block";
        error.textContent =
            "Minecraft IDを正しく入力してください。";
        return;
    }

    const baseUrl =
        STRIPE_LINKS[chosenDays];

    if (!baseUrl) {
        error.style.display = "block";
        error.textContent =
            "このプランの決済リンクが設定されていません。";
        return;
    }

    error.style.display = "none";

    const url =
        baseUrl
        + "?client_reference_id="
        + encodeURIComponent(id);

    window.location.href = url;
}
