// document.addEventListener('DOMContentLoaded', function () {
//   const announcementForm = document.getElementById('announcementForm');
//   // const announcementList = document.getElementById('announcementList');
//   const modal = document.querySelector('.modal-1');
//   // console.log(modal);
//   // Function to display announcements
//   function displayAnnouncements() {
//     const announcements =
//       JSON.parse(localStorage.getItem('announcements')) || [];

//     if (modal) {
//       modal.innerHTML = '';
//       announcements.forEach(announcement => {
//         const announcementDiv = document.createElement('div');
//         announcementDiv.classList.add('announcement');

//         const isExpired = new Date() > new Date(announcement.expiryDate);

//         if (isExpired) {
//           announcementDiv.classList.add('expired');
//           announcementDiv.innerHTML = `
//                         <h3>${announcement.jobTitle}</h3>
//                         <p><strong>Type:</strong> ${announcement.jobType}</p>
//                         <p><strong>Experience Level:</strong> ${
//                           announcement.experienceLevel
//                         }</p>
//                         <p><strong>Salary:</strong> ${announcement.salary}</p>
//                         <p>${announcement.jobDescription}</p>
//                         <small>Expired on: ${new Date(
//                           announcement.expiryDate
//                         ).toLocaleString()}</small>
//                         <span class="expired-text">Expired</span>
//                     `;
//         } else {
//           announcementDiv.innerHTML = `
//                         <h3>${announcement.jobTitle}</h3>
//                         <p><strong>Type:</strong> ${announcement.jobType}</p>
//                         <p><strong>Experience Level:</strong> ${
//                           announcement.experienceLevel
//                         }</p>
//                         <p><strong>Salary:</strong> ${announcement.salary}</p>
//                         <p>${announcement.jobDescription}</p>
//                         <small>Expires on: ${new Date(
//                           announcement.expiryDate
//                         ).toLocaleString()}</small>
//                         <a href="applications.html?jobTitle=${encodeURIComponent(
//                           announcement.jobTitle
//                         )}" class="apply-button">Apply Now</a>
//                     `;
//         }

//         modal.appendChild(announcementDiv);
//       });
//     }
//   }

//   // Function to add a new announcement
//   if (announcementForm) {
//     announcementForm.addEventListener('submit', function (e) {
//       e.preventDefault();

//       const jobTitle = document.getElementById('jobTitle').value;
//       const jobType = document.getElementById('jobType').value;
//       const experienceLevel = document.getElementById('experienceLevel').value;
//       const salary = document.getElementById('salary').value;
//       const jobDescription = document.getElementById('jobDescription').value;
//       const expiryDate = document.getElementById('expiryDate').value;

//       const announcements =
//         JSON.parse(localStorage.getItem('announcements')) || [];
//       announcements.push({
//         jobTitle: jobTitle,
//         jobType: jobType,
//         experienceLevel: experienceLevel,
//         salary: salary,
//         jobDescription: jobDescription,
//         expiryDate: expiryDate,
//       });

//       localStorage.setItem('announcements', JSON.stringify(announcements));

//       document.getElementById('announcementForm').reset();

//       window.location.href = '../../../index.html';
//       modal.classList.remove('hidden'); // Redirect to the announcements page after posting
//     });
//   }

