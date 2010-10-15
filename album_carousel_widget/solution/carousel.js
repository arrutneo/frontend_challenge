$(document).ready(function(){

function prueba(){

	if (($('#container > div').length) > 1) {
	
		alert('no erere');
	}
	
	else {
	
		alert('no yet');
	}
}
    //var
    var thumbWidth = 56;
    var itemsToShow = 4;
    var thumbNavWidth;
	var imgWidth = 424;
    
    //actions
    function nav_left_actions()
    {
      $('#album_nav .nav-left').click(function (){
        var thumbs = $("#albums");
        thumbs.stop().animate({left: 0});
		//alert(thumbs.position().left);
        if(thumbs.position().left == 0)
        {
          thumbs.stop().animate({left: 0});
        }
        else
        {
          thumbs.stop().animate({left: "+=" + 96});
        }
          
        return false;
      });
    }
        
    function nav_right_actions()
    {
      $('#album_nav .nav-right').click(function (){
        var thumbs = $("#albums");
		var preg = ((thumbs.width() - 112)*-1);
		if(thumbs.position().left <= preg )
        {
		  thumbs.stop().animate({left: 0});
        }
        else
        {
          thumbs.stop().animate({left: "-=" + 96});
        }
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
    
    /*
function create_detail_image_box()
    {
    }
*/
    
    function init_thumbs()
    {
      thumbNavWidth = ($('#albums li').length * (thumbWidth + 40));
      $("#albums").attr('style','width:'+thumbNavWidth+'px');
    }
    
    function load_gallery()
    {
	  if (($('#container > div').length)>1){
	  	var x = $('#container > div');
		x=x.eq(0);
		x.remove();
	  }
      $("#container").prepend('<div id="display"><a href="#" class="nav-left"><img src="images/nav-left-big.png" alt="prev" /></a><div class="contdetail"><ul id="detail"></ul></div><a href="#" class="nav-right"><img src="images/nav-right-big.png" alt="next" /></a></div>');
	  
      var idToFind = $(this).attr('id'); // recibo la categoría
      
	$.ajax({ //consigo la ruta de la imagen
			type: "GET",
			url: "album_data.xml",
			dataType: "xml",
			success: function(xml) {
				$(xml).find('album').each(function(){
					var id = $(this).attr('id');
					var title = $(this).find('title').text();
					if(id == idToFind){
						var src;
						$(this).find('image').each(function(){

						img = $(this).text();
						src = img; // es la imagen leída del XML para la categoría pasada por ID						
						src = "images/" + id + "/" + src;														
						
						var image = new Image();
						
						$(image)
						.load(function () {
							$("#detail").append("<li></li>");
							var x;
							x=$("#detail li");
							var tot = x.length;
							x=x.eq(tot-1);
							x.append(this);
							$(this).fadeIn();
							
						})
						.error(function(){alert("FATAL ERROR: can't load image " + src);})
						.attr({src: src, id: 'gallery-image'});
						});
						imgNavWidth = ($(this).find('image').length * imgWidth);
      					$("#detail").attr('style','width:'+imgNavWidth+'px');
					}
				});
			}
      });	  	 	  
	  
	 
	nav_right_big_actions();
	nav_left_big_actions();
	
	 	return false;
    }
	
	 function nav_left_big_actions()
    {

      $('#display .nav-left').click(function (){
        var imgGallery = $("#detail");
        imgGallery.stop().animate({left: 0});
        if(imgGallery.position().left == 0)
        {
          imgGallery.stop().animate({left: 0});
        }
        else
        {
          imgGallery.stop().animate({left: "+=" + 424});
        }
      });

    }
	
	 function nav_right_big_actions()
    {
      $('#display .nav-right').click(function (){
        var imgGallery = $("#detail");
		var preg = ((imgGallery.width() - 848)*-1);
		if(imgGallery.position().left <= preg )
        {
		  imgGallery.stop().animate({left: 0});
        }
        else
        {
          imgGallery.stop().animate({left: "-=" + 424});
        }
        
        return false;
      });
    }
	
   /*
 function helper()
    {
      var i = 1;
      $('#albums li').each(function(){
        $(this).prepend(i);
        i++;
        });
    }
*/
    
    //init
    //helper();
    init_thumbs();
    nav_left_actions();
    nav_right_actions()
    nav_thumbs_actions();
    //create_detail_image_box()
    //load_gallery();
	});
