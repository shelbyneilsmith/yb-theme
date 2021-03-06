jQuery('html').removeClass('no-js').addClass('js');

(function($){

	/* Delay script till DOM is loaded */
	/* TODO: Find better (faster) way to do this? */
	$(document).on('ready', function(){

		var $w = $( window ),
		$b = $( 'body' ),
		$c = $( '#content' ),
		$state
		;

		var menuMobile = false;
		var mobileWidth = '720';

		var yb = {
			breakSetup: function( $breakwidth, $operator, $callback ) {
				var	w = $(window),
				$width = w.width();

				var operators = {
					'<' : function( a, b ) { return a < b ; },
					'>' : function( a, b ) { return a > b ; },
					'<=' : function( a, b ) { return a <= b ; },
					'>=' : function( a, b ) { return a >= b ; }
				};

				w.load(function() {
					if ( operators[ $operator ] ( $width, $breakwidth ) ) {
						$state = $callback.name;
						return $callback();
					}
				});

				w.resize(function() {
					$width = w.width();
					if ( operators[ $operator ] ( $width, $breakwidth ) ) {
						if ( $state !== $callback.name ) {
							$state = $callback.name;
							return $callback();
						}
					}
				});
			},
			init : function(){
				yb.breakSetup( mobileWidth, '<=', smallBreak );
				yb.breakSetup( mobileWidth, '>', largeBreak );
			}
		};

		yb.init();

		function showHideMainNav() {
			if ( $( 'body' ).hasClass( 'offscreen-nav' ) ) {
				$( 'body' ).toggleClass( 'nav-open' );

				return false;
			}
		}

		function mobileMenuInit() {
			if ( !menuMobile ) {
				var btnLoc, btnHref;
				var btnPosClass = 'right';

				$( '#main-nav-header' ).parent().addClass( 'main-nav-origin' );

				if ( $('body').hasClass( 'mobilenav-btn-pos-bottom-thumb-right' ) || $('body').hasClass( 'mobilenav-btn-pos-bottom-thumb-left' ) ) {
					btnLoc = 'body';
					if ( $('body').hasClass( 'mobilenav-btn-pos-bottom-thumb-left' ) ) {
						btnPosClass = 'left';
					}
					btnPosClass = 'thumb-btn ' + btnPosClass;
				} else {
					if ( $('body').hasClass( 'mobilenav-btn-pos-header-left' ) ) {
						btnPosClass = 'left';
					}
					btnLoc = '#site-masthead .container';
				}
				if ( $( 'body' ).hasClass( 'offscreen-nav' ) ) {
					btnHref = "#";
				} else {
					btnHref = "#footer";
				}
				$( '<a class="nav-btn ' + btnPosClass + '" href="' + btnHref + '">Menu</a>' ).prependTo( btnLoc );
				$( '<a class="close-btn" href="#">&#10060;</a>' ).prependTo( '#main-nav-header' );
				$( '.nav-btn, #main-nav-header .close-btn' ).click( showHideMainNav );
				$( '#wrapper' ).wrapInner('<div class="inner-wrap"></div>');
				$( '#main-nav-header' ).prependTo( '#wrapper' );

				menuMobile = true;
			}
		}
		function mobileMenuRemove() {
			if ( menuMobile ) {
				if ( $( 'body' ).hasClass( 'nav-open' ) ) {
					$( 'body' ).removeClass( 'nav-open' );
				}
				$( '#main-nav-header' ).appendTo( '.main-nav-origin' );
				$( '#main-nav-header' ).parent().removeClass( 'main-nav-origin' );
				$( '.nav-btn, #main-nav-header .close-btn' ).remove();
				$( '#wrapper .inner-wrap').contents().unwrap();
				menuMobile = false;
			}
		}
		function smallBreak() {
			if ( $( 'body' ).hasClass( 'mobile-menu' ) ) {
				mobileMenuInit();
			}
			if ( ( $( '#util-nav-header li' ).length > 0 ) && $( 'body' ).hasClass( 'util-nav-merge' ) ) {
				$( '#util-nav-header li' ).addClass( 'immigrant' ).appendTo( '#main-nav-header > ul' );
				$( '#util-nav-header' ).hide();
			}
		}
		function largeBreak() {
			if ( $( 'body' ).hasClass( 'mobile-menu' ) ) {
				mobileMenuRemove();
			}
			if ( ( $( '#util-nav-header li' ).length === 0 ) && $( 'body' ).hasClass( 'util-nav-merge' ) ) {
				$( '#main-nav-header li.immigrant' ).appendTo( '#util-nav-header ul' ).removeClass( 'immigrant' );
				$( '#util-nav-header' ).show();
			}
		}

	}); /* end document.on('ready') */

})( jQuery );