import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../App';
import logo from '../assets/img/logo.png';
import menuSvg from '../assets/img/menu.svg';

function Header() {
  const { currentAdmin, handleCurrentAdmin } = useContext(MyContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Sticky navigation: Intersection Observer API

    const nav = document.querySelector('.nav');

    const handleHover = e => {
      if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
          if (el !== link) el.style.opacity = e.type === 'mouseover' ? 0.5 : 1;
        });
        logo.style.opacity = e.type === 'mouseover' ? 0.5 : 1;
      }
    };

    nav.addEventListener('mouseover', handleHover);
    nav.addEventListener('mouseout', handleHover);

    // Cleanup the event listeners on component unmount
    return () => {
      nav.removeEventListener('mouseover', handleHover);
      nav.removeEventListener('mouseout', handleHover);
    };
  }, []);

  const handleToggle = () => {
    setIsExpanded(prevExpand => !prevExpand);
  };

  const handleLogout = function () {
    const logoutConfirm = confirm('Are you sure you want to Logout?');
    if (logoutConfirm) {
      navigate('/');
      handleCurrentAdmin(null);
      return;
    }
    return logoutConfirm;
  };

  // console.log(isExpanded);

  return (
    <>
      <header className="header">
        <nav
          className={`nav sticky text-center collapsible${
            isExpanded ? ' collapsible--expanded' : ''
          }`}
        >
          <div className="nav__logo--container">
            <Link to="/">
              <img
                src={logo}
                alt="MinT logo"
                className="nav__logo"
                id="logo"
                designer="MinT"
              />
            </Link>
          </div>

          <ul className="nav__links collapsible__content">
            <li className="nav__item">
              <Link className="nav__link" to="list-applicants">
                Applicants
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="register">
                Register
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="list-admins">
                Admin List
              </Link>
            </li>
            <li className="nav__item">
              <Link
                className="nav__link nav__link--btn btn--show-modal"
                to="write"
              >
                Post Announcement
              </Link>
            </li>

            <li className="nav__item">
              <Link className="nav__link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li>
              <span
                className="fs-2 user fw-bold ms-3 text-light rounded-circle p-3 "
                title={currentAdmin.username}
              >
                {currentAdmin.username[0].toUpperCase()}
              </span>
            </li>
          </ul>

          <a className="nav__icon collapsible__icon" onClick={handleToggle}>
            <svg className="icon">
              <use xlinkHref={`${menuSvg}#list`}></use>
            </svg>
          </a>
        </nav>
      </header>
    </>
  );
}

export default Header;
