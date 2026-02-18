import { useState } from "react";

export function CurrentlyPlaying({
  currentlyPlaying,
  currentPoster,
  currentTitle,
  currentArtist,
  audioRef,
  showPlayer,
  setShowPlayer,
}) {
  if (!currentlyPlaying) return null;

  return (
    <>
      {/* MINI PLAYER*/}
      {!showPlayer && (
        <div className="mobile-player-mini" onClick={() => setShowPlayer(true)}>
          <img src={currentPoster} />
          <div>
            <p>{currentTitle}</p>
            <span>{currentArtist}</span>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={currentlyPlaying}
        autoPlay
        style={{ display: "none" }} 
      />

      {/* FULL PLAYER */}
      {showPlayer && (
        <div className="mobile-player-full">
          <button className="mobile-close" onClick={() => setShowPlayer(false)}>
            ✕
          </button>
          <img src={currentPoster} className="mobile-full-poster" />
          <h2>{currentTitle}</h2>
          <p>{currentArtist}</p>
          <audio ref={audioRef} src={currentlyPlaying} controls autoPlay />
        </div>
      )}
    </>
  );
}
