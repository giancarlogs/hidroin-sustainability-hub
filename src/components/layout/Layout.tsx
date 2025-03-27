
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
