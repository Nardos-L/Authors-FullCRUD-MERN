import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";

const Author = (props) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/authors/" + props.id)
            .then((res) => {
                setAuthor(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate("/notFound")
            });
    }, [props.id]);

    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:5000/api/authors/" + delId)
            .then((res) => {
                navigate("/authors");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (author === null) {
        return "Loading...";
    }

    return (
        <div>
            <h2>Single Author View</h2>
            <Link to={"/authors/"}>Home</Link>
            <div style={{ width: "75%", margin: "0 auto", padding: "20px" }}>
                <h3>Name: {author.name}</h3>
                <div>
                    <span
                        onClick={(e) => {
                            handleDelete(author._id);
                        }}
                        style={{ color: "red", cursor: "pointer" }}
                    >
                        &#10006;
                    </span>


                </div>
            </div>
        </div>
    );
};

export default Author;