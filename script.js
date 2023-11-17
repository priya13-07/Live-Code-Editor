// Add the following code to your existing JS file

const resetBtn = document.getElementById('reset-btn');
const downloadBtn = document.getElementById('download-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');

const html_code = CodeMirror.fromTextArea(document.querySelector('.html-code textarea'), {
    mode: 'xml',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseTags: true, // Enable auto-closing tags
    matchTags: { bothTags: true },
    autoCloseBrackets: true,
    lineWrapping: true,
});
html_code.setSize(null, "130px");

const css_code = CodeMirror.fromTextArea(document.querySelector('.css-code textarea'), {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    lineWrapping: true,
});
css_code.setSize(null, "130px");

const js_code = CodeMirror.fromTextArea(document.querySelector('.js-code textarea'), {
    mode: 'javascript',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    lineWrapping: true,
});
js_code.setSize(null, "130px");

function run() {
    // Storing data in Local Storage
    localStorage.setItem('html_code', html_code.getValue());
    localStorage.setItem('css_code', css_code.getValue());
    localStorage.setItem('js_code', js_code.getValue());

    // Executing HTML, CSS & JS code
    result.contentDocument.body.innerHTML = `<style>${localStorage.css_code}</style>` + localStorage.html_code;
    result.contentWindow.eval(localStorage.js_code);
}

// Event listeners for CodeMirror changes
html_code.on('change', run);
css_code.on('change', run);
js_code.on('change', run);

// Event listeners for buttons
resetBtn.addEventListener('click', () => {
    // Reset code to initial state
    localStorage.removeItem('html_code');
    localStorage.removeItem('css_code');
    localStorage.removeItem('js_code');
    html_code.setValue('');
    css_code.setValue('');
    js_code.setValue('');
    run();
});

downloadBtn.addEventListener('click', () => {
    // Download code as a project file
    const projectData = {
        html: html_code.getValue(),
        css: css_code.getValue(),
        js: js_code.getValue(),
    };
    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'project.json';
    link.click();
});

fullscreenBtn.addEventListener('click', () => {
    // Toggle fullscreen mode
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        document.documentElement.requestFullscreen();
    }
});

// Accessing data stored in Local Storage.
html_code.setValue(localStorage.html_code || '');
css_code.setValue(localStorage.css_code || '');
js_code.setValue(localStorage.js_code || '');

