import { useState } from "react";
import { NavLink } from "react-router-dom";

export function NavBar({ query, setQuery, topArtist }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav-bar">
      <div className="logo">
        <img src="/logo.png" className="logo-image" />
        <p className="logo-text">Cloudtune</p>
      </div>

      <input
        className="input"
        type="text"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </div>

      <div className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/liked" onClick={() => setMenuOpen(false)}>
          Liked
        </NavLink>

        <NavLink to="/playlist" onClick={() => setMenuOpen(false)}>
          Playlist
        </NavLink>

        {/* MOBILE TOP ARTISTS */}
        <div className="mobile-top-artists desktop-hidden">
          <p className="mobile-artists-title">Top Artists</p>
          {topArtist.map((artist) => (
            <p
              key={artist.name}
              className="mobile-artist"
              onClick={() => {
                setQuery(artist.name);
                setMenuOpen(false);
              }}
            >
              {artist.name}
            </p>
          ))}
        </div>
      </div>
    </nav>
  );
}
