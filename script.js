// Select elements using querySelector
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

const searchInput = document.querySelector("#search-input");

// Initialize notes array from localStorage (persistent)
let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

// Format date and time nicely
function getFormattedDate() {
  const now = new Date();
  return now.toLocaleString();
}

// Save notes to localStorage
function saveToLocalStorage() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

// Update the count message dynamically
function updateCountDisplay(filteredNotesCount) {
  const total = filteredNotesCount !== undefined ? filteredNotesCount : notes.length;
  
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (total === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${total} notes.`;
  }
}

// Render the notes list using createElement and textContent
function render(notesToRender = notes) {
  notesList.innerHTML = "";

  if (notesToRender.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "No notes added yet.";
    emptyLi.style.color = "#7f8c8d";
    emptyLi.style.fontStyle = "italic";
    notesList.appendChild(emptyLi);
    updateCountDisplay(0);
    return;
  }

  notesToRender.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note-card", `category-${note.category}`);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("note-content");

    const textSpan = document.createElement("span");
    textSpan.classList.add("note-text");
    textSpan.textContent = note.text;

    const metaSpan = document.createElement("span");
    metaSpan.classList.add("note-meta");
    metaSpan.textContent = `[${note.category.toUpperCase()}] • ${note.createdAt}`;

    contentDiv.appendChild(textSpan);
    contentDiv.appendChild(metaSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteNote(note.id);
    });

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  updateCountDisplay(notesToRender.length);
}

// Add note logic with validation
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation checks
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  // Clear any existing error
  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: getFormattedDate()
  };

  notes.push(newNote);
  saveToLocalStorage();
  render();

  noteInput.value = "";
  noteInput.focus();
});

// Delete note by ID
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveToLocalStorage();
  render();
}

// Search notes by keyword
function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const filtered = notes.filter((note) => 
    note.text.toLowerCase().includes(searchTerm)
  );
  render(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", handleSearch);
}

// Initial page load render
render();