(function(w){
	w.gesture=function(node,callback){
		var isStart=false;
		var startC=0;
		var startD=0;
		node.addEventListener('touchstart',function(e){
			var touch=e.touches;
			if(touch.length>=2){
				isStart=true;
				startC=getC(touch[0],touch[1]);
				startD=getD(touch[0],touch[1]);
				
				if(callback && typeof callback['start'] == 'function') {
					callback['start']();
				}
			}
		});
		node.addEventListener('touchmove',function(e){
			var touch=e.touches;
			if(touch.length>=2){
				
				var endC=getC(touch[0],touch[1]);
				var scale=endC/startC;
			
				var endD=getD(touch[0],touch[1]);
				var rotate=endD-startD;
				
				e.scale=scale;
				e.rotate=rotate;
				
				if(callback && typeof callback['change'] == 'function') {
					callback['change'](e);
				}
			}
		});
		node.addEventListener('touchend',function(e){
			var touch=e.touches;
			if(isStart&&touch.length<2){
				if(callback && typeof callback['end'] == 'function') {
					callback['end']();
				}
			}
		});
	}
	w.getC=function(p1,p2){
		var disX=p1.clientX-p2.clientX;
		var disY=p1.clientY-p2.clientY;
		var disC=Math.sqrt((disX*disX)+(disY*disY));
		return disC;
	}
	w.getD=function(p1,p2){
		var disX=p1.clientX-p2.clientX;
		var disY=p1.clientY-p2.clientY;
		var radia=Math.atan2(disY,disX);
		var deg=180/Math.PI*radia;
		return deg;
	}
})(window);
