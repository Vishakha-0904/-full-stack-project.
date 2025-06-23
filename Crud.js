


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CRUD = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     message: "",
//   });

//   const [data, setData] = useState([]);
//   const [editID, setEditID] = useState(null);

//   const { username, email, message } = formData;

//   // 🔹 Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔹 Submit new data (POST)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username && email && message) {
//       axios
//         .post("https://jsonplaceholder.typicode.com/posts", formData)
//         .then((res) => {
//           const newEntry = { ...formData, id: res.data.id };
//           setData([...data, newEntry]);
//           setFormData({ username: "", email: "", message: "" });
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   // 🔹 Update data (PUT)
//   const handleUpdate = () => {
//     if (editID && username && email && message) {
//       axios
//         .put(`https://jsonplaceholder.typicode.com/posts/${editID}`, formData)
//         .then((res) => {
//           const updatedData = data.map((item) =>
//             item.id === editID ? { ...formData, id: editID } : item
//           );
//           setData(updatedData);
//           setFormData({ username: "", email: "", message: "" });
//           setEditID(null);
//         })
//         .catch((err) => console.log(err));
//     }
//   };

//   // 🔹 Delete data (DELETE)
//   const handleDelete = (idToDelete) => {
//     axios
//       .delete(`https://jsonplaceholder.typicode.com/posts/${idToDelete}`)
//       .then(() => {
//         setData(data.filter((item) => item.id !== idToDelete));
//       })
//       .catch((err) => console.log(err));
//   };

//   // 🔹 Edit: Load data into form
//   const handleEdit = (item) => {
//     setFormData({
//       username: item.username,
//       email: item.email,
//       message: item.message,
//     });
//     setEditID(item.id);
//   };

//   // 🔹 Get data (GET)
//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/posts?_limit=5")
//       .then((res) => {
//         const formatted = res.data.map((item) => ({
//           id: item.id,
//           username: item.title || "Demo User",
//           email: `user${item.id}@example.com`,
//           message: item.body,
//         }));
//         setData(formatted);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-8 offset-md-2 mt-2">
//           <h4>Admin Page</h4>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="username">Username</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="username"
//                 placeholder="Enter username"
//                 name="username"
//                 value={username}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 placeholder="Enter email"
//                 name="email"
//                 value={email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="message">Message</label>
//               <textarea
//                 className="form-control"
//                 id="message"
//                 rows="3"
//                 placeholder="Enter message"
//                 name="message"
//                 value={message}
//                 onChange={handleChange}
//               ></textarea>
//             </div>

//             <button type="submit" className="btn btn-primary mr-2">
//               Submit
//             </button>
//             <button
//               type="button"
//               className="btn btn-warning"
//               onClick={handleUpdate}
//               disabled={!editID}
//             >
//               Update
//             </button>
//           </form>

//           <hr />

//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Message</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.id}>
//                   <td>{item.username}</td>
//                   <td>{item.email}</td>
//                   <td>{item.message}</td>
//                   <td>
//                     <button
//                       className="btn btn-warning btn-sm mr-2"
//                       onClick={() => handleEdit(item)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => handleDelete(item.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {data.length === 0 && (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     No entries yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CRUD;




import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { v4 as uuidv4 } from "uuid";

const SortableItem = ({ item, index, handleEdit, handleDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "#f9f9f9",
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.message}</td>
      <td>
        <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(item)}>Edit</button>
        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
      </td>
    </tr>
  );
};

const CRUD = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [data, setData] = useState([]);
  const [editID, setEditID] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.message) {
      const newEntry = { ...formData, id: uuidv4() };
      setData([...data, newEntry]);
      setFormData({ username: "", email: "", message: "" });
    }
  };

  const handleUpdate = () => {
    if (editID && formData.username && formData.email && formData.message) {
      setData((prev) =>
        prev.map((item) =>
          item.id === editID ? { ...formData, id: editID } : item
        )
      );
      setFormData({ username: "", email: "", message: "" });
      setEditID(null);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      username: item.username,
      email: item.email,
      message: item.message,
    });
    setEditID(item.id);
  };

  const handleDelete = (idToDelete) => {
    setData((prev) => prev.filter((item) => item.id !== idToDelete));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((i) => i.id === active.id);
      const newIndex = data.findIndex((i) => i.id === over?.id);
      setData((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="container mt-4">
      <h4>Admin Form</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary mr-2" type="submit">
          Submit
        </button>
        <button
          className="btn btn-warning"
          type="button"
          onClick={handleUpdate}
          disabled={!editID}
        >
          Update
        </button>
      </form>

      <hr />
      <h5 className="mt-4">Submitted Data (Drag to reorder)</h5>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.map((item) => item.id)} strategy={verticalListSortingStrategy}>
          <table className="table table-striped mt-3">
            <thead className="thead-dark">
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  index={index}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CRUD;
