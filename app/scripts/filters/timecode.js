(function() {
  function timecode() {
    return function(seconds) {
      var seconds = Number.parseFloat(seconds);

      if(Number.isNaN(seconds)) {
        return '-:--';
      }

      var wholeseconds = Math.floor(seconds),
          minutes = Math.floor(wholeseconds/60),
          remainingSeconds = wholeseconds % 60;

      var output = minutes + ':';

      if (remainingSeconds < 10 ) {
        output += 0;
      }

      output += remainingSeconds;

      return output;
    };
  }

  angular
      .module('blocJams')
      .filter('timecode', timecode);
})();
