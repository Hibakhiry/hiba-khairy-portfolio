/*
  ===================== EDIT YOUR PORTFOLIO HERE =====================
  Add a new project by copying one object in the projects array.
  image: "assets/images/page-XX.jpg"
  category must be one of: identity, logo, social, brochure, book, print
*/
const projects = [
  ...range(10,11,'identity','Visual Identity'),
  ...range(12,25,'logo','Logo Design'),
  ...range(26,27,'social','Social Media'),
  ...range(28,30,'book','Book Cover'),
  ...range(31,35,'print','Print Design'),
  ...range(36,40,'brochure','Brochure Design')
];
function range(start,end,category,title){return Array.from({length:end-start+1},(_,i)=>{const n=start+i;return {id:n,image:image:`images/page-${String(n).padStart(2,'0')}.jpg`,category,title:`${title} — Project ${n}`}})}
const categoryNames={all:'All',identity:'Visual Identity',logo:'Logo Design',social:'Social Media',brochure:'Brochure',book:'Book Cover',print:'Print Design'};
let active='all', currentIndex=0;
const grid=document.getElementById('portfolioGrid');
const filters=document.getElementById('filters');
Object.entries(categoryNames).forEach(([key,name])=>{const b=document.createElement('button');b.className='filter'+(key==='all'?' active':'');b.textContent=name;b.dataset.category=key;b.onclick=()=>{active=key;document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render()};filters.appendChild(b)});
function filtered(){return active==='all'?projects:projects.filter(p=>p.category===active)}
function render(){grid.innerHTML='';filtered().forEach((p,i)=>{const card=document.createElement('article');card.className='project reveal visible';card.innerHTML=`<img src="${p.image}" alt="${p.title}" loading="lazy"><div class="project-overlay"><small>${categoryNames[p.category]}</small><br><strong>${p.title}</strong></div>`;card.onclick=()=>openModal(i);grid.appendChild(card)})}
const modal=document.getElementById('modal'), modalImage=document.getElementById('modalImage'), modalCaption=document.getElementById('modalCaption');
function openModal(i){currentIndex=i;const p=filtered()[i];modalImage.src=p.image;modalImage.alt=p.title;modalCaption.textContent=p.title;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
function move(step){const arr=filtered();currentIndex=(currentIndex+step+arr.length)%arr.length;const p=arr[currentIndex];modalImage.src=p.image;modalCaption.textContent=p.title}
document.getElementById('modalClose').onclick=closeModal;document.getElementById('modalPrev').onclick=()=>move(-1);document.getElementById('modalNext').onclick=()=>move(1);modal.onclick=e=>{if(e.target===modal)closeModal()};document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')closeModal();if(e.key==='ArrowLeft')move(-1);if(e.key==='ArrowRight')move(1)});
const menuToggle=document.getElementById('menuToggle'), nav=document.getElementById('nav');menuToggle.onclick=()=>nav.classList.toggle('open');nav.querySelectorAll('a').forEach(a=>a.onclick=()=>nav.classList.remove('open'));
window.addEventListener('scroll',()=>{const h=document.documentElement;document.getElementById('progress').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'});
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const langBtn=document.getElementById('langBtn');let arabic=false;langBtn.onclick=()=>{arabic=!arabic;document.documentElement.lang=arabic?'ar':'en';document.documentElement.dir=arabic?'rtl':'ltr';langBtn.textContent=arabic?'English':'العربية';if(arabic){document.querySelector('.hero h1').innerHTML='تصاميم تجعل<br><span>علامتك التجارية لا تُنسى.</span>';document.querySelector('.hero-text').textContent='أصمم الهويات البصرية والشعارات ومحتوى وسائل التواصل والمواد المطبوعة بأسلوب واضح واحترافي.';document.querySelector('.hero-actions .primary').textContent='استكشفي أعمالي';document.querySelector('.hero-actions .ghost').textContent='لنتعاون معًا'}else{location.reload()}};
render();
