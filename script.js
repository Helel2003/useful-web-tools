function showTool(id) {
  document.querySelectorAll('.tool').forEach(t => t.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

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
    alert('Select at least one option');
    return;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById('passResult').value = password;
}

function copyText(id) {
  const el = document.getElementById(id);
  el.select();
  document.execCommand('copy');
  alert('Copied!');
}

document.getElementById('counterText')?.addEventListener('input', function() {
  const text = this.value;
  document.getElementById('charCount').textContent = text.length;
  document.getElementById('wordCount').textContent = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  document.getElementById('sentenceCount').textContent = (text.match(/[.!?]+/g) || []).length;
  document.getElementById('paraCount').textContent = text.split(/\n+/).filter(p => p.trim()).length;
});

function convertCase(type) {
  const el = document.getElementById('caseText');
  let text = el.value;
  if (type === 'upper') text = text.toUpperCase();
  if (type === 'lower') text = text.toLowerCase();
  if (type === 'title') text = text.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  if (type === 'sentence') text = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
  el.value = text;
}

const units = {
  length: { m: 1, km: 0.001, cm: 100, mm: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
  weight: { kg: 1, g: 1000, mg: 1e6, lb: 2.20462, oz: 35.274 },
  temp: { C: 'C', F: 'F', K: 'K' }
};

function updateUnitOptions() {
  const type = document.getElementById('unitType').value;
  const from = document.getElementById('unitFromUnit');
  const to = document.getElementById('unitToUnit');
  from.innerHTML = '';
  to.innerHTML = '';
  const list = type === 'temp' ? ['C','F','K'] : Object.keys(units[type]);
  list.forEach(u => {
    from.innerHTML += `<option value="\( {u}"> \){u}</option>`;
    to.innerHTML += `<option value="\( {u}"> \){u}</option>`;
  });
  convertUnit();
}

function convertUnit() {
  const type = document.getElementById('unitType').value;
  const val = parseFloat(document.getElementById('unitFrom').value) || 0;
  const fromU = document.getElementById('unitFromUnit').value;
  const toU = document.getElementById('unitToUnit').value;
  let result = 0;

  if (type === 'temp') {
    let c = val;
    if (fromU === 'F') c = (val - 32) * 5/9;
    if (fromU === 'K') c = val - 273.15;
    if (toU === 'C') result = c;
    if (toU === 'F') result = c * 9/5 + 32;
    if (toU === 'K') result = c + 273.15;
  } else {
    result = (val / units[type][fromU]) * units[type][toU];
  }
  document.getElementById('unitTo').value = result.toFixed(4);
}

function formatJSON() {
  const input = document.getElementById('jsonInput').value;
  const out = document.getElementById('jsonOutput');
  try {
    out.textContent = JSON.stringify(JSON.parse(input), null, 2);
    out.style.color = '#4ade80';
  } catch(e) {
    out.textContent = 'Invalid JSON';
    out.style.color = '#f87171';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateUnitOptions();
  showTool('password');
});