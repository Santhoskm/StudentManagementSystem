const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
path.resolve()
//app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "system",
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.json({ Message: "Error inside server" });
        }

        return res.json(result);
    });
});

// POST a new student
app.post("/students", (req, res) => {
    const { first_name, last_name, location, email, dob, education, about } =
        req.body;
    console.log(req.body)
    const sql =
        "INSERT INTO students (first_name, last_name, location, email, dob, education, about) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
        sql,
        [first_name, last_name, location, email, dob, education, about],
        (err, result) => {
            if (err) {
                console.error("Error creating student:", err);
                return res.status(500).json({ error: "Error creating student" });
            }
            console.log("Student created:", result);
            return res.status(200).json({ message: "Student created successfully" });
        }
    );
});

// Read the existing student for Updating the student
app.get("/read/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM students WHERE id =?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error querying the database:", err);
            return res.status(500).json({ Message: "Error inside server" });
        }
        return res.status(200).json(result);
    });
});
// UPDATE the existing student
app.put("/edit_user/:id", (req, res) => {
    const sql = "UPDATE students SET `first_name` = ?, `last_name` = ?, `email` = ?, `location` = ?, `dob` = ?, `education` = ?, `about`= ? WHERE id = ?";
    const id = req.params.id;
    console.log(id)
    const { first_name, last_name, location, email, dob, education, about } = req.body;
    db.query(
        sql,
        [first_name, last_name, email, location, dob, education, about, id],
        (err, result) => {
            if (err) {
                console.error("Error updating student:", err);
                return res.status(500).json({ error: "Error updating student" });
            }
            console.log("Student updated:", result);
            return res.status(200).json({ message: "Student updated successfully" });
        }
    );
});
// DELETE the student
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM students WHERE id =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).json({ error: "Error deleting student" });
        }
        console.log("Student Deleted:", result);
        return res.status(200).json({ message: "Student deleted successfully" });
    });
});




app.listen(port, () => {
    console.log(`listening on port ${port} `);
});


// app.route("/edit_user").put((req, res) => {
//     const sql =
//         "UPDATE students SET `first_name` = ?, `last_name` = ?, `email` = ?, `location` = ?, `dob` = ?, `education` = ?, `about`= ? WHERE student_id = ?";
//     const id = req.params.id;
//     const { first_name, last_name, location, email, dob, education, about } =
//         req.body;
//     db.query(
//         sql,
//         [first_name, last_name, email, location, dob, education, about, id],
//         (err, result) => {
//             if (err) {
//                 console.error("Error updating student:", err);
//                 return res.status(500).json({ error: "Error updating student" });
//             }
//             console.log("Student updated:", result);
//             return res.status(200).json({ message: "Student updated successfully" });
//         }
//     );

