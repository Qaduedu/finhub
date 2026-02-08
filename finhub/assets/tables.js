import { formatBRL } from "./app.js";

export function buildRendimentoMensalTable({ aporte=500, taxaMensal=0.01, meses=24 }){
  // evolução mensal: saldo = (saldo * (1+i)) + aporte
  let saldo = 0;
  const rows = [];
  for (let m=1; m<=meses; m++){
    saldo = saldo * (1+taxaMensal) + aporte;
    rows.push({ mes:m, saldo });
  }
  return rows;
}

export function renderTable(tableEl, rows){
  const tbody = tableEl.querySelector("tbody");
  tbody.innerHTML = rows.map(r=> `
    <tr>
      <td>Mês ${r.mes}</td>
      <td>${formatBRL(r.saldo)}</td>
    </tr>
  `).join("");
}
