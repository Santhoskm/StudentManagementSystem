import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function Home() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);

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

    // Handle delete button click
    const handleDelete = (id) => {
        setSelectedStudentId(id);
        setOpen(true);
    }

    // Confirm delete action
    const confirmDelete = () => {
        if (selectedStudentId) {
            axios.delete(`http://localhost:5000/delete/${selectedStudentId}`)
                .then(() => {
                    updateData(); // Refresh data after deletion
                    handleClose(); // Close the dialog
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(
                            "Server responded with status code:",
                            err.response.status
                        );
                    } else if (err.request) {
                        console.log("No response received from server");
                    } else {
                        console.log("Error:", err.message);
                    }
                });
        }

        setOpen(false);
    }
    // Handle dialog close
    const handleClose = () => {
        setOpen(false);
    };


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
                            <td className="text-center">{student.dob}</td>
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmDelete}
                        color="secondary"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    );
}

export default Home;
