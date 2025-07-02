import { NavBar } from "../components/NavBar";
import { Sidebar } from "./HomePage";
export default function Liked({
  liked,
  handlePlay,
  isPlaying,
  currentlyPlaying,
  currentArtist,
  currentPoster,
  currentTitle,
  setLiked,
  handlePlayPause,
}) {
  function handleDelete(id) {
    setLiked((liked) => liked.filter((music) => music.id !== id));
  }
  return (
    <div>
      <NavBar />

      <div>
        <div className="sidebar-liked">
          <Sidebar
            currentlyPlaying={currentlyPlaying}
            currentTitle={currentTitle}
            currentArtist={currentArtist}
            currentPoster={currentPoster}
            handleLiked={() => {}}
            handleLikeButton={() => {}}
            likeButton={false}
          />
        </div>
        <div className="liked-container">
          {liked.map((music, index) => (
            <div className="liked-music-card" key={index}>
              <div className="liked-card-container">
                <img
                  className="liked-music-poster"
                  src={music.poster}
                  alt={`${music.title}'s poster`}
                />
                <div>
                  <p className="liked-music-title">{music.title}</p>
                  <p className="liked-music-artist">{music.artist}</p>
                </div>

                {currentlyPlaying === music.preview ? (
                  !isPlaying ? (
                    <img
                      src="public/pause.png "
                      className="liked-corner-image"
                      onClick={() => handlePlayPause(music)}
                    />
                  ) : (
                    <img
                      src="public/play.png"
                      className="liked-corner-image"
                      onClick={() => {
                        handlePlayPause(music);
                      }}
                    />
                  )
                ) : (
                  <img
                    src="public/pause.png"
                    className="liked-corner-image"
                    onClick={() => {
                      handlePlayPause(music);
                      handlePlay(music.preview);
                    }}
                  />
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(music.id)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
