//import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// function Read() {
//   const [data, setData] = useState([]);
//   const { id } = useParams();
//   useEffect(() => {
//     axios
//       .get(`/get_student/${id}`)
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);
//   return (
//     <div className="container-fluid vw-100 vh-100 bg-primary">
//       <h1>User {id}</h1>
//       <Link to="/" className="btn btn-success">Back</Link>
//       {data.map((student) => {
//         return (
//           <ul className="list-group">
//             <li className="list-group-item">
//               <b>ID: </b>
//               {student["id"]}
//             </li>
//             <li className="list-group-item">
//               <b>FirstName: </b>
//               {student["firstname"]}
//             </li>
//             <li className="list-group-item">
//               <b>LastName: </b>
//               {student["lastname"]}
//             </li>
//             <li className="list-group-item">
//               <b>Location: </b>
//               {student["Location"]}
//             </li>
//             <li className="list-group-item">
//               <b>Email: </b>
//               {student["Email"]}
//             </li>
//             <li className="list-group-item">
//               <b>DOB: </b>
//               {student["DOB"]}
//             </li>
//             <li className="list-group-item">
//               <b>Education: </b>
//               {student["Education"]}
//             </li>
//           </ul>
//         );
//       })}
//     </div>
//   );
// }

//export default Read;
