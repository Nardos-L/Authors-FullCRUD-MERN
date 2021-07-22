import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { Link } from "@reach/router";

const EditAuthor = (props) => {
    const [name, setName] = useState("");

    const [errors, setErrors] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/authors/" + props.id)
            .then((res) => {
                console.log(res);
                setName(res.data.name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    const handleEditAuthoronSubmit = (event) => {
        event.preventDefault();

        const editedAuthor = {
            name: name,
        };

        axios
            .put(
                `http://localhost:5000/api/authors/${props.id}`,
                editedAuthor
            )
            .then((res) => {
                console.log(res);
                navigate("/authors/" + props.id);
            })
            .catch((err) => {
                /* 
                This .catch only happens if the controller .catch has:
                res.status(400).json(err);
                */
                setErrors(err.response?.data?.errors);
                console.log(err);
            });
    };

    return (
        <div className="w-50 p-4 rounded mx-auto ">
            <h1 className="text-center">Favorite authors</h1>
            <Link to={"/authors/"}>Home</Link>
            <p>Edit this author</p>
            <form onSubmit={handleEditAuthoronSubmit}>
                <div className="form-group">
                    <label className="h6">Name: </label>
                    {errors?.name && (
                        <span className="text-danger">{errors?.name?.message}</span>
                    )}
                    <input className="form-control" type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <input className="btn btn-sm btn-outline-success mt-2" type="submit" />
            </form >
        </div>
    );
};

export default EditAuthor;