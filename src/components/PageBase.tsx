import { useState, useCallback } from 'react';
import { Stack } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Background from './Background';
import Header from './Header';

function PageBase() {
  const [headerOffset, setHeaderOffset] = useState(0);

  const headerRef = useCallback((node: HTMLElement) => {
    if (node != null) {
      setHeaderOffset(node.clientHeight);
    }
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <Stack>
        <Background />
        <Outlet context={{ headerOffset: headerOffset }} />
      </Stack>
    </>
  );
}

export default PageBase;
