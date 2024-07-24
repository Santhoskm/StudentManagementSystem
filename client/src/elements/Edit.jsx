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


  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudent({ ...values, [name]: value });
  };



  const [data, setData] = useState([]);
  const { id } = useParams();
  console.log(id)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/read/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      {data.map((student) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="first_name">First Name</label>
              <input
                value={student.name}
                type="text"
                name="first_name"
                required
                onChange={(e) =>
                  setData([{ ...data[0], first_name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="last_name">Last Name</label>
              <input
                value={student.name}
                type="text"
                name="last_name"
                required
                onChange={(e) =>
                  setData([{ ...data[0], last_name: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="location">Location</label>
              <input
                value={student.name}
                type="text"
                name="location"
                required
                onChange={(e) =>
                  setData([{ ...data[0], location: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">email</label>
              <input
                value={student.email}
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setData([{ ...data[0], email: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="dob">DOB</label>
              <input
                value={student.name}
                type="date"
                name="dob"
                required
                onChange={(e) =>
                  setData([{ ...data[0], dob: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="education">Education</label>
              <input
                value={student.gender}
                type="email"
                name="education"
                required
                onChange={(e) =>
                  setData([{ ...data[0], education: e.target.value }])
                }
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
            </div>
          </form>
        );
      })}
    </div>
  );
}

export default Edit;
