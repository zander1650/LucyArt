import './Home.css'
import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocs(query(collection(db, 'artworks'), orderBy('createdAt')))
      .then(snap => {
        setArtworks(snap.docs.map(doc => doc.data()));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const [current, setCurrent] = useState(0);
  const [modalArt, setModalArt] = useState(null);
  const openModal = (art) => setModalArt(art);
  const closeModal = () => setModalArt(null);

  const prev = () => setCurrent(i => (i - 1 + artworks.length) % artworks.length);
  const next = () => setCurrent(i => (i + 1) % artworks.length);

  const art = artworks[current];

  return (
    <div className="home">
      <header>
        <h1>Summer's Wonderful Works</h1>
        <br></br>
        <p>Welcome to my collection of artwork. Commissions available!</p>
      </header>
      <main>
        {loading ? (
          <p style={{ textAlign: 'center', padding: '60px 20px', color: '#7a6a5a' }}>Loading artwork…</p>
        ) : artworks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '60px 20px', color: '#7a6a5a' }}>No artwork uploaded yet. Check back soon!</p>
        ) : (
          <div className="slideshow">
            <div className="slide-image-wrap" style={{ cursor: 'pointer' }} onClick={() => openModal(art)}>
              <img src={art.src} alt={art.title} className="slide-img" />
            </div>
            <h3 className="slide-title">{art.title}</h3>
            <p className="slide-desc">{art.description}</p>
            <div className="slide-controls">
              <button className="slide-btn" onClick={prev}>&#8592;</button>
              <span className="slide-counter">{current + 1} / {artworks.length}</span>
              <button className="slide-btn" onClick={next}>&#8594;</button>
            </div>
          </div>
        )}
        {modalArt && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <img src={modalArt.src} alt={modalArt.title} className="modal-img" />
              <h2>{modalArt.title}</h2>
              <p>{modalArt.description}</p>
              <button className="modal-close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </main>
      <footer>
        <p>Please visit the contact page for commissions and to connect with me</p>
      </footer>
    </div>
  );
}

export default Home;