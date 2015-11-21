/**
 * jquery plugin
 * 
 * @author church
 * @date 2015-11-21
 */
(function($) {
	$.fn.extend({
		'slide' : function(config) {
			var S,
				C,
				host = this,
				_timer = null,
				_DefaultConfig = {cdTime:3000},
				config = $.extend({}, _DefaultConfig, config);
				
			C = {
				id : function(Id) {
					return $('#' + Id);
				},
				cls : function(Class) {
					return $('.' + Class);
				}
			}
			
			S = {
				init : function() {
					var  i = 0,
						_s = this;
						
					_s.controllerBoxId = "church-controller",
					_s.controllerItemClass = 'controller-item',
					_s.controllerItemHoverClass = 'controller-item-hover',
					_s.item = 'church-item';
					_s._length = $(host).find('.' + _s.item).length;
					
					$('<div id="'+_s.controllerBoxId+'"></div>').appendTo($(host));
					for (; i < _s._length; i += 1) {
						$('<a class="'+_s.controllerItemClass+'"></a>').appendTo(C.id(_s.controllerBoxId));
					}
					
					$(host).find('.church-item').not(':eq(0)').hide();
					C.cls(_s.controllerItemClass).filter(':eq(0)').addClass(_s.controllerItemHoverClass);
					
					this._BindControllerBoxHover();
					
					return this;
				},
				run : function() {
					this._autoRun();
				},
				doChange : function(trigger) {
					var _s = this,
						trigger = trigger || false;
						_curIndex = C.cls(_s.controllerItemHoverClass).index();
					
					if (!trigger) {
						_curIndex += 1;
					}
					//处理边界问题
					if (_curIndex >= _s._length) {
						_curIndex = 0;
					}
					
					C.cls(_s.controllerItemClass).removeClass(_s.controllerItemHoverClass);
					C.cls(_s.controllerItemClass).filter(':eq('+_curIndex+')').addClass(_s.controllerItemHoverClass);
					
					C.cls(_s.item).fadeOut('fast');
					C.cls(_s.item).filter(':eq('+_curIndex+')').fadeIn('slow');
				},
				_BindControllerBoxHover : function() {
					var _s = this,
						_avoidTimer = null;
					C.cls(_s.controllerItemClass).hover(function() {
						var _this = this;
						_s._stop();
						_avoidTimer = setTimeout(function() {
							$(_this).addClass(_s.controllerItemHoverClass).siblings().removeClass(_s.controllerItemHoverClass);
							_s.doChange(true);
						}, 100);
					}, function() {
						clearTimeout(_avoidTimer);
						_s._autoRun();
					});
				},
				_autoRun : function() {
					var _s = this;
					_timer = setInterval(function() {
						_s.doChange();
					}, config.cdTime);
				},
				_stop : function() {
					clearInterval(_timer);
				}
			}
			
			S.init().run();
		}
	});
})(jQuery);