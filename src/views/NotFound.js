import { Link } from "@reach/router";
const NotFound = (props) => {
    return <div>We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?
        <Link to="/authors/new">Add an Author</Link>
    </div>;
};

export default NotFound;