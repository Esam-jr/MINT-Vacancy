import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

function Applicant() {
  const { applicantID } = useParams();
  const [applicant, setApplicant] = useState([]);
  const personalID = Number.parseInt(applicantID);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:1234/list-applicants");
        if (!response.ok) {
          throw new Error("Failed to fetch applicants");
        }
        const data = await response.json();
        setApplicant(() =>
          data.filter((applicant) => applicant.personal_id === personalID)
        );
      } catch (e) {
        console.log(e.message);
        alert(e.message);
      }
    })();
  }, [applicantID]);

  // Function to download CV
  const downloadCV = async (cvPath) => {
    try {
      const response = await fetch(
        `http://localhost:1234/download-cv/${personalID}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download CV");
      }

      // Get the blob from response and create a downloadable link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${applicant[0].first_name}_${applicant[0].last_name}_Document.pdf`; // Customize the file name
      a.click();
      window.URL.revokeObjectURL(url); // Clean up
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };

  // Function to send the acceptance email
  const sendAcceptanceEmail = async (email, firstName) => {
    const subject = "Interview Invitation";
    const text = `Dear ${firstName},

    We are pleased to inform you that you have been selected for the interview and written exam. Please come for the interview and exam at your earliest convenience.
    
    Best regards,
    Your Company`;

    const message = { to: email, subject, text };
    try {
      const response = await fetch("http://localhost:1234/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      alert("Email sent successfully!");
    } catch (e) {
      console.log(e.message);
      alert(e.message);
    }
  };

  return (
    <>
      {applicant.map((info, i) => (
        <Card key={i} className="applicant">
          <Card.Header
            as="h3"
            className="text-center p-4"
          >{`HI! I am ${info.first_name} ${info.last_name} You can see my detail 👇`}</Card.Header>
          <Card.Body className="p-5">
            <Card.Title className="fs-2">Personal Information</Card.Title>
            <ul className="">
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Age: {info.age}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Gender: {info.gender}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Email:{" "}
                <Card.Link href={`mailto:${info.email}}`}>
                  {info.email}
                </Card.Link>
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Phone Number:{" "}
                <Card.Link href={`tel:${info.phone_number}`}>
                  {info.phone_number}
                </Card.Link>
              </Card.Text>
            </ul>
            <Card.Title className="fs-2">Educational Information</Card.Title>
            <ul>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Degree: {info.degree_obtained}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Study: {info.field_study}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Institution Name: {info.institution_name}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Graduation Date: {info.graduation_date}
              </Card.Text>
            </ul>
            <Card.Title className="fs-2">Work Experience</Card.Title>
            <ul>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Previous Job: {info.job_title}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Previous Company: {info.company_name}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Experience Year: {info.experience_year}
              </Card.Text>
              <Card.Text as="li" className="applicant__text fs-4 text-black">
                Apply For: {info.apply_for}
              </Card.Text>
            </ul>

            <Card.Text className="ps-4 fs-3">{info.job_description}</Card.Text>

            {/* Download CV button */}
            <Button
              variant="primary"
              className="w-100"
              onClick={() => downloadCV(info.cv)}
            >
              Download Document
            </Button>
            {/* Send Acceptance Email Button */}
            <Button
              variant="primary"
              className="w-100 mt-3"
              onClick={() => sendAcceptanceEmail(info.email, info.first_name)}
            >
              We Accept You!
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default Applicant;
