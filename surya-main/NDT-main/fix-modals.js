const fs = require('fs');

// 1. Add specific scoped CSS for personnel modals to style.css
let styleCSS = fs.readFileSync('style.css', 'utf8');
const scopedCSS = `
.personnel-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(31, 41, 55, 0.5);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.personnel-modal-box {
  background: white; width: 600px; max-width: 90vw; border-radius: 12px;
  display: flex; flex-direction: column; max-height: 90vh;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.personnel-modal-header { padding: 20px 24px; border-bottom: 1px solid var(--border-light, #E2E8F0); display: flex; justify-content: space-between; align-items: flex-start; }
.personnel-modal-body { padding: 24px; overflow-y: auto; }
`;
if (!styleCSS.includes('.personnel-modal-overlay')) {
    fs.writeFileSync('style.css', styleCSS + scopedCSS);
}

// 2. Modify personnel-modals.html classes
let modalsHTML = fs.readFileSync('personnel-modals.html', 'utf8');
modalsHTML = modalsHTML.replace(/modal-overlay/g, 'personnel-modal-overlay');
modalsHTML = modalsHTML.replace(/modal-box/g, 'personnel-modal-box');
modalsHTML = modalsHTML.replace(/modal-header/g, 'personnel-modal-header');
modalsHTML = modalsHTML.replace(/modal-body/g, 'personnel-modal-body');

// 3. Inject personnel-modals.html into dashboard.html exactly before closing body
let dashboard = fs.readFileSync('dashboard.html', 'utf8');

if (!dashboard.includes('id="personnelModalOverlay"')) {
    // We will replace </body> with modals + </body>
    dashboard = dashboard.replace('</body>', modalsHTML + '\n</body>');
    fs.writeFileSync('dashboard.html', dashboard);
    console.log("Successfully appended modals to dashboard.html");
} else {
    console.log("Modals already seem to exist in dashboard.html.");
}
