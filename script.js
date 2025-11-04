// -------------------- LOGIN SYSTEM --------------------
const loginScreen = document.getElementById('loginScreen');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'student' && password === 'studyhub') {
    loginScreen.style.display = 'none';
  } else {
    loginError.textContent = 'Invalid credentials. Try again.';
  }
});

// -------------------- TAB NAVIGATION --------------------
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const target = link.getAttribute('data-tab');
    tabContents.forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === target) tab.classList.add('active');
    });
  });
});

// -------------------- DARK MODE TOGGLE --------------------
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// -------------------- MOTIVATIONAL QUOTE --------------------
const quotes = [
  "Push yourself, because no one else will do it for you.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Don’t watch the clock; do what it does. Keep going."
];
document.getElementById('motivationalQuote').textContent =
  quotes[Math.floor(Math.random() * quotes.length)];

// -------------------- FILE UPLOAD & FILTER --------------------
const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const filesGrid = document.getElementById('filesGrid');
const searchFiles = document.getElementById('searchFiles');
const filterButtons = document.querySelectorAll('.filter-btn');

let uploadedFiles = [];

uploadBox.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFiles);

function handleFiles() {
  const files = Array.from(fileInput.files);
  uploadedFiles.push(...files);
  renderFiles(uploadedFiles);
}

function renderFiles(files) {
  filesGrid.innerHTML = '';
  files.forEach(file => {
    const ext = file.name.split('.').pop().toLowerCase();
    let type = 'document';
    if (ext === 'pdf') type = 'pdf';
    else if (['jpg', 'jpeg', 'png'].includes(ext)) type = 'image';

    const card = document.createElement('div');
    card.className = `file-card ${type}`;
    card.innerHTML = `
      <i class="fas fa-file"></i>
      <h4>${file.name}</h4>
      <p>${type.toUpperCase()}</p>
    `;
    filesGrid.appendChild(card);
  });
}

searchFiles.addEventListener('input', () => {
  const query = searchFiles.value.toLowerCase();
  const filtered = uploadedFiles.filter(file =>
    file.name.toLowerCase().includes(query)
  );
  renderFiles(filtered);
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.getAttribute('data-filter');

    if (type === 'all') renderFiles(uploadedFiles);
    else {
      const filtered = uploadedFiles.filter(file => {
        const ext = file.name.split('.').pop().toLowerCase();
        if (type === 'pdf') return ext === 'pdf';
        if (type === 'image') return ['jpg', 'jpeg', 'png'].includes(ext);
        return ['doc', 'docx', 'txt', 'ppt', 'pptx'].includes(ext);
      });
      renderFiles(filtered);
    }
  });
});

// -------------------- NOTES SYSTEM --------------------
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let activeNoteId = null;

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach(note => {
    const item = document.createElement('div');
    item.className = 'note-item';
    item.innerHTML = `<h4>${note.title}</h4><p>${note.content.slice(0, 50)}...</p>`;
    item.addEventListener('click', () => {
      activeNoteId = note.id;
      noteTitle.value = note.title;
      noteContent.value = note.content;
      document.querySelectorAll('.note-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
    notesList.appendChild(item);
  });
}

addNoteBtn.addEventListener('click', () => {
  noteTitle.value = '';
  noteContent.value = '';
  activeNoteId = null;
});

saveNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) return;

  if (activeNoteId) {
    const note = notes.find(n => n.id === activeNoteId);
    note.title = title;
    note.content = content;
  } else {
    notes.push({ id: Date.now(), title, content });
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
});

deleteNoteBtn.addEventListener('click', () => {
  if (!activeNoteId) return;
  notes = notes.filter(n => n.id !== activeNoteId);
  localStorage.setItem('notes', JSON.stringify(notes));
  noteTitle.value = '';
  noteContent.value = '';
  activeNoteId = null;
  renderNotes();
});

renderNotes();

// -------------------- AI CHAT --------------------
const sendBtn = document.getElementById('sendAiBtn');
const aiInput = document.getElementById('aiInput');
const chatMessages = document.getElementById('chatMessages');

sendBtn.addEventListener('click', async () => {
  const userText = aiInput.value.trim();
  if (!userText) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.innerHTML = `<i class="fas fa-user"></i><p>${userText}</p>`;
  chatMessages.appendChild(userMsg);
  aiInput.value = '';

  try {
    const res = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText }),
    });
    const data = await res.json();

    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-message';
    aiMsg.innerHTML = `<i class="fas fa-robot"></i><p>${data.reply}</p>`;
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (err) {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-message';
    aiMsg.innerHTML = `<i class="fas fa-robot"></i><p>Sorry, I couldn’t reach the AI server.</p>`;
    chatMessages.appendChild(aiMsg);
  }
});
