import "./App.css";

import { Redirect, Router } from "@reach/router";
import NotFound from "./views/NotFound";
import Author from "./views/Author";
import Authors from "./views/Authors";
import NewAuthor from "./views/NewAuthor";
import EditAuthor from "./views/EditAuthor";

function App() {
  return (
    <div style={{ textAlign: "center", width: "80%", margin: "0 auto" }}>

      <Router>

        <Author path="/authors/:id" />
        <Authors path="/authors" />
        <EditAuthor path="/authors/:id/edit" />
        <NewAuthor path="/authors/new" />
        <Redirect from="/" to="/authors" noThrow="true" />
        {/* If no routes are matched, render this */}
        <NotFound default path="/notfound" />
      </Router>
    </div>
  );
}

export default App;