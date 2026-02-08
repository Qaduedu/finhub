// FinHub: utilidades financeiras em JS puro.
// Sem dependências. Rápido. Simples. Como a web deveria ter continuado sendo.

export function $(sel, root=document){ return root.querySelector(sel); }
export function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

export function toNumberBR(v){
  if (v === null || v === undefined) return NaN;
  const s = String(v).trim()
    .replace(/\./g, "")       // milhar
    .replace(",", ".")        // decimal
    .replace(/[^\d.-]/g, ""); // moeda etc
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export function formatBRL(n){
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("pt-BR", { style:"currency", currency:"BRL" });
}

export function formatPct(n){
  if (!Number.isFinite(n)) return "—";
  return `${(n*100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;
}

export function clamp(n, min, max){
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

export function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  $all(".pill").forEach(a=>{
    const href = a.getAttribute("href");
    if (!href) return;
    const same = href.endsWith(path);
    if (same) a.classList.add("active");
  });
}

export function adPlaceholders(){
  // Aqui você não "fabrica clique". Você só define slots.
  // AdSense e afins precisam de conteúdo real e navegação natural.
  // Se você tentar ser esperto, as plataformas são mais espertas.
}

export function onCopyLink(btnSel, textProvider){
  const btn = $(btnSel);
  if (!btn) return;
  btn.addEventListener("click", async ()=>{
    try{
      const txt = typeof textProvider === "function" ? textProvider() : String(textProvider);
      await navigator.clipboard.writeText(txt);
      btn.textContent = "Link copiado ✓";
      setTimeout(()=> btn.textContent = "Copiar link", 1400);
    }catch{
      // clipboard pode falhar em alguns contextos; vida que segue
      alert("Não deu pra copiar automaticamente. Copie pelo navegador.");
    }
  });
}
