import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Notes.css";

const NOTES_STORAGE_KEY = "techmaster_notes";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  // Load
  useEffect(() => {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    setIsLoaded(true);
  }, []);

  // Save
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes, isLoaded]);

  const openAddModal = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (editingNote) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
              }
            : note,
        ),
      );

      toast.success("Note updated successfully!");
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };

      setNotes((prevNotes) => [newNote, ...prevNotes]);

      toast.success("Note added successfully!");
    }

    closeModal();
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

    toast.success("Note deleted successfully!");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <section className="notes-page">
      {/* Header */}
      <div className="notes-header">
        <div>
          <h1>Notes</h1>
          <p>Keep your important thoughts and study notes organized.</p>
        </div>

        <button className="add-note-btn" onClick={openAddModal}>
          <span>+</span>
          Add Note
        </button>
      </div>

      {/* Notes */}
      {notes.length === 0 ? (
        <div className="empty-notes">
          <div className="empty-icon">📝</div>

          <h3>No notes yet</h3>

          <p>Start by creating your first note.</p>

          <button className="empty-add-btn" onClick={openAddModal}>
            + Add Your First Note
          </button>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <article className="note-card" key={note.id}>
              <div className="note-card-header">
                <h3>{note.title}</h3>
              </div>

              <p className="note-content">{note.content}</p>

              <div className="note-footer">
                <span className="note-date">{formatDate(note.createdAt)}</span>

                <div className="note-actions">
                  <button
                    className="note-action edit"
                    onClick={() => openEditModal(note)}
                    title="Edit note"
                  >
                    ✎
                  </button>

                  <button
                    className="note-action delete"
                    onClick={() => handleDelete(note.id)}
                    title="Delete note"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{editingNote ? "Edit Note" : "Add Note"}</h2>

                <p>
                  {editingNote ? "Update your note." : "Create a new note."}
                </p>
              </div>

              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Content</label>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your note..."
                  rows="6"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingNote ? "Save Changes" : "Add Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Notes;
