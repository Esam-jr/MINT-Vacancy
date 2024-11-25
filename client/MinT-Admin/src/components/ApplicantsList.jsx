import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

function ApplicantsList() {
  const [applicants, setApplicants] = useState([]); // Updated state name to plural to indicate it holds multiple applicants
  // const [error, setError] = useState(null); // State to manage any errors during fetch

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("http://localhost:1234/list-applicants");

        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }

        const data = await response.json();
        setApplicants(data); // Set fetched applicants to state
        // console.log(data);
      } catch (e) {
        setError(e.message); // Set error message to state
        console.error("Error fetching applicants:", e);
      }
    };

    fetchApplicants();
  }, []);

  return (
    <Container className="applicants">
      <Row className="border-bottom border-success-subtle border-3 text-center fs-4 fw-bold">
        <Col className="border-end  border-success-subtle border-3 col-1 text-start">
          #
        </Col>
        <Col className="border-end  border-success-subtle border-3 col-4">
          Full Name
        </Col>
        <Col className="border-end  border-success-subtle border-3 col-1 px-2">
          Age
        </Col>
        <Col className="border-end  border-success-subtle border-3 col-3">
          Apply For
        </Col>
        <Col className="border-end  border-success-subtle border-3 col-1 px-1">
          Ex. Year
        </Col>
        <Col className="col-2">Study</Col>
      </Row>

      {applicants?.map((applicant, i) => (
        <Link
          to={`${applicant.personal_id}_${applicant.first_name}`}
          className="link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          key={i}
        >
          <Row className="border-top border-success-subtle border-3 fs-4">
            <Col className="border-end  border-success-subtle border-3 col-1">
              {i + 1}
            </Col>
            <Col className="border-end  border-success-subtle border-3 col-4">
              {`${applicant.first_name} ${applicant.last_name}`}
            </Col>
            <Col className="border-end  border-success-subtle border-3 col-1">
              {`${applicant.age}`}
            </Col>
            <Col className="border-end  border-success-subtle border-3 col-3">
              {`${applicant.apply_for}`}
            </Col>
            <Col className="border-end  border-success-subtle border-3 col-1">
              {`${applicant.experience_year}`}
            </Col>
            <Col className="col-2">{`${applicant.field_study}`}</Col>
          </Row>
        </Link>
      ))}
    </Container>
  );
}

export default ApplicantsList;
