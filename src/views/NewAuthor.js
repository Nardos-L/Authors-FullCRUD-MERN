import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";

const NewAuthor = (props) => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(null);

    const handleCancel = (event) => {
        event.preventDefault();
        navigate("/authors");
    }

    const handleNewAuthorSubmit = (event) => {
        event.preventDefault();

        const newAuthor = {
            name: name,
        };

        axios
            .post("http://localhost:5000/api/authors", newAuthor)
            .then((res) => {
                //navigate("/authors/" + res.data._id);
                navigate("/authors/");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response?.data?.errors);
            });
    };

    return (
        <div className="w-50 p-4 rounded mx-auto ">
            <h3 className="text-center">Favorite authors</h3>
            <Link to={"/authors/"}>Home</Link>
            <p>Add a new author:</p>
            <form
                onSubmit={(e) => {
                    handleNewAuthorSubmit(e);
                }}
            >
                <div className="form-group">
                    <label className="h6">Name: </label>
                    {errors?.name && (
                        <span style={{ color: "red" }}>{errors.name.message}</span>
                    )}
                    <input className="form-control"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                    />
                </div>
                <button className="btn btn-sm btn btn-primary mt-2" onClick={(e) => {
                    handleCancel(e);
                }}>Cancel</button>
                <input className="btn btn-sm btn btn-primary mt-2 ms-2" type="submit" />
            </form>
        </div>
    );
};

export default NewAuthor;