import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import Edit from './Edit';

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    async function fetchRecords() {
        try {
            const res = await axios.get('http://localhost:5000/');
            console.log(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    async function updateData() {
        const response = await fetchRecords();
        console.log(typeof response);
        setData(Array.isArray(response) ? response : []);
    }

    useEffect(() => {
        updateData();
    }, [data]);

    useEffect(() => {
        if (deleted) {
            setDeleted(false);
            axios.get('/students')
                .then((res) => {
                    setData(Array.isArray(res.data) ? res.data : []);
                })
                .catch((err) => console.log(err));
        }
    }, [deleted]);

    function handleDelete(id) {
        axios.delete(`/delete/${id}`)
            .then((res) => {
                setDeleted(true);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="container">
            <h3>Student Management System</h3>
            <div className="container mt-4 d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
                <InputGroup className="me-3" style={{ width: "20%" }} >
                    <Form.Control
                        type="text"
                        placeholder="Search"
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "#F0F0F0",
                            borderColor: "#F0F0F0",
                        }}
                    />
                    <InputGroup.Text
                        style={{
                            backgroundColor: "#F0F0F0",
                            borderColor: "#F0F0F0",
                        }}
                    >
                        <FaSearch />
                    </InputGroup.Text>
                </InputGroup>
                <div className='d-flex justify-content-end'>
                    <Link className='btn btn-dark' to='/create'>Add</Link>
                </div>
            </div>
            <table className="container-fluid">
                <thead>
                    <tr>
                        <th className="py-10 px-2">ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>DOB</th>
                        <th>Education</th>
                        <th>Action</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tr>
                    <td colSpan="9">
                        <hr />
                    </td>
                </tr>
                <tbody>
                    {data.length > 0 ? data.map((student) => (
                        <tr key={student.id}>
                            <td className="text-center">{student.ID}</td>
                            <td className="text-center">{student.first_name}</td>
                            <td className="text-center">{student.last_name}</td>
                            <td className="text-center">{student.location}</td>
                            <td className="text-center">
                                <a href={"mailto:" + student.email}>{student.email}</a>
                            </td>
                            <td className="text-center">{student.DOB}</td>
                            <td className="text-center">{student.education}</td>
                            <td>
                                <Link className='text-center' to={`/edit/${student.ID}`} >Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(student.id)} className='btn mx-2 btn-danger'>Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="9" className="text-center">No records found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
