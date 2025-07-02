const statusText = document.getElementById('status');
const outputText = document.getElementById('outputText');
const micBtn = document.getElementById('micBtn');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

micBtn.addEventListener('click', () => {
  recognition.start();
  statusText.textContent = 'Listening... 🎧';
});

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  outputText.textContent = `You said: "${command}"`;
  handleCommand(command);
};

recognition.onend = function () {
  statusText.textContent = 'Click mic and speak a command';
};

function handleCommand(command) {
  if (command.includes('change background') || command.includes('change color')) {
    document.body.style.backgroundColor = getRandomColor();
  } else if (command.includes('what time')) {
    const now = new Date();
    outputText.textContent = `Current time is ${now.toLocaleTimeString()}`;
  } else if (command.includes('turn on light')) {
    document.body.style.backgroundColor = '#fffbea';
    outputText.textContent = 'Light turned ON 🔆';
  } else if (command.includes('turn off light')) {
    document.body.style.backgroundColor = '#333';
    outputText.style.color = 'white';
    statusText.style.color = 'white';
    outputText.textContent = 'Light turned OFF 🌙';
  } else {
    outputText.textContent += `\nCommand not recognized`;
  }
}

function getRandomColor() {
  const colors = ['#ffe4e1', '#d1e7dd', '#cfe2ff', '#fff3cd', '#f8d7da'];
  return colors[Math.floor(Math.random() * colors.length)];
}
