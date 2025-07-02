import React, { useRef } from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import Liked from "./pages/Liked";
import PlayList from "./pages/PlayList";
import { useLocalStorage } from "./useLocalStorage";
export default function App() {
  const tempPoster = "public/disk-removebg-preview.png";
  const [liked, setLiked] = useLocalStorage([],"liked");
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [currentPoster, setCurrentPoster] = useState(tempPoster);
  const [currentTitle, setCurrentlyTitle] = useState("no music played");
  const [currentArtist, setCurrentlyArtist] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();

  function handleLiked(likedPoster, likedTitle, likedArtist, preview) {
    setLiked((prevLiked) => {
      const alreadyLiked = prevLiked.find(
        (song) =>
          song.poster === likedPoster &&
          song.title === likedTitle &&
          song.artist === likedArtist
      );

      if (alreadyLiked) {
        return prevLiked.filter(
          (song) =>
            !(
              song.poster === likedPoster &&
              song.title === likedTitle &&
              song.artist === likedArtist
            )
        );
      } else {
        const newLikedSong = {
          poster: likedPoster,
          artist: likedArtist,
          title: likedTitle,
          preview,
          id: Date.now(),
        };
        return [...prevLiked, newLikedSong];
      }
    });
  }

  function handlePlay(audio) {
    setCurrentlyPlaying(audio);
  }
  function handlePlayPause(music) {
    if (currentlyPlaying === music.preview) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentPoster(music.poster);
      setCurrentlyTitle(music.title);
      setCurrentlyArtist(music.artist);
      setIsPlaying(true);
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Home"
          element={
            <HomePage
              handleLiked={handleLiked}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              setCurrentlyArtist={setCurrentlyArtist}
              currentArtist={currentArtist}
              setCurrentlyTitle={setCurrentlyTitle}
              currentTitle={currentTitle}
              setCurrentPoster={setCurrentPoster}
              currentPoster={currentPoster}
              setCurrentlyPlaying={setCurrentlyPlaying}
              currentlyPlaying={currentlyPlaying}
              handlePlay={handlePlay}
              audioRef={audioRef}
              handlePlayPause={handlePlayPause}
              liked={liked}
            />
          }
        />
        <Route
          path="/liked"
          element={
            <Liked
              liked={liked}
              isPlaying={isPlaying}
              currentlyPlaying={currentlyPlaying}
              handlePlay={handlePlay}
              currentArtist={currentArtist}
              currentPoster={currentPoster}
              currentTitle={currentTitle}
              setLiked={setLiked}
              handlePlayPause={handlePlayPause}
            />
          }
        />
        <Route path="/playlist" element={<PlayList />} />
      </Routes>
    </BrowserRouter>
  );
}
