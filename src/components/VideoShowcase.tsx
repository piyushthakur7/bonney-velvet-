/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface VideoItem {
  id: string;
  url: string;
  thumbnail: string;
  videoId: string;
  title: string;
  subtitle?: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: '1',
    url: 'https://youtube.com/shorts/QCk87p6eeRs',
    thumbnail: 'https://img.youtube.com/vi/QCk87p6eeRs/maxresdefault.jpg',
    videoId: 'QCk87p6eeRs',
    title: 'Velvet Glow Routine',
    subtitle: 'Watch the magic unfold',
  },
  {
    id: '2',
    url: 'https://youtube.com/shorts/-gqAxmWd8N4',
    thumbnail: 'https://img.youtube.com/vi/-gqAxmWd8N4/maxresdefault.jpg',
    videoId: '-gqAxmWd8N4',
    title: 'Skin Transformation',
    subtitle: 'Real results, real skin',
  },
  {
    id: '3',
    url: 'https://youtube.com/shorts/k0eWHQPoKSY',
    thumbnail: 'https://img.youtube.com/vi/k0eWHQPoKSY/maxresdefault.jpg',
    videoId: 'k0eWHQPoKSY',
    title: 'Behind the Formulas',
    subtitle: 'Science meets luxury',
  },
];

// Load YouTube IFrame API once globally
let ytApiReady = false;
let ytApiCallbacks: (() => void)[] = [];

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (ytApiReady) {
      resolve();
      return;
    }

    ytApiCallbacks.push(resolve);

    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      return; // script already loading
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      ytApiReady = true;
      ytApiCallbacks.forEach((cb) => cb());
      ytApiCallbacks = [];
    };
  });
}

const VideoCard: React.FC<{ video: VideoItem; index: number }> = ({ video, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerDivId = `yt-player-${video.id}`;

  const initPlayer = useCallback(async () => {
    await loadYouTubeAPI();

    const YT = (window as any).YT;
    if (!YT?.Player) return;

    playerRef.current = new YT.Player(playerDivId, {
      videoId: video.videoId,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: video.videoId,
        rel: 0,
        modestbranding: 1,
        controls: 0,
        showinfo: 0,
        iv_load_policy: 3,
        disablekb: 1,
        fs: 0,
        playsinline: 1,
        cc_load_policy: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: (event: any) => {
          event.target.setPlaybackQuality('hd1080');
          event.target.playVideo();
        },
      },
    });
  }, [video.videoId, playerDivId]);

  useEffect(() => {
    if (isPlaying) {
      initPlayer();
    }

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isPlaying, initPlayer]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIsMuted(true);
  };

  const handleClose = () => {
    if (playerRef.current?.destroy) {
      playerRef.current.destroy();
      playerRef.current = null;
    }
    setIsPlaying(false);
    setIsMuted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(100);
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      viewport={{ once: true }}
      className="group flex flex-col"
    >
      {/* Video Container */}
      <div
        className="relative aspect-[9/16] rounded-[2rem] overflow-hidden bg-zinc-100 cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
        onClick={!isPlaying ? handlePlay : undefined}
        ref={containerRef}
      >
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-colors"
              >
                <Play size={28} className="text-brand ml-1" fill="currentColor" />
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white text-sm font-bold uppercase tracking-widest opacity-80">
                {video.subtitle}
              </p>
            </div>
          </>
        ) : (
          /* Embedded YouTube Player — fully branded-free */
          <div className="relative w-full h-full overflow-hidden bg-black">
            {/* Scale the player larger to crop YouTube UI at edges */}
            <div className="absolute inset-[-15%] z-0">
              <div
                id={playerDivId}
                className="w-full h-full"
              />
            </div>

            {/* Top overlay to hide title/channel bar */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />

            {/* Bottom overlay to hide YouTube logo */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

            {/* Mute/Unmute Button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-5 left-5 z-20 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 border border-white/20"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className="absolute top-4 right-4 z-20 w-9 h-9 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 border border-white/20 text-sm font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Title Below Video */}
      <div className="pt-5 px-1 space-y-1">
        <h4 className="text-lg font-display font-bold text-brand tracking-tight leading-snug">
          {video.title}
        </h4>
        <div className="pt-2">
          <span className="inline-block bg-brand text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
            {video.subtitle}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const VideoShowcase: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="flex items-center space-x-3">
            <span className="h-px w-8 bg-brand" />
            <span className="text-brand text-xs font-bold tracking-[0.3em] uppercase">
              As Seen On
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-brand tracking-tighter leading-none">
            THE VELVET <br />
            <span className="italic font-serif font-light">Diaries.</span>
          </h2>
          <p className="text-zinc-500 font-light text-lg">
            Real skin. Real stories. See how our community is achieving their glow-up with Velvet.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {VIDEOS.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} />
        ))}
      </div>
    </section>
  );
};

export default VideoShowcase;
