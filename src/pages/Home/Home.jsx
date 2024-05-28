import React ,{ useState } from "react";
import Header from "../../components/Header";
import { Table, Button,Pagination } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
const Home = () => {
  const data = [
    { id: 1, name: 'John Doe', role: 'Admin', dateCreated: '2023-01-01', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'User', dateCreated: '2023-02-15', status: 'Inactive' },
    { id: 3, name: 'Sam Johnson', role: 'Moderator', dateCreated: '2023-03-12', status: 'Active' },
    { id: 4, name: 'Emily Brown', role: 'Admin', dateCreated: '2023-04-05', status: 'Inactive' },
    { id: 5, name: 'Michael Green', role: 'User', dateCreated: '2023-05-20', status: 'Active' },
    { id: 6, name: 'Jessica White', role: 'Moderator', dateCreated: '2023-06-30', status: 'Inactive' },
    { id: 7, name: 'Daniel Black', role: 'Admin', dateCreated: '2023-07-15', status: 'Active' },
    { id: 8, name: 'Laura Wilson', role: 'User', dateCreated: '2023-08-22', status: 'Inactive' },
    { id: 9, name: 'James Taylor', role: 'Moderator', dateCreated: '2023-09-10', status: 'Active' },
    { id: 10, name: 'Sarah Lee', role: 'Admin', dateCreated: '2023-10-05', status: 'Inactive' },
    { id: 11, name: 'Chris Adams', role: 'User', dateCreated: '2023-11-10', status: 'Active' },
    { id: 12, name: 'Rebecca Moore', role: 'Moderator', dateCreated: '2023-12-01', status: 'Inactive' },
   
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleAction = (id) => {
    console.log(`Action clicked for user with id: ${id}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

 
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
    <Header/>
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td style={{
                display:"flex",
                flexDirection:"row",
                gap:"1rem"
              }}>
              <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&size=32`}
                  alt={user.name}
                  className="avatar"
                />
                {user.name}</td>
              <td>{user.role}</td>
              <td>{user.dateCreated}</td>
              <td>{user.status}</td>
              <td>
                <Button variant="primary" onClick={() => handleAction(user.id)}>
                  Action
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="Page">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
        />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} />
      </Pagination>
    </div>
    </>
  );
};

export default Home;
