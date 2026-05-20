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
    var val1 = 7.5;
    var widthVal = itemsToRender.length * val1;
    
    var menuStyle = 'style="width: ' + widthVal + 'vmax;"';
    var hiddenPos = '-' + (widthVal - val1) + 'vmax';
    
    // No more table wrapping
    // menuContent = '<tr>' + menuContent + '</tr>';

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

<div id="logodiv" class="hide-logo">
<p style="text-align: center;">
  <a href="http://musica.ufmg.br/padovani/">
    <img src="/conf/img/logo_ecris.svg" width="75%" style="background:none; border:none; box-shadow:none;">
    <br/>
  </a><br/>
</p>
</div>

<div id="videoaula" class="ytDiv" style="z-index: 3000; width: 20vmax; height: 11vmax" >
<div class="js-player plyr__video-embed" id="vd" style="width: 20vmax; height: 11vmax" >
    <iframe
    src="${ytAddress}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
    allowfullscreen
    allowtransparency
    allow="autoplay"
    ></iframe>
</div>
</div>

    `;
    
    document.body.insertAdjacentHTML('beforeend', html);

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
    ytDiv.style.left = "120vmax";
    
    if (videoaulalink) {
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

  };
})();
