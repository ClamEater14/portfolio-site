import { Outlet } from 'react-router-dom';
import Header from './Header';

function PageBase() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default PageBase;
