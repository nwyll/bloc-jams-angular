(function () {
  /* Private */

  /*
  * @function: SongPlayer
  * @desc: Plays/Pauses songs, next/previous
  * @param: Fixtures
  * @returns: {Object} SongPlayer
  */
  function SongPlayer(Fixtures) {

    /*
    * @desc: creates empty Songplayer
    * @type {Object}
    */
    var SongPlayer = {};

    /*
    * @desc: Gets current album from Fixtures
    * @type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();

    /*
    * @desc: Buzz object audio file
    * @type {Object}
    */
    var currentBuzzObject = null;

    /*
    * @function: setSong
    * @desc: Stops currently playing song and loads new audio file as currentBuzzObject
    * @param: {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    }

    /*
    * @function: playSong
    * @desc: Plays the current Buzz object and sets song.playing? to true
    * @param: {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };

    /*
    * @function: getSongIndex
    * @desc: Retrieves the index of the current song
    * @param: {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };


    /* Public*/

    /*
    * @desc: current song from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;

    /*
    * @function: play
    * @desc: Plays new song or current song if paused
    * @param: {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };

    /*
    * @method: pause
    * @desc: Pauses the current playing song
    * @param: {Object} song
    */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /*
    * @function: previous
    * @desc: Skips to previous song
    * @param: {Object} song
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
