function convertText(caseType) {
    const inputText = document.getElementById('inputText').value;
    let outputText = '';

    switch (caseType) {
        case 'uppercase':
            outputText = inputText.toUpperCase();
            break;
        case 'lowercase':
            outputText = inputText.toLowerCase();
            break;
        case 'titlecase':
            outputText = inputText
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            break;
        case 'sentencecase':
            outputText = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
            break;
    }

    document.getElementById('outputText').value = outputText;
    updateCounts(outputText);
}

document.getElementById('uppercaseBtn').addEventListener('click', () => convertText('uppercase'));
document.getElementById('lowercaseBtn').addEventListener('click', () => convertText('lowercase'));
document.getElementById('titlecaseBtn').addEventListener('click', () => convertText('titlecase'));
document.getElementById('sentencecaseBtn').addEventListener('click', () => convertText('sentencecase'));

document.getElementById('clearInput').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    updateCounts('');
});

document.getElementById('copyBtn').addEventListener('click', function() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const outputText = document.getElementById('outputText').value;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-text.txt';
    a.click();
    URL.revokeObjectURL(url);
});

document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    this.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

document.getElementById('textToSpeech').addEventListener('click', function() {
    const outputText = document.getElementById('outputText').value;
    const speech = new SpeechSynthesisUtterance(outputText);
    window.speechSynthesis.speak(speech);
});

function updateCounts(text) {
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).length;
    const sentenceCount = text.split(/[\.\?\!]/).filter(Boolean).length;
    const lineCount = text.split(/\n/).length;

    document.getElementById('charCount').textContent = charCount;
    document.getElementById('wordCount').textContent = wordCount;
    document.getElementById('sentenceCount').textContent = sentenceCount;
    document.getElementById('lineCount').textContent = lineCount;
}

// Add event listener to update counts live
document.getElementById('inputText').addEventListener('input', function() {
    updateCounts(this.value);
});
