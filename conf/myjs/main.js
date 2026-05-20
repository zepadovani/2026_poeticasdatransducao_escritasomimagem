
/* --- layout.js content --- */
(function() {
  window.initLayout = function(options) {
    var ytAddress = options.ytAddress || "";
    var menuType = options.menuType || "default";
    
    var defaultItems = {
        home: { icon: 'mdi-home', href: 'https://josehenriquepadovani.com/', id: 'homelink', target: '_blank' },
        start: { icon: 'mdi-start', href: 'index.html', id: 'startlink', target: '_blank' },
        school: { icon: 'mdi-school', href: 'https://www.musica.ufmg.br/', id: 'schoollink', target: '_blank' },
        slidelist: { icon: 'mdi-format-list-numbered', href: '#', id: 'slidelistlink' },
        print: { icon: 'mdi-printer', href: '#', onclick: 'openNewPrintWindow()' },
        video: { icon: 'mdi-youtube', href: '#', id: 'videoaulalink' },
        fullscreen: { icon: 'mdi-fullscreen', href: '#', id: 'fullscreenlink', onclick: 'toggleFullScreen()' },
        info: { icon: 'mdi-information-variant', href: '#', id: 'infolink' },
        menu: { icon: 'mdi-chevron-right', href: '#menu', id: 'menulink', class: 'menu-link' }
    };

    function renderItem(item) {
        var icon = item.icon || 'mdi-help';
        var href = item.href || '#';
        var id = item.id ? 'id="' + item.id + '"' : '';
        var target = item.target ? 'target="' + item.target + '"' : '';
        var onclick = item.onclick ? 'onclick="' + item.onclick + '"' : '';
        var className = item.class ? 'class="' + item.class + '"' : '';
        
        return `
      <a ${id} href="${href}" ${target} ${onclick} ${className} style="display: flex; align-items: center; justify-content: center; width: 3vmax; height: 2.5vmax; text-decoration: none; flex-shrink: 0;">
        <i id="touchicon" class="mdi ${icon}" style="font-size: 2.5vmax; line-height: 1;"></i>
      </a>`;
    }

    var itemsToRender = [];
    if (options.menuItems && Array.isArray(options.menuItems) && options.menuItems.length > 0) {
        itemsToRender = options.menuItems;
    } else if (menuType === 'simple') {
        itemsToRender = ['home', 'fullscreen', 'menu'];
    } else {
        itemsToRender = ['home', 'school', 'slidelist', 'print', 'video', 'fullscreen', 'info', 'menu'];
    }

    var menuContent = itemsToRender.map(function(item) {
        var config = {};
        if (typeof item === 'string') {
            config = defaultItems[item] || {};
        } else if (typeof item === 'object') {
            var base = defaultItems[item.key || item.name] || {};
            for (var prop in base) { config[prop] = base[prop]; }
            for (var prop in item) { config[prop] = item[prop]; }
        }
        return renderItem(config);
    }).join("");

    // Calculate width and position
    // Base width per item approx 2.5vmax
    var val1 = 3;
    var widthVal = itemsToRender.length * val1;
    
    var menuStyle = 'style="width: ' + widthVal + 'vmax;"';
    var hiddenPos = '-' + (widthVal - val1) + 'vmax';
    
    // No more table wrapping
    // menuContent = '<tr>' + menuContent + '</tr>';

    var videoHtml = "";
    if (ytAddress) {
        videoHtml = `
<div id="videoaula" class="ytDiv" style="z-index: 3000; width: 20vmax; height: 11vmax" >
<div class="js-player plyr__video-embed" id="vd" style="width: 20vmax; height: 11vmax" >
    <iframe
    src="${ytAddress}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
    allowfullscreen
    allowtransparency
    allow="autoplay"
    ></iframe>
</div>
</div>`;
    }

    var logoHtml = "";
    if (options.showLogo !== false) {
        logoHtml = `
<div id="logodiv" class="hide-logo">
<p style="text-align: center;">
  <a href="http://musica.ufmg.br/padovani/">
    <img src="/conf/img/logo_ecris.svg" width="15%" style="background:none; border:none; box-shadow:none; vertical-align: middle;">
    <img src="/conf/img/logo_ufmg.svg" width="22%" style="background:none; border:none; box-shadow:none; vertical-align: middle;">
    <br/>
  </a><br/>
</p>
</div>`;
    }

    var html = `
<div class="header">http://musica.ufmg.br/padovani</div>
<div class="footer" >
  © 2018-2020 José Henrique Padovani. Adverte-se, para os devidos fins, que a imagem dos docentes, discentes e demais envolvidos,
  além do conteúdo oral e escrito das aulas assim como plataformas e mecanismos digitais desenvolvidos pelos docentes, encontram-se legalmente protegidos pela Lei no
  9.610/98 (Lei de Direitos Autorais) e somente poderão ser utilizados para fins exclusivamente
  acadêmicos a que se destinam e no âmbito interno da Universidade Federal de Minas Gerais
  (UFMG).
  Estão proibidas quaisquer outras formas de utilização, tais como copiar, editar, adicionar,
  reduzir, exibir, difundir publicamente, transmitir a terceiros, bem como trocar, emprestar ou
  praticar qualquer ato de comercialização.
  A violação a quaisquer desses direitos exclusivos dos titulares acarretará as sanções previstas
  na Lei no 9.610/98 (Lei de Direitos Autorais), nos arts. 184 e 186 do Código Penal, sem prejuízo
  da apuração de transgressão disciplinar de servidores (Lei no 8.112/90) e discentes (Estatuto
  da UFMG).
  contato: padovani.aulas [arroba] gmail [ponto] com<br/>
</div>

<div id="infos" class="infoDiv" style="display: none; color: #222; font-size: 1.7rem; line-height: 1.8rem; text-align: justify; padding: 2rem; z-index: 12000"  >
  <div style="
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  width:100%; text-align: right; ">
  <a id="closeinfoslink" href="#">
    <i id="touchicon" class="mdi mdi-close" style="opacity: 1; font-size: 3rem;"></i>
  </a>
</div>


<p>
  Os slides nessa página são projetados para funcionar em <b>formato paisagem</b> (<i>landscape</i>) e em <b>tela cheia</b>. No computador, utilize as <b>setas direcionais</b> (<!-- <img src="/conf/img/leftright_arrow.svg" height="20rem"> --> ↔ ) para navegar pelos slides. No tablet/celular, deslize para percorrer.<br/><br/>
  Utilize os <b>ícones no menu deslizante</b> – à esquerda, no topo da página – para:
</p>
<ul style="color: #222; font-size: 90%; padding: 2.2rem; text-align: justify; padding-left: 4%;">
  <li>▪ <i id="touchicon" class="mdi mdi-home" style="font-size: inherit; color: rgb(200,16,46);"></i> - acessar a <b>página da disciplina no site http://musica.ufmg.br/padovani</b></li>
  <li>▪ <i id="touchicon" class="mdi mdi-school" style="font-size: inherit; color: rgb(200,16,46);"></i> - acessar a <b>página da disciplina no <a href="https://virtual.ufmg.br/20201/course/view.php?id=2812#section-1">Moodle/UFMG Virtual</a></b></li>
  <li>▪ <i id="touchicon" class="mdi mdi-format-list-numbered" style="font-size: inherit; color: rgb(200,16,46);"></i> - abrir aba com <b>índice de slides</b> principais</li>
  <li>▪ <i id="touchicon" class="mdi mdi-printer" style="font-size: inherit; color: rgb(200,16,46);"></i> - <b>imprimir/gerar pdf</b> dos slides sem os elementos dinâmicos</li>
  <li>▪ <i id="touchicon" class="mdi mdi-youtube" style="font-size: inherit; color: rgb(200,16,46);"></i> - abrir aba da <b>videoaula</b></li>
  <li>▪ <i id="touchicon" class="mdi mdi-fullscreen" style="font-size: inherit; color: rgb(200,16,46);"></i> /
    <i id="touchicon" class="mdi mdi-fullscreen-exit" style="font-size: inherit; color: rgb(200,16,46);"></i> - entrar/sair do modo de <b>tela-cheia</b></li>
    <li>▪ <i id="touchicon" class="mdi mdi-information-variant" style="font-size: inherit; color: rgb(200,16,46);"></i> - abrir <b>instruções/informações</b> de uso dos slides</li>
    <li>▪ <i id="touchicon" class="mdi mdi-chevron-right" style="font-size: inherit; color: rgb(200,16,46);"></i> / <i id="touchicon" class="mdi mdi-chevron-left" style="font-size: inherit; color: rgb(200,16,46);"></i> - expandir/recolher o <b>menu deslizante</b></li>
  </ul>

  <p >
    Em caso de dúvidas, contate o professor pelo <a href="https://virtual.ufmg.br/20201/course/view.php?id=2812#section-1">Moodle/UFMG Virtual</a> ou por e-mail: <b>padovani.aulas</b> [arroba] <b>gmail</b> [ponto] <b>com</b>.
    <br/><br/><br/><br/>
    <f70>
      <b>Advertência Legal/UFMG:</b> <br/><br/>Adverte-se, para os devidos fins, que a imagem dos docentes, discentes e demais envolvidos, além do conteúdo oral e escrito das aulas assim como plataformas e mecanismos digitais desenvolvidos pelos docentes, encontram-se legalmente protegidos pela Lei no 9.610/98 (Lei de Direitos Autorais) e somente poderão ser utilizados para fins exclusivamente acadêmicos a que se destinam e no âmbito interno da Universidade Federal de Minas Gerais (UFMG). <br/>Estão proibidas quaisquer outras formas de utilização, tais como copiar, editar, adicionar, reduzir, exibir, difundir publicamente, transmitir a terceiros, bem como trocar, emprestar ou praticar qualquer ato de comercialização. A violação a quaisquer desses direitos exclusivos dos titulares acarretará as sanções previstas na Lei no 9.610/98 (Lei de Direitos Autorais), nos arts. 184 e 186 do Código Penal, sem prejuízo da apuração de transgressão disciplinar de servidores (Lei no 8.112/90) e discentes (Estatuto da UFMG).
    </f70>
  </p>
</div>

<div id="slidesmenu" class="slidesmenuDiv" style="z-index: 4000" >
  <div>
    <div style="position: absolute; right:10px; top:10px; ">
    <a id="closeslidesmenulink" href="#">
      <i id="touchicon" class="mdi mdi-close"></i>
    </a>
  </div>
  <p id="slidelisttitle">índice:</p>
  <ul class="slidelistul" id="slidelist" >
  </ul>
</div>
</div>


<div id="menul" class="menul" ${menuStyle}>
<div style="display: flex; width: 100%; height: auto; align-items: flex-start; justify-content: flex-end; margin: 0; padding: 0; flex-wrap: nowrap;">
  ${menuContent}
</div>
</div>

${logoHtml}

${videoHtml}

    `;
    
    document.body.insertAdjacentHTML('beforeend', html);

    // Inject progress bar — visible only while the mouse is moving,
    // fades out after 2 s of inactivity (same feel as the cursor hiding).
    (function() {
      var FADE_DELAY = 2000; // ms of inactivity before hiding
      var _hideTimer = null;

      var bar = document.createElement('div');
      bar.id = 'impress-pb-bar';
      bar.setAttribute('style', [
        'position:fixed', 'bottom:0', 'left:0', 'right:0', 'height:4px',
        'background:rgba(200,16,46,0.18)', 'z-index:99999',
        'padding:0', 'margin:0', 'border:none', 'pointer-events:none',
        'opacity:0', 'transition:opacity 0.4s ease',
        'transform:translateZ(0)'
      ].join('!important;') + '!important');

      var fill = document.createElement('div');
      fill.id = 'impress-pb-fill';
      fill.setAttribute('style', [
        'height:100%', 'width:0%', 'background:rgb(200,16,46)',
        'transition:width 0.5s ease', 'padding:0', 'margin:0'
      ].join('!important;') + '!important');
      bar.appendChild(fill);

      var counter = document.createElement('div');
      counter.id = 'impress-pb-counter';
      counter.setAttribute('style', [
        'position:fixed', 'bottom:8px', 'right:14px',
        'font-size:11px', 'font-family:sans-serif', 'font-weight:400',
        'color:rgba(100,100,100,0.75)', 'letter-spacing:0.06em',
        'z-index:99999', 'padding:0', 'margin:0', 'pointer-events:none',
        'opacity:0', 'transition:opacity 0.4s ease',
        'transform:translateZ(0)'
      ].join('!important;') + '!important');

      document.body.appendChild(bar);
      document.body.appendChild(counter);

      // Show on mouse move, hide after FADE_DELAY ms of inactivity
      function showPb() {
        bar.style.setProperty('opacity', '1', 'important');
        counter.style.setProperty('opacity', '1', 'important');
        clearTimeout(_hideTimer);
        _hideTimer = setTimeout(function() {
          bar.style.setProperty('opacity', '0', 'important');
          counter.style.setProperty('opacity', '0', 'important');
        }, FADE_DELAY);
      }
      document.addEventListener('mousemove', showPb);
    })();

    // Detect preview mode (iframe inside Presenter View)
    var isPreview = window.location.search.indexOf('preview=1') !== -1;
    if (isPreview) { document.body.classList.add('preview-mode'); }

    // Open BroadcastChannel for Presenter View sync
    try {
      window._presenterChannel = new BroadcastChannel('impress-presenter');
    } catch(e) { window._presenterChannel = null; }

    if (window._presenterChannel) {
      if (!isPreview) {
        // Normal mode: listen for nav commands and state requests from Presenter View
        window._presenterChannel.onmessage = function(evt) {
          var data = evt.data;
          if (!data) return;

          // Presenter just opened and is requesting current state
          if (data.type === 'request-state') {
            var steps = document.querySelectorAll('#impress .step');
            var slides = [];
            steps.forEach(function(s, i) {
              slides.push({ id: s.id, title: s.getAttribute('data-title') || s.id, index: i + 1 });
            });
            window._presenterChannel.postMessage({ type: 'slide-list', slides: slides });
            var active = document.querySelector('#impress .step.active');
            if (active) {
              var total = steps.length;
              var current = 0;
              steps.forEach(function(s, i) { if (s === active) current = i + 1; });
              window._presenterChannel.postMessage({
                type: 'slide-enter',
                id: active.id,
                title: active.getAttribute('data-title') || '',
                notes: active.getAttribute('data-notes') || '',
                current: current,
                total: total
              });
            }
            return;
          }

          if (data.type !== 'nav') return;
          if (typeof impress === 'undefined') return;
          if (data.direction === 'next')      { impress().next(); }
          else if (data.direction === 'prev') { impress().prev(); }
          else if (data.goto)                 { impress().goto(data.goto); }
        };
      } else {
        // Preview mode: follow slide-enter events from the main window
        window._presenterChannel.onmessage = function(evt) {
          var data = evt.data;
          if (!data || data.type !== 'slide-enter') return;
          if (typeof impress === 'undefined') return;
          try { impress().goto(data.id); } catch(e) {}
        };
      }
    }

    // Inject video background layers behind all slide content.
    // #slide-video-bg  (z:-2) contains the <video> and optional colour overlay.
    // #slide-white-overlay (z:-1) provides the default white background and
    // fades out smoothly whenever a slide with data-video-bg is active.
    document.body.insertAdjacentHTML('afterbegin',
      '<div id="slide-white-overlay"></div>' +
      '<div id="slide-video-bg">' +
        '<video id="slide-bg-video" loop muted playsinline></video>' +
        '<img id="slide-bg-img-a" class="slide-bg-img" alt="" />' +
        '<img id="slide-bg-img-b" class="slide-bg-img" alt="" />' +
        '<div id="slide-video-color-overlay"></div>' +
      '</div>'
    );

    // Cross-fade state: tracks which img element (A or B) is currently visible
    var _activeBgImg = 'a';

    // --- Event Handlers & Logic ---

    // 1. Menu Sliding Logic
    var menulink = document.getElementById('menulink');
    var menul = document.getElementById('menul');
    var closeinfoslink = document.getElementById('closeinfoslink');

    var urlParams = new URLSearchParams(window.location.search);
    var menuval = urlParams.has('menu') ? urlParams.get('menu') : 0;

    // Initial state
    if(menuval == 1){
      menul.style.left = "0rem";
      $(menulink).find('i').removeClass('mdi-chevron-right');
      $(menulink).find('i').addClass('mdi-chevron-left');
    }else{
      menul.style.left = hiddenPos;
      $(menulink).find('i').removeClass('mdi-chevron-left');
      $(menulink).find('i').addClass('mdi-chevron-right');
    };

    // Click handler
    menulink.onclick = function () {
      if ((menul.style.left != "0rem")) {
        menul.style.left = "0rem";
        $(menulink).find('i').removeClass('mdi-chevron-right');
        $(menulink).find('i').addClass('mdi-chevron-left');
      } else {
        menul.style.left = hiddenPos;
        $(menulink).find('i').removeClass('mdi-chevron-left');
        $(menulink).find('i').addClass('mdi-chevron-right');
      }
    };

    if (closeinfoslink) {
        closeinfoslink.onclick = function () {
            $('#infos').fadeToggle('slow');
        };
    }

    // 2. Video Aula Logic
    var videoaulalink = document.getElementById('videoaulalink');
    var ytDiv = document.getElementById('videoaula');
    if (ytDiv) {
      ytDiv.style.left = "120vmax";
    }
    
    if (videoaulalink && ytDiv) {
        videoaulalink.onclick = function () {
            if ((ytDiv.style.left == "120vmax")) {
            ytDiv.style.left = "77vmax";
            } else {
            ytDiv.style.left = "120vmax";
            }
        };
    }

    // 3. Slide List Logic
    var slidelistlink = document.getElementById('slidelistlink');
    var slidesmenuDiv = document.getElementById('slidesmenu');
    var closeslidesmenu = document.getElementById('closeslidesmenulink');

    slidesmenuDiv.style.left = "-40vmax";

    if (slidelistlink) {
        slidelistlink.onclick = function () {
            if ((slidesmenuDiv.style.left == "-40vmax")) {
            slidesmenuDiv.style.left = "0vmax";
            } else {
            slidesmenuDiv.style.left = "-40vmax";
            }
        };
    }

    if (closeslidesmenu) {
        closeslidesmenu.onclick = function () {
            slidesmenuDiv.style.left = "-40vmax";
        };
    }
    
    // This might need jQuery to be loaded, which it is in footer.ejs
    if (typeof $ !== 'undefined') {
        $("#slidelist").on('click', '.slidelink', function(event){
            slidesmenuDiv.style.left = "-40vmax";
        });
    }

    // --- Video Background + Inline Player Control ---
    //
    // This single listener handles three things on every slide transition:
    //
    //  1. Pauses ALL inline <video>/<audio> players in every slide
    //     (so media never bleeds into the next slide).
    //
    //  2. Manages the fullscreen video background:
    //       data-video-bg="path/to/video.mp4"       — activates bg video
    //       data-video-overlay="rgba(0,0,0,0.4)"    — optional tint overlay
    //       data-video-bg-muted="false"              — allow audio (default: muted)
    //
    //  3. Autoplays inline media that carry data-autoplay in the NEW slide.
    //
    document.addEventListener('impress:stepenter', function(e) {
      var step = e.target;

      // ── 1. Pause every inline player in all slides ────────────────────────
      document.querySelectorAll(
        '.step video:not(#slide-bg-video), .step audio'
      ).forEach(function(media) {
        if (!media.paused) media.pause();
      });

      // ── 2. Video / image background ──────────────────────────────────────
      var videoBg      = step.getAttribute('data-video-bg');
      var imgBg        = step.getAttribute('data-img-bg');
      // data-video-overlay / data-img-overlay share the same colour overlay div
      var bgOverlay    = step.getAttribute('data-video-overlay') ||
                         step.getAttribute('data-img-overlay')   || 'transparent';
      // data-video-bg-muted defaults to "true" (muted).
      // Set data-video-bg-muted="false" on the step to allow audio.
      var videoMuted   = step.getAttribute('data-video-bg-muted');

      var bgVideoEl        = document.getElementById('slide-bg-video');
      var bgImgA           = document.getElementById('slide-bg-img-a');
      var bgImgB           = document.getElementById('slide-bg-img-b');
      var whiteBgEl        = document.getElementById('slide-white-overlay');
      var videoBgContainer = document.getElementById('slide-video-bg');
      var colorOverlayEl   = document.getElementById('slide-video-color-overlay');

      if (videoBg) {
        // ── video background ──────────────────────────────────────────────
        bgImgA.classList.remove('active');
        bgImgB.classList.remove('active');

        if (colorOverlayEl) colorOverlayEl.style.background = bgOverlay;
        if (bgVideoEl) {
          bgVideoEl.muted = (videoMuted !== 'false');
          if (bgVideoEl.getAttribute('src') !== videoBg) {
            bgVideoEl.src = videoBg;
            bgVideoEl.load();
          }
          bgVideoEl.play().catch(function() { /* autoplay may be blocked */ });
        }
        whiteBgEl.classList.add('video-active');
        videoBgContainer.classList.add('active');

      } else if (imgBg) {
        // ── image background (cross-fade A/B) ─────────────────────────────
        if (bgVideoEl && !bgVideoEl.paused) bgVideoEl.pause();

        var imgPosition = step.getAttribute('data-img-position') || 'center center';

        // Determine which element is currently showing and which is the spare
        var currentEl = (_activeBgImg === 'a') ? bgImgA : bgImgB;
        var nextEl    = (_activeBgImg === 'a') ? bgImgB : bgImgA;

        // If the image is the same as what's already showing, skip the swap
        if (currentEl.getAttribute('src') !== imgBg) {
          // Load the new image into the hidden (next) element
          nextEl.style.objectPosition = imgPosition;
          nextEl.src = imgBg;
          // Fade in the next, fade out the current → cross-fade
          nextEl.classList.add('active');
          currentEl.classList.remove('active');
          // Flip the tracker
          _activeBgImg = (_activeBgImg === 'a') ? 'b' : 'a';
        } else {
          // Same image, just ensure it's visible and update position
          currentEl.style.objectPosition = imgPosition;
          currentEl.classList.add('active');
        }

        if (colorOverlayEl) colorOverlayEl.style.background = bgOverlay;

        whiteBgEl.classList.add('video-active');
        videoBgContainer.classList.add('active');

      } else {
        // ── no background: fade back to white ────────────────────────────
        bgImgA.classList.remove('active');
        bgImgB.classList.remove('active');
        whiteBgEl.classList.remove('video-active');
        videoBgContainer.classList.remove('active');

        // Pause bg video after CSS transition finishes (1.5 s)
        setTimeout(function() {
          var c = document.getElementById('slide-video-bg');
          if (c && !c.classList.contains('active')) {
            var v = document.getElementById('slide-bg-video');
            if (v) v.pause();
          }
        }, 1600);
      }

      // ── 3. Autoplay inline media in the incoming slide ────────────────────
      step.querySelectorAll(
        'video[data-autoplay]:not(#slide-bg-video), audio[data-autoplay]'
      ).forEach(function(media) {
        media.play().catch(function() { /* autoplay may be blocked */ });
      });

      // ── 4. Broadcast to Presenter View (main window only, not preview iframe) ──
      if (window._presenterChannel && !isPreview) {
        var allSteps = document.querySelectorAll('#impress .step');
        var total = allSteps.length;
        var current = 0;
        for (var pi = 0; pi < total; pi++) {
          if (allSteps[pi] === step) { current = pi + 1; break; }
        }
        window._presenterChannel.postMessage({
          type:    'slide-enter',
          id:      step.id,
          title:   step.getAttribute('data-title') || '',
          notes:   step.getAttribute('data-notes') || '',
          current: current,
          total:   total
        });
      }
    });

  };
})();

