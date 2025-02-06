import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addUser, updateUser, getUserById } from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

function UserForm() {
  const { id } = useParams();
  const navigate= useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(true);
  

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await getUserById(id);
      setUser(response.data);
    } catch {
      setError("Failed to fetch user for editing");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email) {
      setIsValid(false);
      return;
    }
    try {
      if (user.id) {
        await updateUser(user.id, user);
      } else {
        await addUser(user);
        //adding
        setUser(prevUser=>[...prevUser,{...user,id:Date.now()}])
      }
      navigate("/");
    } catch(err)
     {
    console.log("failed to save user",err);
      setError("Failed to save user");
    }
  };

  return (
    <Container>
      <h1>{user.id ? "Edit User" : "Add User"}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {!isValid && (
        <Alert variant="warning">Please fill in all required fields</Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          {user.id ? "Update" : "Add"} User
        </Button>
      </Form>
    </Container>
  );
}

export default UserForm;