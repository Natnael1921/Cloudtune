import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { CurrentlyPlaying } from "../components/CurrentlyPlaying";

export const topArtist = [
  { poster: "/Eminem.jpg", name: "Eminem" },
  { poster: "/Rihanna.jpg", name: "Rihanna" },
  { poster: "/Drake.jpg", name: "Drake" },
  { poster: "/Weeknd.jpg", name: "The Weeknd" },
  { poster: "/Travis.webp", name: "Travis Scott" },
  { poster: "/Kendrick.jpg", name: "Kendrick lamar" },
  { poster: "/Adele.jpg", name: "Adele" },
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
  const [query, setQuery] = useState("a");
  const [musics, setMusics] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* MOBILE PLAYER STATES */
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePlayer, setShowMobilePlayer] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function handleLikeButton(id) {
    setMusics((prev) =>
      prev.map((music) =>
        music.id === id ? { ...music, liked: !music.liked } : music,
      ),
    );
  }

  useEffect(() => {
    const defaultQuery = "lofi";

    async function fetchMusics() {
      try {
        setIsLoading(true);
        setError(null);

        const searchQuery = query || defaultQuery;

        const res = await fetch(
          `https://corsproxy.io/?https://api.deezer.com/search?q=${encodeURIComponent(
            searchQuery,
          )}`,
        );

        const data = await res.json();

        const musics = data.data.map((music) => ({
          poster: music.album.cover_medium,
          title: music.title,
          artist: music.artist.name,
          preview: music.preview,
          id: music.id,
          liked: false,
        }));

        setMusics(musics);
      } catch {
        setError("Failed to load music.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMusics();
  }, [query]);

  useEffect(() => {
    setMusics((prev) =>
      prev.map((music) => ({
        ...music,
        liked: liked.some((l) => l.poster === music.poster),
      })),
    );
  }, [liked]);

  return (
    <div>
      <NavBar query={query} setQuery={setQuery} topArtist={topArtist} />

      <div className="main-container">
        {!isMobile && (
          <Sidebar
            currentlyPlaying={currentlyPlaying}
            currentTitle={currentTitle}
            currentArtist={currentArtist}
            currentPoster={currentPoster}
            audioRef={audioRef}
            setQuery={setQuery}
            topArtist={topArtist}
          />
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <MainPage
            musics={musics}
            handlePlay={handlePlay}
            currentlyPlaying={currentlyPlaying}
            isPlaying={isPlaying}
            handlePlayPause={(music) => {
              handlePlayPause(music);
              if (isMobile) setShowMobilePlayer(true);
            }}
            handleLiked={handleLiked}
            handleLikeButton={handleLikeButton}
          />
        )}
      </div>

      {/* MOBILE PLAYER */}
      {isMobile && currentlyPlaying && (
        <CurrentlyPlaying
          currentlyPlaying={currentlyPlaying}
          currentPoster={currentPoster}
          currentTitle={currentTitle}
          currentArtist={currentArtist}
          audioRef={audioRef}
          showPlayer={showMobilePlayer}
          setShowPlayer={setShowMobilePlayer}
        />
      )}
    </div>
  );
}

//  MAIN PAGE
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
          <img className="music-poster" src={music.poster} />
          <span
            className={music.liked ? "liked-button" : "not-liked-button"}
            onClick={() => {
              handleLiked(
                music.poster,
                music.title,
                music.artist,
                music.preview,
              );
              handleLikeButton(music.id);
            }}
          >
            {music.liked ? "❤️" : "♡"}
          </span>
          <p className="music-title">{music.title}</p>
          <p className="music-artist">{music.artist}</p>

          {currentlyPlaying === music.preview ? (
            <img
              src={isPlaying ? "/play.png" : "/pause.png"}
              className="corner-image"
              onClick={() => handlePlayPause(music)}
            />
          ) : (
            <img
              src="/pause.png"
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

//  LOADER
function Loader() {
  return (
    <div className="loader">
      Musics Loading...
      <span className="spinner">🔃</span>
    </div>
  );
}

//SIDEBAR
export function Sidebar({
  currentlyPlaying,
  currentArtist,
  currentTitle,
  currentPoster,
  audioRef,
  setQuery,
  topArtist,
}) {
  return (
    <div className="side-bar">
      <div className="current-music">
        <p className="current-title-artist">
          ♪ {currentArtist} - {currentTitle} ♪
        </p>
        <img className="current-poster" src={currentPoster} />
        {currentlyPlaying && (
          <audio ref={audioRef} src={currentlyPlaying} controls autoPlay />
        )}
      </div>

      <div className="top-artists-container">
        <strong className="header">Top Artists</strong>
        {(topArtist || []).map((artist, index) => (
          <div
            key={index}
            className="top-artists"
            onClick={() => setQuery && setQuery(artist.name)}
          >
            <img src={artist.poster} className="artist-image" />
            <p className="artist-name">{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
