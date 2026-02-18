import { NavBar } from "../components/NavBar";
import { Sidebar } from "./HomePage";
import { topArtist } from "./HomePage"; 
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
      <NavBar topArtist={[]} />

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
            topArtist={topArtist}
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
                      src="/pause.png "
                      className="liked-corner-image"
                      onClick={() => handlePlayPause(music)}
                    />
                  ) : (
                    <img
                      src="/play.png"
                      className="liked-corner-image"
                      onClick={() => {
                        handlePlayPause(music);
                      }}
                    />
                  )
                ) : (
                  <img
                    src="/pause.png"
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
