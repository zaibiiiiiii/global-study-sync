"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreferences = () => {
      const canAutoplay = !reducedMotion.matches && !(navigator as NavigatorWithConnection).connection?.saveData;
      setVideoEnabled(canAutoplay);
      setShouldPlay(canAutoplay);
    };

    syncPreferences();
    reducedMotion.addEventListener("change", syncPreferences);
    return () => reducedMotion.removeEventListener("change", syncPreferences);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!videoEnabled || !shouldPlay) {
      video.pause();
      return;
    }
    void video.play().catch(() => setShouldPlay(false));
  }, [videoEnabled, shouldPlay]);

  function togglePlayback() {
    if (!videoEnabled) setVideoEnabled(true);
    setShouldPlay((playing) => !playing);
  }

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-forest">
        <video
          ref={videoRef}
          src={videoEnabled ? "/video/hero.mp4" : undefined}
          poster="/images/hero-poster.webp"
          muted
          loop
          playsInline
          preload={videoEnabled ? "metadata" : "none"}
          onError={() => {
            setShouldPlay(false);
            setVideoEnabled(false);
          }}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/65 to-forest/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/25 via-transparent to-forest/15" />
      </div>

      <div className="absolute bottom-6 right-5 z-20 sm:bottom-8 sm:right-8 lg:right-10">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={shouldPlay ? "Pause background video" : "Play background video"}
          title={shouldPlay ? "Pause background video" : "Play background video"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-forest/55 text-white backdrop-blur-sm transition hover:border-white/65 hover:bg-forest/80 focus-visible:outline-white"
        >
          {shouldPlay ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        </button>
      </div>
    </>
  );
}
