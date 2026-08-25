document.addEventListener("DOMContentLoaded",()=>{

const mode=document.getElementById("mode");
if(mode){
 mode.onclick=()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  mode.textContent=dark?"☀":"☼";
  localStorage.setItem("verdeVivoMode",dark?"dark":"light");
 };
 if(localStorage.getItem("verdeVivoMode")==="dark"){
  document.body.classList.add("dark");
  mode.textContent="☀";
 }
}

const glow=document.querySelector(".cursor-glow");
document.addEventListener("mousemove",e=>{
 if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";}
});

const reveal=document.querySelectorAll(".reveal");
if("IntersectionObserver" in window){
 const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");});
 },{threshold:.12});
 reveal.forEach(e=>obs.observe(e));
}else reveal.forEach(e=>e.classList.add("visible"));

const points={
 solo:["Solo vivo","Um solo saudável é uma das principais bases de uma produção duradoura.","Cuidar do solo hoje significa aumentar as possibilidades de produção no futuro."],
 agua:["Água protegida","Nascentes, rios e áreas de preservação precisam estar integrados ao planejamento da propriedade.","Toda produção depende da água — protegê-la é proteger o próprio campo."],
 dados:["Dados no campo","Sensores, mapas, drones e agricultura de precisão ajudam o produtor a tomar decisões mais eficientes.","Tecnologia amplia a capacidade de decisão."],
 vida:["Biodiversidade","Vegetação nativa, polinizadores e diferentes espécies contribuem para o equilíbrio dos ecossistemas.","Mais diversidade significa mais possibilidades de equilíbrio."]
};

document.querySelectorAll(".hotspot").forEach(b=>b.onclick=()=>{
 const p=points[b.dataset.point]; if(!p)return;
 document.querySelectorAll(".hotspot").forEach(x=>x.classList.remove("active"));
 b.classList.add("active");
 const a=document.getElementById("pointTitle"),c=document.getElementById("pointText"),d=document.getElementById("pointFact");
 if(a)a.textContent=p[0]; if(c)c.textContent=p[1]; if(d)d.textContent=p[2];
});

const filters=document.querySelectorAll(".solution-filter button");
const cards=document.querySelectorAll(".action-card");
filters.forEach(b=>b.onclick=()=>{
 filters.forEach(x=>x.classList.remove("active")); b.classList.add("active");
 const f=b.dataset.filter;
 cards.forEach(c=>c.style.display=(f==="all"||c.dataset.cat===f)?"flex":"none");
});

const modal=document.getElementById("modal");
const close=()=>{if(modal){modal.classList.add("hidden");document.body.style.overflow="";}};
const open=(tag,title,text,tip)=>{
 if(!modal)return;
 document.getElementById("modalTag").textContent=tag;
 document.getElementById("modalTitle").textContent=title;
 document.getElementById("modalText").textContent=text;
 document.getElementById("modalTip").textContent=tip;
 modal.classList.remove("hidden"); document.body.style.overflow="hidden";
};
const data={
"Rotacione culturas":["CAMPO · SOLO","Rotacione culturas","A rotação de culturas alterna espécies cultivadas e ajuda na conservação do solo.","Planeje diferentes culturas de acordo com o clima e o solo."],
"Proteja a água":["CAMPO · ÁGUA","Proteja a água","Proteger nascentes e rios ajuda a preservar um recurso essencial para a produção.","Evite desperdícios e cuide das áreas próximas à água."],
"Use dados":["TECNOLOGIA","Use dados","Sensores, mapas e imagens ajudam a transformar observações em decisões.","Use tecnologia para resolver problemas reais."],
"Consuma melhor":["CASA · CONSUMO","Consuma melhor","Planejar compras e evitar desperdícios reduz o uso desnecessário de recursos.","Antes de comprar, pergunte se realmente precisa."],
"Automatize com propósito":["TECNOLOGIA","Automatize com propósito","Automação pode economizar água, energia e tempo quando aplicada corretamente.","Primeiro identifique o problema; depois escolha a tecnologia."],
"Abra espaço para a vida":["BIODIVERSIDADE","Abra espaço para a vida","Vegetação nativa e polinizadores ajudam no equilíbrio ambiental.","Preservar áreas naturais é investir na saúde da paisagem."]
};
cards.forEach(card=>{
 const btn=card.querySelector("button"); if(!btn)return;
 btn.onclick=()=>{
  const h=card.querySelector("h3"); if(!h)return;
  const d=data[h.textContent.trim()]; if(d)open(...d);
 };
});
const cm=document.getElementById("close"); if(cm)cm.onclick=close;
if(modal)modal.onclick=e=>{if(e.target===modal)close();};
document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});

document.querySelectorAll("[data-system]").forEach(b=>b.onclick=()=>{
 const d={
  solo:["Solo vivo","O solo é um sistema vivo. Matéria orgânica, cobertura e diversidade contribuem para sua conservação."],
  agua:["Água","A proteção de nascentes e rios ajuda a manter a disponibilidade e a qualidade da água."],
  tech:["Tecnologia","Agricultura de precisão, sensores, mapas e dados podem tornar decisões mais eficientes."],
  bio:["Biodiversidade","A diversidade de espécies fortalece os ecossistemas e contribui para o equilíbrio ambiental."]
 }[b.dataset.system];
 if(d)open("TERRITÓRIO",d[0],d[1],"A sustentabilidade funciona melhor quando diferentes soluções trabalham juntas.");
});

