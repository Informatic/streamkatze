import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import Plyr from 'plyr';
import styles from '../style.module.scss';
import { useParams } from 'react-router';
import { useStreamsList } from '../data';
import '!style-loader!css-loader!plyr/dist/plyr.css';

/**
 * Even though webOS supports HLS natively, We use custom hls.js-based video
 * player, because streaming.media.ccc.de streams cause crashes of
 * starfish-media-pipeline...
 */
function HLSStream({ urls, ...props }) {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const player = new Plyr(videoRef.current, {
      controls: ['play', 'captions', 'settings'],
      settings: ['captions', 'quality', 'speed', 'loop'],
      captions: { active: true, update: true, language: 'en' },
    });

    player.on('playing', (evt) => {
      console.info('Loading:', evt);
      setLoading(false);
    });

    const hls = new Hls();
    let idx = 0;
    player.on('languagechange', () => {
      // Caption support is still flaky. See: https://github.com/sampotts/plyr/issues/994
      setTimeout(() => (hls.subtitleTrack = player.currentTrack), 50);
    });
    // bind them together
    hls.attachMedia(videoRef.current);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log('video and hls.js are now bound together !');
      hls.loadSource(urls[idx]);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log(
          'manifest loaded, found ' +
            data.levels.length +
            ' quality level'
        );
        videoRef.current.play();
      });
    });

    hls.on(Hls.Events.ERROR, function (event, data) {
      console.warn('HLS error:', event, data);
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // try to recover network error
            console.log(
              'fatal network error encountered, try to recover'
            );
            idx += 1;
            hls.loadSource(urls[idx]);
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log(
              'fatal media error encountered, try to recover'
            );
            hls.recoverMediaError();
            break;
          default:
            // cannot recover
            hls.destroy();
            break;
        }
      }
    });
    return () => {
      console.info('destroy!');
      hls.destroy();
      player.destroy();
    };
  }, [urls]);

  return (
    <div className={styles.videoBox}>
      {loading ? (
        <div className={styles.loadingOverlay}>
          <div class={styles.ldsEllipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          Loading...
        </div>
      ) : null}
      <video ref={videoRef} crossOrigin={true} {...props}></video>
    </div>
  );
}

export default function PlayStream({}) {
  let params = useParams();
  let streamsList = useStreamsList();
  if (streamsList !== null) {
    const stream = streamsList.find((s) => s.slug == params.slug);
    const streamurls = stream.streams.find(
      (s) => (s.type === 'video' || s.type === 'hls') && s.urls.hls
    );
    if (streamurls) {
      return (
        <HLSStream
          urls={[
            streamurls.urls.hls.url,
            streamurls.urls.hls.url.replace('https://', 'http://'),
          ]}
          poster={stream.poster.replace('https://', 'http://')}
        />
      );
    } else {
      return <div>404</div>;
    }
  }
  return <div>Loading...</div>;
}
