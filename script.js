// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    menu?.classList.remove('show');
  });
});

// Sticky nav mobile toggle
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
menuToggle?.addEventListener('click', () => {
  menu?.classList.toggle('show');
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Moving indicator under active nav item (desktop + mobile menu)
(function(){
  const menu = document.querySelector('.menu');
  if(!menu) return;
  let indicator = menu.querySelector('.menu-indicator');
  if(!indicator){
    indicator = document.createElement('div');
    indicator.className = 'menu-indicator';
    menu.prepend(indicator);
  }

  function moveIndicator(){
    const active = menu.querySelector('.menu-item.active');
    if(!active){ indicator.style.opacity = '0'; return; }
    const rect = active.getBoundingClientRect();
    const host = menu.getBoundingClientRect();
    const top = rect.top - host.top;
    const left = rect.left - host.left;
    indicator.style.width = rect.width + 'px';
    indicator.style.height = rect.height + 'px';
    indicator.style.transform = `translate(${left}px, ${top}px)`;
    indicator.style.opacity = '1';
  }

  // initial and responsive updates
  window.addEventListener('resize', moveIndicator);
  // when menu opens on mobile
  document.querySelector('.menu-toggle')?.addEventListener('click', ()=>{
    setTimeout(moveIndicator, 0);
  });
  // move on route change via clicks
  menu.querySelectorAll('.menu-item').forEach(item=>{
    item.addEventListener('click', ()=>{
      menu.querySelectorAll('.menu-item').forEach(i=>i.classList.remove('active'));
      item.classList.add('active');
      moveIndicator();
    });
  });
  // run once on ready
  window.addEventListener('load', moveIndicator);
  moveIndicator();
})();

// Remove old slider logic (now dots on features page handle switching)

// Reveal on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{ threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


