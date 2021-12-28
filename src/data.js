import { useState, useEffect } from 'react';

const streamsAPI =
  'https://karen.inf.re/streaming.media.ccc.de/streams/v2.json';
let streamsList = null;

export function useStreamsList() {
  const [streams, setStreams] = useState(null);

  useEffect(async () => {
    if (streamsList) {
      setStreams(streamsList);
    } else {
      console.info('Fetching...');
      const resp = await fetch(streamsAPI);
      const json = await resp.json();
      console.info(json);
      const s = [];
      for (const event of json) {
        for (const group of event.groups) {
          for (const room of group.rooms) {
            if (room.streams.length) {
              s.push(room);
            }
          }
        }
      }
      console.info('Fetched:', s);
      streamsList = s;
      setStreams(s);
    }
  }, []);

  return streams;
}
