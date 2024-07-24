import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [values, setStudent] = useState({
    first_name: '',
    last_name: '',
    location: '',
    email: '',
    dob: '',
    education: '',
    about: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/read/${id}`)
      .then((res) => {
        setStudent(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudent({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/edit_user/${id}`, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center display-4 my-4">Edit Student</h3>
        <div className="d-flex justify-content-end my-3">
          <Link to="/" className="btn btn-dark">Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="first_name" className="form-label">First Name</label>
            <input
              type="text"
              name="first_name"
              value={values.first_name}
              required
              onChange={handleInputChange}
              className="form-control"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last_name" className="form-label">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={values.last_name}
              required
              onChange={handleInputChange}
              className="form-control"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input
              type="text"
              name="location"
              value={values.location}
              required
              onChange={handleInputChange}
              className="form-control"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              required
              onChange={handleInputChange}
              className="form-control"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">DOB</label>
            <input
              type="date"
              name="dob"
              value={values.dob}
              required
              onChange={handleInputChange}
              className="form-control"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="education" className="form-label">Education</label>
            <input
              type="text"
              name="education"
              value={values.education}
              required
              onChange={handleInputChange}
              className="form-control"
              style={{ maxWidth: '300px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="about" className="form-label">About</label>
            <textarea
              name="about"
              value={values.about}
              onChange={handleInputChange}
              className="form-control"
              rows="4"
              style={{ maxWidth: '500px' }}
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark mx-3">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
