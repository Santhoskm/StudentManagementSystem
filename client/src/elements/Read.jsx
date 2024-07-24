import React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaExchangeAlt } from "react-icons/fa";

const Read = () => {
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate("/create");
    };

    return (
        <div className="container mt-4 d-flex justify-content-between align-items-center" style={{ marginBottom: "20px" }}>
            < TextField
                variant="outlined"
                placeholder="Search"
                style={{
                    paddingLeft: "10px",
                    width: "27%",
                    height: "18%",
                    borderRadius: "5px",
                    backgroundColor: "#F0F0F0",
                }
                }
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" style={{ paddingRight: "12px" }}>
                            <SearchIcon fontSize="medium" />
                        </InputAdornment>
                    ),
                    style: {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderWidth: "0",
                        },
                    },
                }}
            />
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
