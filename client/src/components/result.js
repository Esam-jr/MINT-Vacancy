async function handleSubmittedData(e) {
  e.preventDefault();

  const formData = new FormData(event.target);
  const params = new URLSearchParams(window.location.search);
  const job_for = params.get("jobTitle");

  formData.append("apply_for", job_for);

  try {
    const response = await fetch("http://localhost:1234/accept-data", {
      method: "POST",
      body: formData, // Send formData directly, no need for JSON.stringify
    });

    const result = await response.json();

    if (response.ok) {
      alert("Success! The job application was submitted successfully.");
      window.location.href = "/client/index.html";
    } else {
      alert(`Error: ${result.message}`);
      console.log(result);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("An error occurred. Please try again later. " + error.message);
  }
}

document
  .getElementById("applicationForm")
  .addEventListener("submit", handleSubmittedData);
