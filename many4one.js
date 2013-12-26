/*

Many4One Animations - jQuery Plugin

Description:

Many animations for one element with Animate.css and jQuery.

@require: jQuery v1.9.1 (or above) - Animate.css https://daneden.me/animate
@author: EmaWebDesign
@version: 1.0
@website: http://www.emawebdesign.com/2013/12/26/associare-piu-animazioni-a-un-singolo-elemento-con-animate-css-e-jquery
@license: MIT license http://opensource.org/licenses/MIT

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
    
Usage: 

$("#element").many4oneAnimations({  
  animations: ['tada','shake'] 
});

*/


(function($) {


  $.fn.many4oneAnimations = function(options) {
  
    var config = {
      animations: ['fadeInUpBig']
     };
	 
	 var me = this;
	 var numAnimations = options.animations.length;
	 var cont = 0;
	 
	 if (Object.prototype.toString.call( options.animations ) !== '[object Array]') {
		alert('Animations parameter must be an array.');
	 }
	
     var options = $.extend(config, options);  
      

     var Many4One = new function() {
		
		
		  this.animate = function() {
			
			me.addClass('animated ' + options.animations[0]);
			
			cont++;
			
		  }
		  
		  this.addAnimation = function(i) {
			
			me.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(event) {

				event.stopPropagation();
			  
			  	var old = parseInt(i-1);
				
				me.removeClass('animated ' + options.animations[old]).off().addClass('animated ' + options.animations[i]);
				
				i++;
				
				if (i<numAnimations) Many4One.addAnimation(i);
			  
			});
			
		  }
		  
		  this.allAnimations = function() {
			  
			  if (cont==0) Many4One.animate();
			  
			  if (cont>0) Many4One.addAnimation(cont);
			  
		  }
		  
		    
		
	};
	
	
	return me.each(function() {
    
       Many4One.allAnimations();          
          
    });           
  
  
  };



})(jQuery);
