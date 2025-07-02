import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
const topArtist = [
  {
    poster: "public/Eminem.jpg",
    name: "Eminem",
  },
  {
    poster: "public/Rihanna.jpg",
    name: "Rihanna",
  },
  {
    poster: "public/Drake.jpg",
    name: "Drake",
  },
  {
    poster: "public/Weeknd.jpg",
    name: "The Weeknd",
  },
  {
    poster: "public/Travis.webp",
    name: "Travis Scott",
  },
  {
    poster: "public/Kendrick.jpg",
    name: "Kendrick lamar",
  },
  {
    poster: "public/Adele.jpg",
    name: "Adele",
  },
];
export function HomePage({
  handleLiked,
  handlePlay,
  currentlyPlaying,
  currentPoster,
  setCurrentPoster,
  currentTitle,
  setCurrentlyTitle,
  currentArtist,
  setCurrentlyArtist,
  isPlaying,
  setIsPlaying,
  audioRef,
  handlePlayPause,
  liked,
}) {
  const [query, setQuery] = useState(" a");
  const [musics, setMusics] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleLikeButton(id) {
    setMusics((prevMusics) =>
      prevMusics.map((music) =>
        music.id === id ? { ...music, liked: !music.liked } : music
      )
    );
  }

  useEffect(
    function () {
      const defaultQuery = "lofi";

      async function fetchMusics() {
        try {
          setIsLoading(true);
          setError(null);
          const searchQuery = query || defaultQuery;
          const res = await fetch(
            `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(
              searchQuery
            )}`
          );
          const data = await res.json();

          const musics = data.data.map((music) => ({
            poster: music.album.cover_medium,
            title: music.title,
            artist: music.artist.name,
            preview: music.preview,
            id: Date.now(),
            liked: false,
          }));

          setMusics(musics);
        } catch (err) {
          console.error("Error fetching music:", err.message);
          setError("Failed to load music.");
          setMusics([]);
        } finally {
          setIsLoading(false);
        }
      }

      fetchMusics();
    },
    [query]
  );
  useEffect(() => {
    setMusics((prevMusics) =>
      prevMusics.map((music) => ({
        ...music,
        liked: liked.some((likedSong) => likedSong.poster === music.poster),
      }))
    );
  }, [liked]);

  return (
    <div>
      <NavBar query={query} setQuery={setQuery} />
      <div className="main-container">
        <Sidebar
          currentlyPlaying={currentlyPlaying}
          currentTitle={currentTitle}
          currentArtist={currentArtist}
          currentPoster={currentPoster}
          handleLiked={handleLiked}
          handleLikeButton={handleLikeButton}
          audioRef={audioRef}
          setQuery={setQuery}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <MainPage
            handlePlay={handlePlay}
            musics={musics}
            setCurrentlyArtist={setCurrentlyArtist}
            setCurrentlyTitle={setCurrentlyTitle}
            setCurrentPoster={setCurrentPoster}
            currentlyPlaying={currentlyPlaying}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            audioRef={audioRef}
            handlePlayPause={handlePlayPause}
            handleLikeButton={handleLikeButton}
            currentArtist={currentArtist}
            currentTitle={currentTitle}
            currentPoster={currentPoster}
            handleLiked={handleLiked}
          />
        )}
      </div>
    </div>
  );
}

function MainPage({
  musics,
  handlePlay,
  currentlyPlaying,
  isPlaying,
  handlePlayPause,
  handleLiked,
  handleLikeButton,
}) {
  return (
    <div className="main-page">
      {musics.map((music, index) => (
        <div className="music-card" key={index}>
          <img
            className="music-poster"
            src={music.poster}
            alt={`${music.title}'s poster`}
          />
          <span
            className={music.liked ? "liked-button" : "not-liked-button"}
            onClick={() => {
              handleLiked(
                music.poster,
                music.title,
                music.artist,
                music.preview
              );
              handleLikeButton(music.id);
            }}
          >
            {music.liked ? "❤️" : "♡"}
          </span>
          <p className="music-title">{music.title}</p>
          <p className="music-artist">{music.artist}</p>
          {currentlyPlaying === music.preview ? (
            !isPlaying ? (
              <img
                src="public/pause.png "
                className="corner-image"
                onClick={() => {
                  handlePlayPause(music);
                }}
              />
            ) : (
              <img
                src="public/play.png"
                className="corner-image"
                onClick={() => {
                  handlePlayPause(music);
                }}
              />
            )
          ) : (
            <img
              src="public/pause.png"
              className="corner-image"
              onClick={() => {
                handlePlay(music.preview);
                handlePlayPause(music);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
function Loader() {
  return (
    <div className="loader">
      Musics Loading...
      <span className="spinner">🔃</span>
    </div>
  );
}

export function Sidebar({
  currentlyPlaying,
  currentArtist,
  currentTitle,
  currentPoster,
  audioRef,
  setQuery,
}) {
  return (
    <div className="side-bar">
      <div className="current-music">
        <p className="current-title-artist">
          ♪ {currentArtist} - {currentTitle} ♪
        </p>
        <div className="like-poster-playlist">
          <img className="current-poster" src={currentPoster} />
        </div>
        {currentlyPlaying && (
          <audio ref={audioRef} src={currentlyPlaying} controls autoPlay />
        )}
      </div>

      <div className="top-artists-container">
        <strong className="header">Top Artists</strong>
        {topArtist.map((artist) => (
          <div className="top-artists" onClick={() => setQuery(artist.name)}>
            <img src={artist.poster} className="artist-image" />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
