import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const Authors = (props) => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/authors")
            .then((res) => {
                setAuthors(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:5000/api/authors/" + delId)
            .then((res) => {
                // At this point it is deleted from DB but we need to cause a re-render to remove it from the page.
                const filteredAuthors = authors.filter((author) => {
                    return author._id !== delId;
                });

                setAuthors(filteredAuthors);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to="/authors/new">Add an Author</Link>
            <p>We have quotes by:</p>
            <div style={{ width: "75%", margin: "0 auto", padding: "20px" }}>
                <table class="table table-success table-striped table-bordered" >
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Actions available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authors.map((author) => {
                            return (

                                <tr key={author._id} >
                                    <td>
                                        <Link to={"/authors/" + author._id}>{author.name}</Link>
                                    </td>
                                    <td>
                                        <span>
                                            <Link
                                                to={`/authors/${author._id}/edit`}
                                                className="btn btn-sm btn-outline-warning mx-1"
                                            >
                                                Edit
                                            </Link>
                                        </span>
                                        <span
                                            onClick={(e) => {
                                                handleDelete(author._id);
                                            }}
                                            style={{ color: "red", cursor: "pointer" }}
                                        >
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Authors;