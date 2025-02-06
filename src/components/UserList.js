import { useState, useEffect } from "react";
import { getUsers, deleteUser } from "../services/api";
import { Button, Table, Container, Alert } from "react-bootstrap";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";


function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Set total pages dynamically
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await getUsers(page);
      setUsers(response.data);
      setTotalPages(Math.ceil(response.headers["x-total-count"]/5)); // Set the number of pages (should come from API)
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      //adding
      if(users.length===1 && currentPage>1){
        setCurrentPage(currentPage-1);
      }



    } catch {
      setError("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    navigate(`/edit/${user.id}`);
  };

  const handleAdd = () => {
    navigate("/add");
  };

  return (
    <Container>
        
      <h1 className="my-4">User List</h1>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" className="mb-3" onClick={handleAdd}>
        Add User
      </Button>
      
    </Container>
  );
}

export default UserList;