


// $( function() { $( 'audio' ).audioPlayer(); } );


function openNewPrintWindow(){
  var newWindow=window.open('?print'); //replace with your url
  newWindow.focus(); //Sets focus window
}


if ( !window.location.search.match(/print/) ) {
  impress().init();



  var pvideo=false;
  var lastEnter = 0;
  var lastLeave = 0;

  var pover = false;
  var lastId = "01";



  //função para trocar video
  function changeVideoSrc(t){
    var player = document.getElementById('bgvid');
    var mp4Vid = document.getElementById('vidsrc');
    player.pause();

    // Now simply set the 'src' property of the mp4Vid variable!!!!

    mp4Vid.src = t;

    player.load();
    player.play();
  };

  function backOutSlow(t){
    $( "#backgrounddiv" ).fadeOut(t, function() {
      //   // Animation complete.
    });
    pvideo=true;
    console.log(pvideo);
    console.log("fadeOut");
  };

  function backInSlow(t){
    $( "#backgrounddiv" ).fadeIn(t, function() {
      //   // Animation complete.
    });
    pvideo=false;
    console.log(pvideo);
    console.log("fadeIn");
  };







  $(document).ready(function() {



    $("body").animate({ backgroundColor: "#FFF" }, 10);
    //backOutSlow(10);
    $( "#backgrounddiv" ).hide();


    $('#infolink').click(function(){
      $('#infos').fadeToggle('slow');
    });


    $(document).on('impress:stepenter', function(e) {
      var currentId = $(e.target).attr('id')
      var currentEnter = Number(currentId);

      // Toggle logo visibility
      if (currentId === "01" || currentId === "overview") {
        $('#logodiv').addClass('hide-logo');
      } else {
        $('#logodiv').removeClass('hide-logo');
      }


      if (currentId != "overview") {
        lastId=$(e.target).attr('id');
      };

      if (currentId === "overview") {
        $("body").animate({ backgroundColor: "#FFF" }, 1000);
      };

      if (currentEnter == 1) {
        $("body").animate({ backgroundColor: "#FFF" }, 500);

      };

      if (currentEnter == 2) {
        $("body").animate({ backgroundColor: "#FFF" }, 1000);
        //backInSlow(4000);

      };

      if (currentEnter == 3) {
        $("body").animate({ backgroundColor: "#FFF" }, 500);
        // $("body").animate({ backgroundColor: "#302010" }, 2000);
        // $("body").delay(7000).animate({ backgroundColor: "#102030" }, 2000);
        // $("body").delay(7000).animate({ backgroundColor: "#203010" }, 2000);


        //changeVideoSrc("http://127.0.0.1/~padovani/videos/cristal.mp4");
        //backInSlow(4000);
        //$("#slide3").animate({backgroundColor: "#ff0000" },1000);
        //  $("html body").animate({ background: "#00FF00" }, 1000);
        //$("#slide3").animate({backgroundColor: '#400101'});

        //obs: não funciona se a cor de background for definida pelo próprio impress.js

      };

      if (currentId  == "11e") {
        backInSlow(2000);
        //changeVideoSrc("http://127.0.0.1/~padovani/videos/tijolo.mp4");
        $("body").animate({ backgroundColor: "#FFF" }, 500);

        //backInSlow(2000);
      };

      lastEnter = currentEnter;
    });

    $(document).on('impress:stepleave', function(e) {
      var currentLeaveId = $(e.target).attr('id')
      var currentLeave = Number(currentLeaveId);

      if (currentLeaveId == "11e") {
        backOutSlow(2000);

      };

      if (currentLeave == 2) {
        // backOutSlow(200);
        // $("body").animate({ backgroundColor: "#404000" }, 100);
      };

      if (currentLeave == 3) {
        //$("#slide3").animate({backgroundColor: "#ff0000" },1000);
        //  $("html body").animate({ background: "#00FF00" }, 1000);
        //$("#slide3").animate({backgroundColor: '#400101'});

        //obs: não funciona se a cor de background for definida pelo próprio impress.js
        //$("body").animate({ backgroundColor: "#404000" }, 1000);
      };

      if (currentLeave == 4) {
        //backInSlow(2000);
      };


      lastLeave = currentLeave;

    });



  });
} else {
  $(document).ready(function () {
    window.print();
    window.onfocus=function(){ window.close();}
  });
}
