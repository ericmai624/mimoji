/* namespaces */
const UPDATE_TEXTTRACK = 'urn:x-cast:texttrack.update';
/* end of namespaces */

const context = cast.framework.CastReceiverContext.getInstance();

/* Set up the player to handle messages and events */
const playerManager = context.getPlayerManager();

/* Customer messages */
context.addCustomMessageListener(UPDATE_TEXTTRACK, e => {
  const textTracksManager = playerManager.getTextTracksManager();
  textTracksManager.setActiveByIds(null); // remove current text track

  // Create text tracks object
  const track = textTracksManager.createTrack();
  const id = Math.round(Math.random() * 90) + 10;
  track.trackId = id;
  track.trackContentType = 'text/vtt';
  track.trackContentId = e.data.url;
  track.language = 'zh';

  // Add tracks
  textTracksManager.addTracks([track]);

  // Activate the track
  textTracksManager.setActiveByIds([id]);
});

/* Config for playback */
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.initialBandwidth = 10 * 1024 * 1024;

/* Start the receiver app */
context.start({ playbackConfig });