// Split & Sip: the header, with who is logged in (Lab 9)
import { Link } from "react-router";

function Header({ user, onLogOut }) {
  return (
    <header className="header">
      <h1 id="project-name">Split & Sip</h1>
      <p>Split group expenses and save together</p>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/groups">My groups</Link>
            <Link to="/goals">Savings goals</Link>
            <Link to="/plans">Hangouts</Link>
            <span>Hi, {user.name}</span>
            <button onClick={onLogOut}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