/* --- autofitMarkdown ---
 *
 * Adjusts the font-size of a .markdown.autofit element via binary search so
 * the content fills the parent .slide as large as possible without overflow.
 *
 * Reads optional data attributes from the element:
 *   data-min-size  – minimum font-size in rem (default: 0.6)
 *   data-max-size  – maximum font-size in rem (default: 4.0)
 */
function autofitMarkdownEl(el) {
  var slide = el.closest('.slide');
  if (!slide) return;

  var minSize   = parseFloat(el.getAttribute('data-min-size') || '0.6');
  var maxSize   = parseFloat(el.getAttribute('data-max-size') || '4.0');
  var precision = 0.04; // rem – stop binary search when range is this small

  // Use a proportional (unitless) line-height so it scales with font-size.
  // This overrides any inline line-height that may have been set previously.
  el.style.lineHeight = '1.45';

  // Helper: does the element fit inside the slide without vertical overflow?
  function fits() {
    return el.scrollHeight <= slide.clientHeight;
  }

  // Start at maximum and bail out early if it already fits
  el.style.fontSize = maxSize + 'rem';
  if (fits()) return;

  // Binary-search for the largest font-size that fits
  while (maxSize - minSize > precision) {
    var mid = (minSize + maxSize) / 2;
    el.style.fontSize = mid + 'rem';
    if (!fits()) {
      maxSize = mid;
    } else {
      minSize = mid;
    }
  }
  el.style.fontSize = minSize + 'rem';
}

