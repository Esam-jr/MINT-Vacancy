import { Outlet } from 'react-router-dom';
import Header from './Header';

function SharedCompunents() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default SharedCompunents;
