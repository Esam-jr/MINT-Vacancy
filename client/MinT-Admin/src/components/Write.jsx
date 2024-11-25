import React, { useState } from "react";

function Write() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        "http://localhost:1234/add-job-announcement",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Success! The job announcement was added successfully.");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="main-content container-custom mx-auto ">
        <div>
          <h1>Create a Job Posting</h1>
          <form
            id="announcementhtmlForm"
            className="form-write"
            onSubmit={handleSubmit}
          >
            <label htmlFor="jobTitle" className="label">
              Job Title:
            </label>
            <input
              type="text"
              id="jobTitle"
              name="job_title"
              placeholder="Enter job title"
              required
              className="inp-write inp-type"
            />

            <label htmlFor="jobType" className="label">
              Job Type:
            </label>
            <select
              id="jobType"
              name="job_type"
              required
              defaultValue=""
              className="inp-type inp-write"
            >
              <option value="" disabled>
                Select job type
              </option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <label htmlFor="experienceLevel" className="label">
              Experience Level:
            </label>
            <select
              id="experienceLevel"
              name="job_experience"
              required
              defaultValue=""
              className="inp-type inp-write"
            >
              <option value="" disabled>
                Select experience level
              </option>
              <option value="Entry-Level">Entry-Level</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior-Level">Senior-Level</option>
              <option value="Executive">Executive</option>
            </select>

            <label htmlFor="salary" className="label">
              Salary:
            </label>
            <input
              type="text"
              id="salary"
              name="job_salary"
              placeholder="Enter salary range"
              required
              className="inp-write inp-type"
            />

            <label htmlFor="jobDescription" className="label">
              Job Description:
            </label>
            <textarea
              id="jobDescription"
              name="job_description"
              rows="20"
              placeholder="Enter job description"
              required
              className="inp-type textarea inp-write"
            ></textarea>

            <label htmlFor="location" className="label">
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Indicate the job's location or if it is remote."
              required
              className="inp-write inp-type"
            />

            <label htmlFor="qualificationSkill" className="label">
              Required Qualifications and Skills
            </label>
            <textarea
              id="qualificationSkill"
              name="job_qualifications_skills"
              placeholder="List the necessary qualifications, skills, and experience needed for the role."
              required
              rows="10"
              className="inp-type textarea  inp-write"
            ></textarea>

            <label htmlFor="applicationInstructions" className="label">
              Application Instructions
            </label>
            <textarea
              id="applicationInstructions"
              name="application_instructions"
              placeholder="Provide clear instructions on how to apply, including any specific documents required and application deadlines."
              required
              rows="10"
              className="inp-type textarea inp-write"
            ></textarea>

            <label htmlFor="expiryDate" className="label">
              Expiry Date:
            </label>
            <input
              type="datetime-local"
              id="expiryDate"
              name="deadline"
              required
              className="inp-write inp-type"
            />

            <button type="submit" className="btn-write">
              Post Job
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Write;