// Broadcast full slide list + initial slide to Presenter View on init
document.addEventListener('impress:init', function() {
  if (!window._presenterChannel) return;
  var steps = document.querySelectorAll('#impress .step');
  var slides = [];
  steps.forEach(function(s, i) {
    slides.push({ id: s.id, title: s.getAttribute('data-title') || s.id, index: i + 1 });
  });
  window._presenterChannel.postMessage({ type: 'slide-list', slides: slides });

  // Also broadcast current (first) slide
  setTimeout(function() {
    var active = document.querySelector('#impress .step.active');
    if (active && window._presenterChannel) {
      var total = steps.length;
      var current = 0;
      steps.forEach(function(s, i) { if (s === active) current = i + 1; });
      window._presenterChannel.postMessage({
        type: 'slide-enter',
        id: active.id,
        title: active.getAttribute('data-title') || '',
        notes: active.getAttribute('data-notes') || '',
        current: current,
        total: total
      });
    }
  }, 100);
});

// Progress bar
// Queries DOM fresh on every call — no caching/timing issues.
// Updates on impress:stepenter (every navigation) AND after impress:init (1st slide).
(function() {
  function updateProgress(activeStep) {
    var pbFill   = document.getElementById('impress-pb-fill');
    var pbText   = document.getElementById('impress-pb-counter');
    var allSteps = document.querySelectorAll('#impress .step');
    var total    = allSteps.length;
    if (!total || !activeStep) return;
    var current = 0;
    for (var i = 0; i < total; i++) {
      if (allSteps[i] === activeStep) { current = i + 1; break; }
    }
    if (!current) return;
    if (pbFill) pbFill.style.setProperty('width', ((current / total) * 100).toFixed(1) + '%', 'important');
    if (pbText) pbText.textContent = current + ' / ' + total;
  }

  document.addEventListener('impress:stepenter', function(e) {
    updateProgress(e.target);
  });

  document.addEventListener('impress:init', function() {
    setTimeout(function() {
      var active = document.querySelector('#impress .step.active');
      if (active) updateProgress(active);
    }, 80);
  });
})();

