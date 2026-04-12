import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./UploadPage.css";

const CLOUD_NAME = "dvrsyh9jj";
const UPLOAD_PRESET = "wqstecqj";

export default function UploadPage({ user }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");
  const [artworks, setArtworks] = useState([]);
  const [confirmId, setConfirmId] = useState(null);

  const loadArtworks = async () => {
    const snap = await getDocs(query(collection(db, "artworks"), orderBy("createdAt")));
    setArtworks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { loadArtworks(); }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setUploadedUrl("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", "artwork");
      formData.append("tags", "artwork");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      if (!res.ok) {
        const errBody = await res.text();
        console.error("Cloudinary error:", res.status, errBody);
        throw new Error("Cloudinary upload failed");
      }
      const data = await res.json();
      await addDoc(collection(db, "artworks"), {
        src: data.secure_url,
        title: title || file.name.replace(/\.[^.]+$/, ''),
        description: description,
        createdAt: serverTimestamp(),
      });
      setUploadedUrl(data.secure_url);
      setFile(null);
      setTitle("");
      setDescription("");
      loadArtworks();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (id) => {
    await deleteDoc(doc(db, "artworks", id));
    setConfirmId(null);
    loadArtworks();
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <div className="upload-header">
          <h2>Upload Artwork</h2>
          <button className="signout-btn" onClick={() => signOut(auth)}>Sign out</button>
        </div>
        <p className="upload-user">Signed in as <strong>{user.email}</strong></p>

        <input
          className="upload-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="upload-textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <label className="file-label">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => { setFile(e.target.files[0]); setUploadedUrl(""); setError(""); }}
          />
          {file ? file.name : "Choose an image…"}
        </label>

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>

        {error && <p className="upload-error">{error}</p>}

        {uploadedUrl && (
          <div className="upload-success">
            <p>Uploaded successfully!</p>
            <img src={uploadedUrl} alt="Uploaded artwork" />
          </div>
        )}
      </div>

      {artworks.length > 0 && (
        <div className="manage-card">
          <h2>Uploaded Artwork ({artworks.length})</h2>
          <div className="manage-grid">
            {artworks.map(art => (
              <div key={art.id} className="manage-item">
                <img src={art.src} alt={art.title} />
                <div className="manage-info">
                  <strong>{art.title}</strong>
                  {art.description && <p>{art.description}</p>}
                </div>
                {confirmId === art.id ? (
                  <div className="manage-confirm">
                    <span>Remove?</span>
                    <button className="confirm-yes" onClick={() => handleRemove(art.id)}>Yes</button>
                    <button className="confirm-no" onClick={() => setConfirmId(null)}>Cancel</button>
                  </div>
                ) : (
                  <button className="remove-btn" onClick={() => setConfirmId(art.id)}>Remove</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
