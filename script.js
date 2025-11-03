// Tab Switching
const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetTab = link.getAttribute('data-tab');

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    tabContents.forEach(tab => {
      tab.classList.remove('active');
      if (tab.id === targetTab) tab.classList.add('active');
    });
  });
});

// Dark Mode Toggle
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  darkToggle.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Toggle Light Mode'
    : '🌙 Toggle Dark Mode';
});

// Motivational Quotes
const quotes = [
  "Believe you can and you're halfway there.",
  "Success is the sum of small efforts repeated daily.",
  "Don't watch the clock; do what it does. Keep going.",
  "Push yourself, because no one else is going to do it for you."
];
const quoteEl = document.getElementById('motivationalQuote');
quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// File Upload Preview
const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const filesGrid = document.getElementById('filesGrid');

uploadBox.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
  filesGrid.innerHTML = '';
  Array.from(fileInput.files).forEach(file => {
    const ext = file.name.split('.').pop().toLowerCase();
    let type = 'document';
    if (ext === 'pdf') type = 'pdf';
    else if (['jpg', 'jpeg', 'png'].includes(ext)) type = 'image';

    const card = document.createElement('div');
    card.className = `file-card ${type}`;
    card.innerHTML = `
      <i class="fas fa-file-${type === 'image' ? 'image' : type}"></i>
      <h4>${file.name}</h4>
      <p>${(file.size / 1024).toFixed(1)} KB</p>
      <div class="file-actions">
        <button class="file-btn view-btn">View</button>
        <button class="file-btn delete-btn">Delete</button>
      </div>
    `;
    filesGrid.appendChild(card);
  });
});

// AI Chat Simulation
const sendBtn = document.getElementById('sendAiBtn');
const aiInput = document.getElementById('aiInput');
const chatMessages = document.getElementById('chatMessages');

sendBtn.addEventListener('click', () => {
  const userText = aiInput.value.trim();
  if (!userText) return;

  const userMsg = document.createElement('div');
  userMsg.className = 'user-message';
  userMsg.innerHTML = `<i class="fas fa-user"></i><p>${userText}</p>`;
  chatMessages.appendChild(userMsg);

  aiInput.value = '';

  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'ai-message';
    aiMsg.innerHTML = `<i class="fas fa-robot"></i><p>Thanks for your question! I'm still learning, but I’ll try my best to help.</p>`;
    chatMessages.appendChild(aiMsg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
});

// Notes Functionality
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');

let notes = [];
let activeNoteIndex = null;

addNoteBtn.addEventListener('click', () => {
  noteTitle.value = '';
  noteContent.value = '';
  activeNoteIndex = null;
  document.querySelectorAll('.note-item').forEach(item => item.classList.remove('active'));
});

saveNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (!title || !content) return;

  if (activeNoteIndex !== null) {
    notes[activeNoteIndex] = { title, content };
  } else {
    notes.push({ title, content });
    activeNoteIndex = notes.length - 1;
  }
  renderNotes();
});

deleteNoteBtn.addEventListener('click', () => {
  if (activeNoteIndex !== null) {
    notes.splice(activeNoteIndex, 1);
    activeNoteIndex = null;
    noteTitle.value = '';
    noteContent.value = '';
    renderNotes();
  }
});

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const item = document.createElement('div');
    item.className = 'note-item';
    item.innerHTML = `<h4>${note.title}</h4><p>${note.content.slice(0, 50)}...</p>`;
    item.addEventListener('click', () => {
      activeNoteIndex = index;
      noteTitle.value = note.title;
      noteContent.value = note.content;
      document.querySelectorAll('.note-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
    notesList.appendChild(item);
  });
}



// Login System
const loginScreen = document.getElementById('loginScreen');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

loginBtn.addEventListener('click', () => {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'student' && password === 'studyhub') {
    loginScreen.style.display = 'none';
  } else {
    loginError.textContent = 'Invalid username or password';
  }
});

