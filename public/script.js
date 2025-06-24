const socket = io();
const usernameInput = document.getElementById('username');
const registerBtn = document.getElementById('registerBtn');
const recipientInput = document.getElementById('recipient');
const inputMessage = document.getElementById('inputMessage');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const messagesList = document.getElementById('messages');
const registerContainer = document.getElementById('register-container');
const chatContainer = document.getElementById('chat-container');
sendMessageBtn.addEventListener('click', () => {
  const to = recipientInput.value.trim();
  const message = inputMessage.value.trim();
  if (!to || !message) return;
  socket.emit('private message', { to, message });
  displayMessage(`You (to ${to}): ${message}`);
  inputMessage.value = '';
});
registerBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (!username) return;
  socket.emit('register', username);
  registerContainer.style.display = 'none';
  chatContainer.style.display = 'block';
});
socket.on('private message', ({ from, message }) => {
  displayMessage(`${from}: ${message}`);
});
function displayMessage(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
}