//   // Display announcements initially and check for expired ones
//   displayAnnouncements();
// });
// let value = {
//   application_instructions:
//     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quidem illum esse, sed animi aliquid blanditiis explicabo iste, labore totam, suscipit id ipsum recusandae voluptas quis laudantium exercitationem officia ab.',
//   deadline: '2024-08-30T19:47:00.000Z',
//   job_description:
//     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quidem illum esse, sed animi aliquid blanditiis explicabo iste, labore totam, suscipit id ipsum recusandae voluptas quis laudantium exercitationem officia ab.',
//   job_experience: 'Mid-Level',
//   job_id: 1,
//   job_qualifications_skills:
//     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni quidem illum esse, sed animi aliquid blanditiis explicabo iste, labore totam, suscipit id ipsum recusandae voluptas quis laudantium exercitationem officia ab.',
//   job_salary: '2000',
//   job_title: 'job',
//   job_type: 'Full-Time',
//   location: 'remot',
// };
// const announcementForm = document.getElementById('announcementForm');
// console.log(announcementForm);
// const modal_1 = document.querySelector('.modal-1');
// console.log(modal);
async function getAnnouncements() {
  try {
    const response = await fetch("http://localhost:1234/getData");
    // console.log(response);
    const data = await response.json();
    // console.log(data.length);
    const filterData = data.filter(
      (job) => new Date(job.deadline) > new Date()
    );
    if (filterData.length)
      filterData?.forEach((job, i) => {
        const announcementDiv = document.createElement("div");
        announcementDiv.classList.add("announcement");

        announcementDiv.dataset.jobId = job.job_title;

        const isExpired = new Date() > new Date(job.deadline);
        // console.log(isExpired);
        if (isExpired) {
          // console.log(announcementDiv);
          announcementDiv.classList.add("expired");
          announcementDiv.innerHTML = `
      <h5>Job ${i + 1}</h5>
                      <h3>${job.job_title}</h3>
                      <p><strong>Type:</strong> ${job.job_type}</p>
                      <p><strong>Experience Level:</strong> ${
                        job.job_experience
                      }</p>
                      <p><strong>Salary:</strong> ${job.job_salary}</p>
                      <p>${job.job_description}</p>
                      <small>Expired on: ${new Date(
                        job.deadline
                      ).toLocaleString()}</small>
                      <span class="expired-text">Expired</span>
                  `;
        } else {
          // console.log(announcementDiv);
          announcementDiv.innerHTML = `
        <h5 style='font-size: 1.7rem;'>Job ${i + 1}</h5>
                      <h3 class='announcement__title'>${job.job_title}</h3>
                      <p class='announcement__text'><strong class='announcement__list'>Type:</strong> ${
                        job.job_type
                      }</p>
                      <p class='announcement__text'><strong class='announcement__list'>Experience Level:</strong> ${
                        job.job_experience
                      }</p>
                      <p class='announcement__text'><strong class='announcement__list'>Salary:</strong> ${
                        job.job_salary
                      }</p>
                      <p class='announcement__text'><strong class='announcement__list'>Job's Location:</strong> ${
                        job.location
                      }</p>
                      <p class='announcement__text'>${job.job_description}</p>
                      <p class='announcement__text'>
                      <strong>Required Qualifications Skills: </strong>  ${
                        job.job_qualifications_skills
                      }</p>
                      <p class='announcement__text'>
                      <strong>Application Instructions: </strong>  ${
                        job.application_instructions
                      }</p>
                      <div class='announcement__text'>
                        <strong class='announcement__list'>Expires on: </strong>${new Date(
                          job.deadline
                        ).toLocaleString()}
                      </div
                    >
                      <a href="/client/src/components/result.html?jobTitle=${encodeURIComponent(
                        job.job_title
                      )}" class="apply-button">Apply Now</a>
                  `;
        }

        modal.appendChild(announcementDiv);
      });
    else {
      const announcementDiv = document.createElement("div");
      announcementDiv.classList.add("announcement");
      announcementDiv.innerHTML = `<h3>No Announcements</h3>`;
      modal.appendChild(announcementDiv);
    }
  } catch (e) {
    const announcementDiv = document.createElement("div");
    announcementDiv.classList.add("announcement");
    announcementDiv.innerHTML = `<h3>No Announcements</h3>`;
    modal.appendChild(announcementDiv);
  }
}
document.addEventListener("DOMContentLoaded", getAnnouncements);
// announcementForm.addEventListener('submit', e => {
//   e.preventDefault();
//   getAnnouncements();
// });
