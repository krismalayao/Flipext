const textInput = document.getElementById('textInput');
const copyBtn = document.getElementById('copyBtn');
const pasteBtn = document.getElementById('pasteBtn');
const caseOption = document.getElementById('caseOption');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

caseOption.addEventListener('change', () => {
  let val = textInput.value;
  if (!val) return;

  switch (caseOption.value) {
    case 'uppercase':
      textInput.value = val.toUpperCase();
      break;
    case 'lowercase':
      textInput.value = val.toLowerCase();
      break;
    case 'sentence':
      textInput.value = val.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
      break;
    case 'firstletter':
      textInput.value = val.replace(/\b\w/g, char => char.toUpperCase());
      break;
  }
});

copyBtn.addEventListener('click', async () => {
  if (!textInput.value) return;
  try {
    await navigator.clipboard.writeText(textInput.value);
    showToast('Copied to clipboard!');
  } catch (err) {
    textInput.select();
    document.execCommand('copy');
    showToast('Copied!');
  }
});

pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    textInput.value = text;
    showToast('Pasted from clipboard!');
    
    if (caseOption.value) {
      caseOption.dispatchEvent(new Event('change'));
    }
  } catch (err) {
    textInput.focus();
    try {
      const successful = document.execCommand('paste');
      if (!successful) {
        throw new Error();
      }
      showToast('Pasted!');
    } catch (fallbackErr) {
      showToast('Click inside text box & press Ctrl+V');
    }
  }
});