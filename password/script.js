const sets = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: "!@#$%&*()-_=+[]{};:,.<>?/~`|\\"
};

const length = document.getElementById('length');
const lengthNumber = document.getElementById('lengthNumber');
const lengthVal = document.getElementById('lengthVal');
const lower = document.getElementById('lower');
const upper = document.getElementById('upper');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const avoidSimilar = document.getElementById('avoidSimilar');
const generate = document.getElementById('generate');
const generatePronounce = document.getElementById('generatePronounce');
const password = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const meterFill = document.getElementById('meterFill');
const strengthText = document.getElementById('strengthText');
const entropyEl = document.getElementById('entropy');

function syncLengthFromRange() {
  lengthNumber.value = length.value;
  lengthVal.textContent = length.value;
}
function syncLengthFromNumber() {
  let v = Number(lengthNumber.value);
  if (isNaN(v) || v < 4) v = 4;
  if (v > 64) v = 64;
  length.value = v;
  lengthVal.textContent = v;
}
length.addEventListener('input', syncLengthFromRange);
lengthNumber.addEventListener('input', syncLengthFromNumber);

const similar = new Set(['i','l','1','L','o','0','O']);

function buildPool() {
  let pool = '';
  if (lower.checked) pool += sets.lower;
  if (upper.checked) pool += sets.upper;
  if (numbers.checked) pool += sets.numbers;
  if (symbols.checked) pool += sets.symbols;
  if (avoidSimilar.checked) pool = [...pool].filter(ch => !similar.has(ch)).join('');
  return pool;
}

function getEntropy(len, poolSize) {
  return len * Math.log2(poolSize);
}

function strengthLabel(bits) {
  if (bits < 28) return 'Muy débil';
  if (bits < 36) return 'Débil';
  if (bits < 60) return 'Moderada';
  if (bits < 90) return 'Fuerte';
  return 'Muy fuerte';
}

function updateMeter(bits) {
  const pct = Math.min(100, Math.round((bits / 90) * 100));
  meterFill.style.width = pct + '%';
  strengthText.textContent = strengthLabel(bits);
  entropyEl.textContent = Math.round(bits) + ' bits';
}

function generatePassword() {
  const len = Number(length.value);
  const pool = buildPool();
  if (!pool.length) { password.value = ''; alert('Seleccione al menos un conjunto de caracteres.'); return; }
  let array = new Uint32Array(len);
  window.crypto.getRandomValues(array);
  let out = [];
  for (let i = 0; i < len; i++) {
    const idx = array[i] % pool.length;
    out.push(pool[idx]);
  }
  password.value = out.join('');
  updateMeter(getEntropy(len, pool.length));
}

function generatePronounceable() {
  const len = Number(length.value);
  const vowels = 'aeiou';
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  let out = [];
  let useCons = true;
  for (let i = 0; i < len; i++) {
    if (useCons) out.push(consonants[Math.floor(Math.random() * consonants.length)]);
    else out.push(vowels[Math.floor(Math.random() * vowels.length)]);
    useCons = !useCons;
  }
  let res = out.join('').slice(0, len);
  if (upper.checked) res = res.split('').map((ch,i)=> i%4===0? ch.toUpperCase() : ch).join('');
  if (numbers.checked) res = res.split('').map((ch,i)=> i%6===5? Math.floor(Math.random()*10) : ch).join('');
  if (avoidSimilar.checked) res = res.replace(/[iloO01]/g, 'x');
  password.value = res;
  updateMeter(getEntropy(res.length, buildPool().length || 2));
}

generate.addEventListener('click', generatePassword);
generatePronounce.addEventListener('click', generatePronounceable);

copyBtn.addEventListener('click', async () => {
  const val = password.value;
  if (!val) return;
  try {
    await navigator.clipboard.writeText(val);
    copyBtn.textContent = 'Copiado';
    setTimeout(() => copyBtn.textContent = 'Copiar', 1500);
  } catch {
    password.select();
    document.execCommand('copy');
    alert('Contraseña copiada.');
  }
});

syncLengthFromRange();
updateMeter(getEntropy(Number(length.value), buildPool().length || 1));
