// Split & Sip: the home page
import { Link } from "react-router";

function HomePage({ user }) {
  // Nobody logged in: a welcome message
  if (!user) {
    return (
      <div className="page">
        <h2>Welcome to Split & Sip</h2>
        <p>Split trips, dinners and bills with your friends, and save together for your next plan.</p>
        <p><Link to="/register">Register</Link> or <Link to="/login">log in</Link>.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Hi, {user.name}</h2>
      <p><Link to="/groups">My groups and expenses</Link></p>
      <p><Link to="/goals">My savings goals</Link></p>
      <p><Link to="/plans">My hangout plans</Link></p>
    </div>
  );
}

export default HomePage;
