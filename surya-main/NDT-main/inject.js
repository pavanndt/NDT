const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\ASUS\\Desktop\\cns\\NDT';
const dashboardPath = path.join(dir, 'dashboard.html');
const scriptJSPath = path.join(dir, 'script.js');
const styleCSSPath = path.join(dir, 'style.css');

let dashboard = fs.readFileSync(dashboardPath, 'utf8');
let scriptJS = fs.readFileSync(scriptJSPath, 'utf8');
let styleCSS = fs.readFileSync(styleCSSPath, 'utf8');

const htmlSnippet = fs.readFileSync(path.join(dir, 'personnel-html.txt'), 'utf8');
const modalsSnippet = fs.readFileSync(path.join(dir, 'personnel-modals.html'), 'utf8');
const jsSnippet = fs.readFileSync(path.join(dir, 'personnel-logic.js'), 'utf8');
const cssSnippet = fs.readFileSync(path.join(dir, 'personnel-styles.css'), 'utf8');

// Inject HTML
dashboard = dashboard.replace('    </main>', htmlSnippet + '\n    </main>');
const endHTML = `</div>
  <script src="script.js"></script>
</body>
</html>`;
const newEndHTML = `</div>
${modalsSnippet}
  <script src="script.js"></script>
</body>
</html>`;
dashboard = dashboard.replace(endHTML, newEndHTML);

fs.writeFileSync(dashboardPath, dashboard);
fs.writeFileSync(scriptJSPath, scriptJS + '\n\n' + jsSnippet);
fs.writeFileSync(styleCSSPath, styleCSS + '\n\n' + cssSnippet);

console.log("Injected Successfully!");
