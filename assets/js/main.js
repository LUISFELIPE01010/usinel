/* USI-NEL — comportamento do site (sem bibliotecas, sem animações) */
(function () {
  'use strict';

  var WHATSAPP = '5535991862037';
  var desktop = window.matchMedia('(min-width:1200px)');

  /* ---------- 1. Menu do celular ---------- */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('menu');
  function abrirMenu(abrir) {
    menu.classList.toggle('is-open', abrir);
    burger.setAttribute('aria-expanded', String(abrir));
    burger.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    burger.querySelector('use').setAttribute('href', abrir ? '#i-fechar' : '#i-menu');
    document.body.style.overflow = abrir ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { abrirMenu(!menu.classList.contains('is-open')); });
  // ao tocar num link do menu, fecha o painel
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') && menu.classList.contains('is-open')) abrirMenu(false);
  });
  desktop.addEventListener('change', function () { abrirMenu(false); fecharSub(); });

  /* ---------- 2. Submenu "Serviços" ---------- */
  var btnSub = document.querySelector('.nav__btn');
  function fecharSub() { btnSub.setAttribute('aria-expanded', 'false'); }
  btnSub.addEventListener('click', function () {
    btnSub.setAttribute('aria-expanded', String(btnSub.getAttribute('aria-expanded') !== 'true'));
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav__sub')) fecharSub();
    else if (e.target.closest('.sub a')) fecharSub();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (btnSub.getAttribute('aria-expanded') === 'true') { fecharSub(); btnSub.focus(); }
    else if (menu.classList.contains('is-open')) { abrirMenu(false); burger.focus(); }
  });

  /* ---------- 3. Item ativo do menu conforme a seção na tela ---------- */
  var links = {};
  document.querySelectorAll('.nav__lista > li > a.nav__link').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  links.servicos = btnSub;  // a seção de serviços acende o botão "Serviços"
  var ativo = null;
  function marcar(id) {
    var el = links[id] || (id === 'atendimento' ? btnSub : null);
    if (!el || el === ativo) return;
    if (ativo) ativo.removeAttribute('aria-current');
    el.setAttribute('aria-current', 'true');
    ativo = el;
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) { if (en.isIntersecting) marcar(en.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['inicio', 'diferenciais', 'sobre', 'servicos', 'atendimento', 'depoimentos', 'contato'].forEach(function (id) {
      var s = document.getElementById(id); if (s) io.observe(s);
    });
  }
  ativo = document.querySelector('.nav__link[aria-current="true"]');

  /* ---------- 4. Formulário de orçamento -> WhatsApp ---------- */
  var form = document.getElementById('form-orcamento');
  function erro(campo, msg) {
    var p = document.getElementById(campo.getAttribute('aria-describedby'));
    if (msg) { campo.setAttribute('aria-invalid', 'true'); p.textContent = msg; p.hidden = false; }
    else { campo.removeAttribute('aria-invalid'); p.textContent = ''; p.hidden = true; }
    return !msg;
  }
  function validar() {
    var nome = form.nome, tel = form.telefone, msg = form.mensagem;
    var digitos = tel.value.replace(/\D/g, '');
    var ok = [
      erro(nome, nome.value.trim().length < 2 ? 'Informe o seu nome.' : ''),
      erro(tel, digitos.length < 10 || digitos.length > 13 ? 'Informe um telefone com DDD, ex.: (35) 99186-2037.' : ''),
      erro(msg, msg.value.trim().length < 5 ? 'Descreva brevemente o que você precisa.' : '')
    ];
    var primeiro = [nome, tel, msg][ok.indexOf(false)];
    if (primeiro) primeiro.focus();
    return ok.indexOf(false) === -1;
  }
  // limpa o erro assim que o campo é corrigido
  ['nome', 'telefone', 'mensagem'].forEach(function (n) {
    form[n].addEventListener('input', function () { if (this.getAttribute('aria-invalid')) erro(this, ''); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validar()) return;
    var texto = [
      'Olá, USI-NEL! Gostaria de solicitar um orçamento.',
      '',
      'Nome: ' + form.nome.value.trim(),
      'Telefone: ' + form.telefone.value.trim(),
      'Serviço: ' + form.servico.value,
      'O que preciso: ' + form.mensagem.value.trim()
    ].join('\n');
    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto);
    // (sem 'noopener' no window.open: com ele o retorno é sempre null e não daria para saber se a aba abriu)
    var janela = window.open(url, '_blank');
    if (janela) janela.opener = null;
    else window.location.href = url;   // navegador bloqueou a nova aba: abre na mesma
  });

  /* ---------- 5. Botão flutuante: só aparece depois da hero (que já tem o botão do WhatsApp) ---------- */
  var fab = document.querySelector('.fab');
  var hero = document.getElementById('inicio');
  if (fab && hero && 'IntersectionObserver' in window) {
    fab.classList.add('is-oculto');
    new IntersectionObserver(function (en) {
      fab.classList.toggle('is-oculto', en[0].isIntersecting);
    }, { rootMargin: '0px 0px -35% 0px' }).observe(hero);
  }

  /* ---------- 6. Ano no rodapé ---------- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
