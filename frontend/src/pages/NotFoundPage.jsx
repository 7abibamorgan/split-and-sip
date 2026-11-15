// Split & Sip: shown for any address we have no page for (Lab 7)
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="page">
      <h2>Page not found</h2>
      <p>There is nothing at this address.</p>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default NotFoundPage;