const manifesto=document.getElementById("manifesto");
if(manifesto)manifesto.onclick=()=>open("VERDE VIVO · MANIFESTO","O futuro não é um lugar. É uma escolha.","Acreditamos em um campo capaz de produzir alimento, gerar oportunidades e cuidar dos recursos que tornam tudo isso possível. Sustentabilidade não é parar de produzir. É aprender a produzir melhor.","Agro forte + natureza protegida + tecnologia + conhecimento = futuro.");

let production=70,nature=70,resources=70,round=0;
const decision=document.getElementById("decision"),choices=document.getElementById("choices"),gameEnd=document.getElementById("gameEnd");
const decisions=[
["Uma área está com baixa umidade?",[
["💧 Irrigar toda a área",8,-7,-12],["📡 Medir e irrigar apenas onde necessário",7,6,8],["🌧 Esperar a chuva", -5,2,3],["🚜 Aumentar a área plantada",10,-10,-8]]],
["O solo apresenta sinais de desgaste. O que fazer?",[
["🌱 Fazer rotação de culturas",5,10,4],["🚜 Utilizar a mesma cultura",7,-8,-2],["🧪 Aplicar mais insumos sem diagnóstico",8,-10,-8],["🌾 Cobrir o solo",3,9,6]]],
["Uma área apresenta pouca biodiversidade. O que fazer?",[
["🌳 Criar vegetação nativa",2,13,-2],["🌾 Retirar a vegetação restante",8,-15,-3],["🐝 Criar espaços para polinizadores",4,10,3],["➡️ Ignorar",1,-8,0]]],
["Uma nova tecnologia está disponível. Como decidir?",[
["📊 Testar onde resolve um problema",7,7,7],["🤖 Automatizar tudo",10,1,-8],["❌ Não usar tecnologia", -3,2,0],["💰 Escolher só pela opção mais barata",3,-3,5]]]
];

function meters(){
 production=Math.max(0,Math.min(100,production));nature=Math.max(0,Math.min(100,nature));resources=Math.max(0,Math.min(100,resources));
 [["prodNum",production],["natureNum",nature],["resourceNum",resources]].forEach(x=>{const e=document.getElementById(x[0]);if(e)e.textContent=x[1];});
 [["prodBar",production],["natureBar",nature],["resourceBar",resources]].forEach(x=>{const e=document.getElementById(x[0]);if(e)e.style.width=x[1]+"%";});
}
function game(){
 if(!decision||!choices)return;
 if(round>=decisions.length){
  const avg=(production+nature+resources)/3;
  decision.textContent="Sua Fazenda 2035 está pronta.";
  choices.innerHTML="";
  if(gameEnd){
   gameEnd.innerHTML="<strong>"+(avg>=78&&nature>=70?"🌱 EXCELENTE! Você encontrou um ótimo equilíbrio entre produção e natureza.":avg>=62?"🌾 BOM CAMINHO! Há equilíbrio, mas ainda existe espaço para melhorar.":"🔄 HORA DE REPENSAR! Suas decisões definem o futuro do campo.")+"</strong><br><br>Produção: "+production+" · Natureza: "+nature+" · Recursos: "+resources;
   gameEnd.classList.remove("hidden");
  }
  return;
 }
 const q=decisions[round]; decision.textContent=q[0];
 const rd=document.getElementById("round");if(rd)rd.textContent="DECISÃO "+(round+1)+" / "+decisions.length;
 choices.innerHTML="";
 q[1].forEach(o=>{
  const b=document.createElement("button");b.className="choice";b.textContent=o[0];
  b.onclick=()=>{production+=o[1];nature+=o[2];resources+=o[3];round++;meters();game();};
  choices.appendChild(b);
 });
}
meters();game();

const commit={
agua:"💧 Você escolheu a água. Toda gota preservada ajuda a construir um futuro mais seguro.",
solo:"🌱 Você escolheu o solo. Cuidar da base da produção é investir nas próximas gerações.",
desperdicio:"♻ Você escolheu reduzir desperdícios. Usar melhor os recursos também é produzir melhor.",
conhecimento:"✦ Você escolheu compartilhar conhecimento. Transformações grandes começam quando uma boa ideia chega a mais pessoas."
};
document.querySelectorAll("[data-commit]").forEach(b=>b.onclick=()=>{
 document.querySelectorAll("[data-commit]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");
 const r=document.getElementById("commitResult");if(r)r.textContent=commit[b.dataset.commit]||"";
});

const scene=document.querySelector(".hero-scene");
if(scene&&innerWidth>800){
 scene.onmousemove=e=>{const r=scene.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;scene.style.transform=`perspective(1000px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`;};
 scene.onmouseleave=()=>scene.style.transform="perspective(1000px) rotateY(0deg) rotateX(0deg)";
}

console.log("VERDE VIVO 🌱 — Agrinho 2026");
});