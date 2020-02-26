import React, { Component } from "react";
import { Table } from "react-bootstrap";

class List extends Component {
  render() {
    const {
      data: { users }
    } = this.props;
    const userList = users.length ? (
      users.map((user, i) => (
        <tr key={i}>
          <td>{user.uid}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
        </tr>
      ))
    ) : (
      <tr className="text-center">
        <td colSpan="6">No result found!</td>
      </tr>
    );

    // return
    return (
      <>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email ID</th>
            </tr>
          </thead>
          <tbody>{userList}</tbody>
        </Table>
      </>
    );
  }
}

export default List;
