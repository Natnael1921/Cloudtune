import { NavLink } from "react-router-dom";
export function NavBar({ query, setQuery }) {
  return (
    <nav className="nav-bar">
      <div className="logo">
        <NavLink to="/Home">
        <img
          className="logo-image"
          src="public/logo.png"
        /></NavLink>
        <p className="logo">Cloudtune</p>
      </div>
      <div className="search-bar">
        <input
          className="input"
          type="text"
          placeholder="search for music..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="nav">
        <NavLink to="/liked">Liked ❤️</NavLink>
        <NavLink to="/playlist">Playlist 🎼</NavLink>
      </div>
    </nav>
  );
}
