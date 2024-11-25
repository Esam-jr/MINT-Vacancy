import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/normalize.css/normalize.css';
import './assets/css/announcements.css';
import './assets/css/index.css';
import './assets/css/style.css';
import './assets/css/write.css';
import AdminList from './components/AdminList';
import Applicant from './components/Applicant';
import ApplicantsList from './components/ApplicantsList';
import Four04 from './components/Four04';
import Login from './components/Login';
import Main from './components/Main';
import RegisterAdmin from './components/RegisterAdmin';
import SharedCompunents from './components/SharedCompunents';
import Write from './components/Write';

export const MyContext = createContext();

function App() {
  // const [admins, setAdmins] = useState(accounts);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  const handleCurrentAdmin = function (admin) {
    setCurrentAdmin(() => admin);
  };

  // console.log(currentAdmin);

  return (
    <>
      <MyContext.Provider value={{ handleCurrentAdmin, currentAdmin }}>
        <Routes>
          {currentAdmin && (
            <Route path="/" element={<SharedCompunents />}>
              <Route path="/" element={<Main />} />
              <Route path="/write" element={<Write />} />
              <Route path="/list-applicants" element={<ApplicantsList />} />
              <Route
                path="/list-applicants/:applicantID"
                element={<Applicant />}
              />
              <Route path="/list-admins" element={<AdminList />} />

              <Route path="/register" element={<RegisterAdmin />} />
            </Route>
          )}
          {!currentAdmin && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />
            </>
          )}
          <Route path="*" element={<Four04 />} />
        </Routes>
      </MyContext.Provider>
    </>
  );
}

export default App;