// Run autofit shortly after impress initialises – by that point the markdown
// plugin has already converted .markdown elements to HTML, so scrollHeight
// measurements are accurate.
document.addEventListener('impress:init', function() {
  setTimeout(function() {
    document.querySelectorAll('.markdown.autofit').forEach(autofitMarkdownEl);
  }, 150);
});

// Re-run on window resize (debounced) so the layout stays correct if the
// browser window changes size during the presentation.
var _autofitResizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(_autofitResizeTimer);
  _autofitResizeTimer = setTimeout(function() {
    document.querySelectorAll('.markdown.autofit').forEach(function(el) {
      el.style.fontSize = ''; // reset before recalculating
      autofitMarkdownEl(el);
    });
  }, 300);
});

/* --- padovanislides.js content --- */
if (typeof $ !== 'undefined') {
    $(document).on('impress:stepenter', function(e) {
        var currentId = $(e.target).attr('id');
        
        // Toggle logo visibility
        if (currentId === "01" || currentId === "overview") {
            $('#logodiv').addClass('hide-logo');
        } else {
            $('#logodiv').removeClass('hide-logo');
        }
    });
}

function openNewPrintWindow(url) {
    window.open(url, "_blank");
}

// Initialize impress.js
if (typeof impress !== 'undefined') {
    impress().init();
}

/* --- toggle_fullscreen.js content --- */
function toggleFullScreen() {
  var icon;
  icon = document.getElementById("fullscreenlink");
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
  (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {
      document.documentElement.requestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    };
    // $(icon).find('i').className = 'mdi mdi-fullscreen_exit';
    if (typeof $ !== 'undefined') {
        $(icon).find('i').removeClass('mdi-fullscreen');
        $(icon).find('i').addClass('mdi-fullscreen-exit');
    }
    //$(icon).find('i').text('fullscreen_exit');

  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    if (typeof $ !== 'undefined') {
        $(icon).find('i').removeClass('mdi-fullscreen-exit');
        $(icon).find('i').addClass('mdi-fullscreen');
    }
    // $(icon).find('i').className = 'mdi mdi-fullscreen';
  }
}

document.addEventListener("fullscreenChange", function () {
    var icon = document.getElementById("fullscreenlink");
    if (document.fullscreenElement != null) {
        if (typeof $ !== 'undefined') {
            $(icon).find('i').text('fullscreen_exit');
        }
    } else {
        if (typeof $ !== 'undefined') {
            $(icon).find('i').text('fullscreen');
        }
    }
});
