// rafce
import React, { useState } from "react";
// functions
import { addBook } from "../../functions/book"
import { toast } from 'react-toastify';

const CreateBook = () => {
    const [value, setValue] = useState({
        title: "",
        review: "",
        price: "",
        urlimg: "",
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(value);
        if (value.password !== value.password1) {
            toast.error("Password not match");
        } else {
            //code
            addBook(value)
                .then((res) => {
                    // console.log('res.data==',res.data);
                    toast.success("Add Book Succes");
                })
                .catch((err) => {
                    console.log(err.response.data);
                    toast.error(err.response.data);
                });
        }
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>เพิ่มหนังสือ</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>book Title</label>
                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>book Review</label>
                            <input
                                className="form-control"
                                type="text"
                                name="review"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>price</label>
                            <input
                                className="form-control"
                                type="number"
                                name="price"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>link image</label>
                            <input
                                className="form-control"
                                type="text"
                                name="urlimg"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Upload</span>
                            </div>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                            </div>
                        </div>
                        <br />
                        <button
                            className="btn btn-success"
                        >Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;
