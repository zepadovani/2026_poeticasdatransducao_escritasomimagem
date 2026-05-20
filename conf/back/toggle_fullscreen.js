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
    $(icon).find('i').removeClass('mdi-fullscreen');
    $(icon).find('i').addClass('mdi-fullscreen-exit');
    //$(icon).find('i').text('fullscreen_exit');

  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    $(icon).find('i').removeClass('mdi-fullscreen-exit');
    $(icon).find('i').addClass('mdi-fullscreen');
    // $(icon).find('i').className = 'mdi mdi-fullscreen';
  }
}

document.addEventListener("fullscreenChange", function () {
          if (fullscreenElement != null) {
            $(icon).find('i').text('fullscreen_exit');
          } else {
            $(icon).find('i').text('fullscreen');
          }
      });
