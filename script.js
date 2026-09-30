
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '✕' : '☰';
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  if(menuBtn){ menuBtn.textContent='☰'; menuBtn.setAttribute('aria-expanded','false'); }
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => observer.observe(el));

document.querySelectorAll('a[href$=".html"]').forEach(link=>{
  link.addEventListener('click',(e)=>{
    const href=link.getAttribute('href');
    if(!href || href.startsWith('#')) return;
    e.preventDefault();
    document.querySelector('.page-transition')?.classList.add('active');
    setTimeout(()=> location.href=href, 340);
  });
});

const bookingForm = document.querySelector('#bookingForm');
bookingForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const nome = document.querySelector('#nome')?.value.trim() || '';
  const servico = document.querySelector('#servico')?.value || '';
  const data = document.querySelector('#data')?.value || '';
  const horario = document.querySelector('#horario')?.value || '';
  const obs = document.querySelector('#obs')?.value.trim() || '';
  const dataBR = data ? new Date(data+'T12:00:00').toLocaleDateString('pt-BR') : 'a definir';
  const msg = `Olá! Meu nome é ${nome}. Gostaria de consultar disponibilidade para ${servico}. Data: ${dataBR}${horario ? `, horário: ${horario}` : ''}.${obs ? ` Observações: ${obs}` : ''}`;
  window.open(`https://wa.me/553496436601?text=${encodeURIComponent(msg)}`,'_blank');
});
