// Show selected tool
function showTool(id) {
  document.querySelectorAll('.tool').forEach(tool => {
    tool.style.display = 'none';
  });
  document.getElementById(id).style.display = 'block';
}

// Password Generator
function generatePassword() {
  const length = parseInt(document.getElementById('passLength').value) || 16;
  const upper = document.getElementById('passUpper').checked;
  const lower = document.getElementById('passLower').checked;
  const numbers = document.getElementById('passNumbers').checked;
  const symbols = document.getElementById('passSymbols').checked;

  let chars = '';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!chars) {
    alert('Select at least one character type');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passResult').value = password;
}

// Copy text
function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand('copy');
  alert('Copied!');
}

// Word Counter
document.getElementById('counterText')?.addEventListener('input', function () {
  const text = this.value;
  document.getElementById('charCount').textContent = text.length;
  document.getElementById('wordCount').textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  document.getElementById('sentenceCount').textContent = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  document.getElementById('paraCount').textContent = text.split(/\n+/).filter(p => p.trim().length > 0).length;
});

// Text Case Converter
function convertCase(type) {
  const textarea = document.getElementById('caseText');
  let text = textarea.value;

  switch (type) {
    case 'upper':
      text = text.toUpperCase();
      break;
    case 'lower':
      text = text.toLowerCase();
      break;
    case 'title':
      text = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      break;
    case 'sentence':
      text = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
      break;
  }
  textarea.value = text;
}

// Unit Converter
const units = {
  length: {
    m: 1,
    km: 0.001,
    cm: 100,
    mm: 1000,
    mile: 0.000621371,
    yard: 1.09361,
    foot: 3.28084,
    inch: 39.3701
  },
  weight: {
    kg: 1,
    g: 1000,
    mg