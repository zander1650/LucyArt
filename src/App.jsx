import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import UploadPage from './pages/UploadPage';
import './App.css';

const ALLOWED_EMAILS = ["lucyfields11037@gmail.com", "zander28fields@gmail.com"];

function App() {
  const [user, setUser] = useState(undefined); // undefined = loading

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return unsub;
  }, []);

  const renderAdmin = () => {
    if (user === undefined) return null; // still loading auth state
    if (!user || !ALLOWED_EMAILS.includes(user.email)) return <AdminLogin />;
    return <UploadPage user={user} />;
  };

  return (
    <Router>
      <nav className="navbar">
        <span className="navbar-brand">Summer's Art</span>
        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={renderAdmin()} />
      </Routes>
    </Router>
  );
}

export default App;
