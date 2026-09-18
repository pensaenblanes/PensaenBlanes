// Pensa en Blanes — script.js
(function(){
  "use strict";

  /* Header background on scroll */
  var header = document.getElementById('site-header');
  function onScroll(){
    if(window.scrollY > 40){ header.classList.add('scrolled'); }
    else{ header.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Mobile dropdown menu */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function(){
    var isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Tancar menú' : 'Obrir menú');
  });
  mainNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mainNav.classList.remove('open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Participa form panel (collapsed by default) */
  var toggle = document.getElementById('formToggle');
  var panel = document.getElementById('formPanel');
  toggle.addEventListener('click', function(){
    var isOpen = !panel.classList.contains('collapsed');
    panel.classList.toggle('collapsed');
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  /* Textarea auto-grow (fallback for browsers without field-sizing) */
  var ta = document.getElementById('fmsg');
  ta.addEventListener('input', function(){
    ta.style.height = '96px';
    ta.style.height = Math.min(ta.scrollHeight, 260) + 'px';
  });

  /* Participa form submission via Web3Forms */
  var form = document.getElementById('participaForm');
  var status = document.getElementById('formStatus');

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Honeypot: if a bot filled this hidden field, silently drop the submit.
    if(form.botcheck && form.botcheck.checked){
      return;
    }

    status.classList.remove('is-error');
    status.textContent = 'Enviant...';

    var submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn){ submitBtn.disabled = true; }

    var data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
      .then(function(response){ return response.json(); })
      .then(function(json){
        if(json.success){
          status.textContent = 'Gràcies! Hem rebut la teva proposta.';
          form.reset();
        } else {
          status.classList.add('is-error');
          status.textContent = 'Hi ha hagut un problema en enviar el formulari. Torna-ho a provar més tard.';
        }
      })
      .catch(function(){
        status.classList.add('is-error');
        status.textContent = 'Hi ha hagut un problema de connexió. Torna-ho a provar més tard.';
      })
      .finally(function(){
        if(submitBtn){ submitBtn.disabled = false; }
      });
  });

})();
