import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Read from './Read';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const navigate = useNavigate();



    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

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
            <div >
                <Read />
            </div>
            <div className="pl-16">

                <table className="container-fluid ">
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
                            <tr className="h-[180px]" key={student.id}>
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
                                    <Button
                                        className="text-center"
                                        onClick={() => handleEdit(student.ID)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(student.id)} className='text-center'>Delete</Button>
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


        </div>
    );
}

export default Home;
