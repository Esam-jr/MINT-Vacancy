import { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';
import '../assets/css/adminList.css';
import edit from '../assets/img/edit.svg';
import svgTrash from '../assets/img/trash.svg';

function AdminList() {
  const context = useContext(MyContext);
  const { currentAdmin } = context;
  //   console.log(currentAdmin);
  const [adminList, setAdminList] = useState([]);

  const handleAdminList = async function () {
    try {
      const response = await fetch(`http://localhost:1234/list-admins`);
      const data = await response.json();
      // console.log(data);
      setAdminList(() =>
        data.filter(admin => currentAdmin.admin_id !== admin.admin_id)
      );
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    handleAdminList();
  }, []);

  const handleDeleteAdmin = async id => {
    try {
      const sure = confirm('Are you sure you want to delete');
      if (sure) {
        await fetch(`http://localhost:1234/delete-admin/${id}`, {
          method: 'DELETE',
        });
        const updatedAdminList = adminList.filter(admin => admin.id !== id);
        setAdminList(updatedAdminList);
        handleAdminList();
        return;
      }
      return;
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Container className="applicants">
        <Row className="border-bottom border-success-subtle border-3 text-center fs-4 fw-bold">
          <Col className="border-end  border-success-subtle border-3 col-1 text-start">
            #
          </Col>
          <Col className="border-end  border-success-subtle border-3 col-2">
            Username
          </Col>
          <Col className="border-end  border-success-subtle border-3 col px-2">
            Email
          </Col>
          {currentAdmin.username === 'imran' && (
            <Col className="border-end  border-success-subtle border-3 col px-2">
              Functionality
            </Col>
          )}
          <Col className="col-1 px-2">Role</Col>
        </Row>

        {adminList?.map((admin, i) => (
          <Row
            className="border-top border-success-subtle border-3 fs-4"
            key={i}
          >
            <Col className="border-end  border-success-subtle border-3 col-1">
              {i + 1}
            </Col>
            <Col className="border-end  border-success-subtle border-3 col-2">
              {`${admin.username}`}
            </Col>
            <Col className="border-end  border-success-subtle border-3 col">
              {`${admin.email}`}
            </Col>
            {currentAdmin.username === 'imran' && (
              <Col className="border-end  border-success-subtle border-3 col position-relative text-center">
                <Link onClick={() => handleDeleteAdmin(admin.admin_id)}>
                  <svg className="admin__icon">
                    <use xlinkHref={`${svgTrash}#trash-solid`}></use>
                  </svg>
                </Link>
                <Link onClick={() => console.log('hello')} className="ms-5">
                  <svg className="admin__icon">
                    <use
                      xlinkHref={`${edit}#user-pen-solid`}
                      fill="orange"
                    ></use>
                  </svg>
                </Link>
              </Col>
            )}
            <Col className="col-1 px-2">{admin.role}</Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default AdminList;
