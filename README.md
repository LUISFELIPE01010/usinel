# Site USI-NEL — Manutenção Industrial, Soldas e Usinagem

Site de uma página, estático (HTML + CSS + JS puro, sem build e sem dependências), para a USI-NEL de Poços de Caldas/MG.
O topo (header, hero e faixa de diferenciais) reproduz o mockup `hero-usinel.png` medida a medida em 1528 px de largura.

## Rodar no computador
```
node serve.js
```
Abre em http://localhost:4176. Qualquer servidor estático também serve (ex.: `npx serve .`).

## Publicar (Vercel)
Importar o repositório na Vercel **sem framework e sem comando de build** (a raiz é o site). O `vercel.json` só
liga URLs limpas, cache de 7 dias para `/assets` e cabeçalhos de segurança.

## Estrutura
```
index.html                 página (ícones e logotipo em SVG no início do <body>)
assets/css/styles.css      estilos; cores em variáveis no topo (:root)
assets/js/main.js          menu, submenu "Serviços", item ativo do menu, formulário -> WhatsApp, botão flutuante
assets/img/                foto da hero (desktop e celular, .avif + .webp), og-usinel.jpg, favicon.svg
assets/fonts/              Montserrat (textos) e Comfortaa (só o nome "usi-nel"), licença OFL
robots.txt, sitemap.xml, vercel.json, serve.js
```

## Contatos usados no site
- WhatsApp e telefone: (35) 99186-2037 -> `https://wa.me/5535991862037` e `tel:+5535991862037`
- Instagram: https://www.instagram.com/usi_nel2008/
- Endereço: R. Antonio Joao Dare, 93, Poços de Caldas/MG, CEP 37704-300 (link para o Google Maps, sem mapa embutido)

Para trocar o número, procure `5535991862037` no `index.html` e no `main.js`.

## Formulário de orçamento
Valida nome, telefone (com DDD) e descrição; monta a mensagem e abre o WhatsApp da USI-NEL com o texto pronto.
Nenhum dado é guardado no site. Se o navegador bloquear a nova aba, abre na mesma aba.

## O que é provisório
- **Domínio**: `https://www.usinel.com.br` é um exemplo. Troque no `<head>` do `index.html` (canonical, og:url, og:image,
  JSON-LD), em `robots.txt` e em `sitemap.xml` (todos marcados com `TROCAR DOMINIO`).
- **Foto da hero**: recortada do próprio mockup (é a única com o uniforme da USI-NEL). Tem 889 px de largura: em telas
  de alta densidade fica um pouco suave. Ao trocar por uma foto real, gere `hero-usinel-889/1320` (desktop, com a
  área da esquerda que fica atrás da diagonal) e `hero-usinel-m-480/723/1080` (celular, sem essa área), em `.avif` e `.webp`.
- **Depoimentos**: a seção existe porque está no menu do mockup, mas não tem depoimentos inventados: mostra
  "em breve" e botões para o Instagram e para enviar um depoimento. Com depoimentos reais (nome e empresa), troque o
  bloco `.depo__vazio` por cartões.
- **Logotipo**: o símbolo de losangos foi redesenhado em SVG a partir do mockup. Se a empresa tiver o arquivo
  original (SVG/PDF/AI), vale substituir o `<symbol id="logo-simbolo">`.

## Dados a confirmar com o cliente
Horário de atendimento, e-mail, se há telefone fixo, e os textos dos serviços (vieram de LinkedIn/Canva da empresa;
"Projetos sob medida" para o agronegócio veio de uma fonte menos confiável). As frases da faixa de diferenciais
("Equipamentos modernos", "Equipe especializada", "Compromisso com prazos"...) vieram do mockup.
