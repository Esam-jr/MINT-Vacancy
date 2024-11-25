import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';
import svgTrash from '../assets/img/trash.svg';

function Main() {
  const context = useContext(MyContext);
  const { currentAdmin } = context;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:1234/getData');
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async jobId => {
    const deleteConfirm = confirm('Are you sure you want to delete');
    if (deleteConfirm)
      try {
        const response = await fetch(
          `http://localhost:1234/deletePost/${jobId}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Success:', data.message);

        // Immediately remove the post from UI by filtering the state
        setPosts(
          prevPosts =>
            prevPosts.filter(
              post => post.job_id.toString() !== jobId.toString()
            ) // Convert to string for comparison
        );
      } catch (error) {
        console.error('Error:', error.message);
      }

    return deleteConfirm;
  };

  return (
    <>
      <main
        className="app"
        id="main"
        style={{ opacity: currentAdmin ? 100 : 0 }}
      >
        {posts?.map((post, i) => {
          const isExpired = new Date() > new Date(post.deadline);
          return (
            <div
              key={post.job_id}
              className={`announcement${isExpired ? ' expired' : ''} fs-4`}
              data-job-id={post.job_id} // Ensure consistency in naming
            >
              {isExpired ? (
                <>
                  <h5>Job {i + 1}</h5>
                  <h3>{post.job_title}</h3>
                  <p>
                    <strong>Type:</strong> {post.job_type}
                  </p>
                  <p>
                    <strong>Experience Level:</strong> {post.job_experience}
                  </p>
                  <p>
                    <strong>Salary:</strong> {post.job_salary}
                  </p>
                  <p>{post.job_description}</p>
                  <small>
                    Expired on: {new Date(post.deadline).toLocaleString()}
                  </small>
                  <span className="expired-text">Expired</span>
                  <Link
                    className="btn-delete"
                    onClick={() => handleDelete(post.job_id)}
                  >
                    <svg className="delete-icon">
                      <use xlinkHref={`${svgTrash}#trash-solid`}></use>
                    </svg>
                  </Link>
                </>
              ) : (
                <>
                  <h5>Job {i + 1}</h5>
                  <h3 className="announcement__title">{post.job_title}</h3>
                  <p className="announcement__text">
                    <strong className="announcement__list">Type:</strong>{' '}
                    {post.job_type}
                  </p>
                  <p className="announcement__text">
                    <strong className="announcement__list">
                      Experience Level:
                    </strong>{' '}
                    {post.job_experience}
                  </p>
                  <p className="announcement__text">
                    <strong className="announcement__list">Salary:</strong>{' '}
                    {post.job_salary}
                  </p>
                  <p className="announcement__text">
                    <strong className="announcement__list">
                      Job's Location:
                    </strong>{' '}
                    {post.location}
                  </p>
                  <p className="announcement__text">{post.job_description}</p>
                  <p className="announcement__text">
                    <strong>Required Qualifications Skills: </strong>{' '}
                    {post.job_qualifications_skills}
                  </p>
                  <p className="announcement__text">
                    <strong>Application Instructions: </strong>{' '}
                    {post.application_instructions}
                  </p>
                  <div className="announcement__text">
                    <strong className="announcement__list">Expires on: </strong>
                    {new Date(post.deadline).toLocaleString()}
                  </div>
                  <Link
                    className="btn-delete"
                    title="Delete"
                    onClick={() => handleDelete(post.job_id)}
                  >
                    <svg className="delete-icon">
                      <use xlinkHref={`${svgTrash}#trash-solid`}></use>
                    </svg>
                  </Link>
                </>
              )}
            </div>
          );
        })}
      </main>
    </>
  );
}

export default Main;
