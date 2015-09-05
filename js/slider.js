(function( $ ) {
  $.fn.slideshow = function( options ) {
    options = $.extend({
      wrapper: ".slider-wrapper",
      previous: ".slider-previous",
      next: ".slider-next",
      slides: ".slide",
      nav: ".slider-nav",
      speed: 500,
      easing: "linear"
      
    }, options);
    
    var slideTo = function( slide, element ) {
      var $currentSlide = $( options.slides, element ).eq( slide );
      
      $currentSlide.
      animate({
        opacity: 1
      }, options.speed, options.easing ).
      siblings( options.slides ).
      css( "opacity", 0 );  
      
    };
    
    return this.each(function() {
      var $element = $( this ),
        $previous = $( options.previous, $element ),
        $next = $( options.next, $element ),
        index = 0,
        total = $( options.slides ).length;
        
        $( options.slides, $element ).each(function() {
          var $slide = $( this );
          var image = $slide.data( "image" );
          $slide.css( "backgroundImage", "url(" + image + ")" );
        });
        
        
        $element.hover(function() {
          $( options.nav, $element ).stop( true, true ).show(); 
        }, function() {
          $( options.nav, $element ).stop( true, true ).hide(); 
          
        });
        
      $next.on( "click", function() {
        index++;
        $previous.show();
        
        if( index == total - 1 ) {
          index = total - 1;
          $next.hide(); 
        }
        
        slideTo( index, $element ); 
        
      });
      
      $previous.on( "click", function() {
        index--;
        $next.show();
        
        if( index == 0 ) {
          index = 0;
          $previous.hide(); 
        }
        
        slideTo( index, $element ); 
        
      });

      
    });
  };
  
  $(function() {
    $( "#main-slider" ).slideshow();
    
  });
  
})( jQuery );