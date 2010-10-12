$(document).ready(function(){
    
    //var
    var thumbWidth = 56;
    var itemsToShow =  4;
    var thumbNavWidth;
    
    //actions
    function nav_left_actions()
    {
      $('#album_nav .nav-left').click(function (){
        var thumbs = $("#albums");
        thumbs.stop().animate({left: 0});
        if(thumbs.position().left > thumbWidth * itemsToShow)
        {
          thumbs.stop().animate({left: 0});
        }
        else
        {
          thumbs.stop().animate({left: "+=" + 100});
        }
          
        return false;
      });
    }
        
    function nav_right_actions()
    {
      $('#album_nav .nav-right').click(function (){
        var thumbs = $("#albums");
        thumbs.stop().animate({left: "-=" + 100});
        return false;
      });
    }
    
    function nav_thumbs_actions()
    {
      $('#albums > li > a').click(load_gallery);
    }
    
    function move_thumbs()
    {
      //
    }
    
    function create_detail_image_box()
    {
      $("#display").prepend('<div class="detail"></div>');
    }
    
    function init_thumbs()
    {
      thumbNavWidth = ($('#albums li').length * (thumbWidth + 40));
      $("#albums").attr('style','width:'+thumbNavWidth+'px');
    }
    
    function load_gallery()
    {
      
      var idToFind = $(this).attr('id'); // recibo la categoría automáticamente cuando el elemento es clicado
      
      var src = $.ajax({ //consigo la ruta de la imagen
			type: "GET",
			url: "album_data.xml",
			dataType: "xml",
			success: function(xml) {
				$(xml).find('album').each(function(){
					 var id = $(this).attr('id');
					 var title = $(this).find('title').text();
           if(id == idToFind)
            {
              var album_thumbnail = $(this).find('album_thumbnail').text();
              src = album_thumbnail; // es la imagen leída del XML para la categoría pasada por ID 
              return src = "images/" + src;
            }

				});
			}
      });
      
      var img = new Image();
      $(img)
        .load(function () {
          $('#display .detail').empty()
            .append(this);
          $(this).fadeIn();
        })
        .error(function(){alert("FATAL ERROR: can't load image " + src);})
        .attr({src: src, id: 'gallery-image'});
      return false;
    }
    
    function helper()
    {
      var i = 1;
      $('#albums li').each(function(){
        $(this).prepend(i);
        i++;
        });
    }
    
    //init
    helper();
    init_thumbs();
    nav_left_actions();
    nav_right_actions()
    nav_thumbs_actions();
    create_detail_image_box()
    //load_gallery();
	});
