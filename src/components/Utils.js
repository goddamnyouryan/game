export const requestAnimFrame = (function(){
  return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
          window.setTimeout(callback, 1000 / 60);
      };
})();

export const setFPS = (dt) => {
  //console.log("FPS:", 1.0 / (dt / 1000.0))
}