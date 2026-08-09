
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
const STRIPE_CHECKOUT_URL="https://buy.stripe.com/REPLACE_ME";

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

function startCheckout(){
  const id=document.getElementById("mcid").value.trim();
  const error=document.getElementById("error");
  if(!chosenPlan){error.style.display="block";error.textContent="VIP期間を選択してください。";return;}
  if(!/^[A-Za-z0-9_]{3,16}$/.test(id)){error.style.display="block";error.textContent="Minecraft IDを正しく入力してください。";return;}
  if(STRIPE_CHECKOUT_URL.includes("REPLACE_ME")){error.style.display="block";error.textContent="Stripeの決済URLがまだ設定されていません。";return;}
  error.style.display="none";
  const url=new URL(STRIPE_CHECKOUT_URL);
  url.searchParams.set("client_reference_id",id);
  url.searchParams.set("plan",chosenPlan);
  url.searchParams.set("days",chosenDays);
  location.href=url.toString();
}
