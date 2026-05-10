import { useRef, useEffect } from 'react';
import { RECENT_EVENTS } from '../data/spaceData';

export default function EventsFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    const step = () => {
      pos += 0.4;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
    };
    const id = setInterval(step, 20);
    const pause = () => clearInterval(id);
    el.addEventListener('mouseenter', pause);
    return () => { clearInterval(id); el.removeEventListener('mouseenter', pause); };
  }, []);

  // Duplicate events for seamless loop
  const events = [...RECENT_EVENTS, ...RECENT_EVENTS];

  return (
    <div className="feed-wrap">
      <div className="panel-header" style={{ gridArea: 'unset' }}>
        ⚡ Space Intel Feed — Recent Events &amp; Milestones
      </div>
      <div
        ref={scrollRef}
        className="events-scroll"
        style={{ overflowX: 'scroll', scrollbarWidth: 'none', cursor: 'grab', flex: 1 }}
      >
        {events.map((ev, i) => (
          <div key={i} className="event-item">
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 2 }}>
              <span className={`event-tag ${ev.significance}`}>{ev.significance}</span>
              <span className="event-agency">{ev.agency}</span>
            </div>
            <div className="event-date">{ev.date}</div>
            <div className="event-title">{ev.title}</div>
            <div className="event-desc">{ev.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
