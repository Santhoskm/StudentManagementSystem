import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const Read = () => {
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/create");
    };

    return (
        <div className="container mt-4 d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
            <div className="mb-3">
                <InputGroup>
                    <Form.Control
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <Button variant="outline-secondary">
                        <FaSearch />
                    </Button>
                </InputGroup>
            </div>
            < div className="pl-5" >
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: "black",
                        borderRadius: "25px",
                        height: "48px",
                        width: "148px",
                        marginLeft: "auto",
                    }}
                    onClick={handleAddClick}
                    className="ml-auto"
                >
                    Add
                </Button>
            </div >
        </div >
    );
};

export default Read;
