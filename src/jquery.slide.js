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
				_DefaultConfig = {cdTime:3000, controllerLeftButton: "../img/ser-l.gif", controllerRightButton:"../img/ser-r.gif"},
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
						
					_s.controllerBoxId = "church-controller";
					_s.controllerItemClass = 'controller-item';
					_s.controllerItemHoverClass = 'controller-item-hover';
					_s.controllerLeftButton = 'controller-left';
					_s.controllerRightButton = 'controller-right';
					_s.item = 'church-item';
					_s._length = $(host).find('.' + _s.item).length;
					
					$('<div id="'+_s.controllerLeftButton+'"><img src="'+config.controllerLeftButton+'"</div>').appendTo($(host));
					$('<div id="'+_s.controllerRightButton+'"><img src="'+config.controllerRightButton+'"</div>').appendTo($(host));
					$('<div id="'+_s.controllerBoxId+'"></div>').appendTo($(host));
					for (; i < _s._length; i += 1) {
						$('<a class="'+_s.controllerItemClass+'"></a>').appendTo(C.id(_s.controllerBoxId));
					}
					
					$(host).find('.church-item').not(':eq(0)').hide();
					C.cls(_s.controllerItemClass).filter(':eq(0)').addClass(_s.controllerItemHoverClass);
					
					this._BindControllerBoxHover();
					this._BindControllerButtonClick();
					
					return this;
				},
				run : function() {
					this._autoRun();
				},
				doChange : function(config) {
					var _s = this,
						config = config || {trigger:false, toLeft:true};
						_curIndex = C.cls(_s.controllerItemHoverClass).index();
					
					if (!config.trigger) {
						if (config.toLeft) {
							_curIndex += 1;
						} else {
							_curIndex -= 1;
						}
					}
					//处理边界问题
					if (_curIndex >= _s._length) {
						_curIndex = 0;
					}
					if (_curIndex < 0) {
						_curIndex = _s._length - 1;
					}
					
					C.cls(_s.controllerItemClass).removeClass(_s.controllerItemHoverClass);
					C.cls(_s.controllerItemClass).filter(':eq('+_curIndex+')').addClass(_s.controllerItemHoverClass);
					
					C.cls(_s.item).fadeOut('fast');
					C.cls(_s.item).filter(':eq('+_curIndex+')').fadeIn('slow');
				},
				_BindControllerButtonClick : function() {
					var _s = this;
					C.id(_s.controllerRightButton).click(function() {
						_s._stop();
						_s.doChange();
						_s._autoRun();
					});
					C.id(_s.controllerLeftButton).click(function() {
						_s._stop();
						_s.doChange({trigger:false, toLeft:false});
						_s._autoRun();
					});
				},
				_BindControllerBoxHover : function() {
					var _s = this,
						_avoidTimer = null;
					C.cls(_s.controllerItemClass).hover(function() {
						var _this = this;
						_s._stop();
						_avoidTimer = setTimeout(function() {
							$(_this).addClass(_s.controllerItemHoverClass).siblings().removeClass(_s.controllerItemHoverClass);
							_s.doChange({trigger:true});
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