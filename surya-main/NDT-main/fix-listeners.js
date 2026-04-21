const fs = require('fs');
let code = fs.readFileSync('script.js', 'utf8');

const targetStr = `    if (addBtn) {
        addBtn.addEventListener("click", () => {
             compForm.reset();
             const compStatusInput = document.getElementById("comp-status");
             if(compStatusInput) compStatusInput.checked = true;
             updateStatusLabel();
             editingId = null;
             document.getElementById("save-btn").innerHTML = "<i class='fa-regular fa-floppy-disk'></i> Register Company";
             document.querySelector("#modalOverlay .modal-header h2").textContent = "Register New Company";
             openModal(modalOverlay);
        });
    }`;

const insertStr = `    if (addBtn) {
        addBtn.addEventListener("click", () => {
             compForm.reset();
             const compStatusInput = document.getElementById("comp-status");
             if(compStatusInput) compStatusInput.checked = true;
             updateStatusLabel();
             editingId = null;
             document.getElementById("save-btn").innerHTML = "<i class='fa-regular fa-floppy-disk'></i> Register Company";
             document.querySelector("#modalOverlay .modal-header h2").textContent = "Register New Company";
             openModal(modalOverlay);
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeModal(modalOverlay);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            closeModal(modalOverlay);
        });
    }`;

if(code.includes('if (addBtn) {')) {
    // Basic regex replacer string
    code = code.replace(/    if \(addBtn\) \{\s+addBtn.addEventListener\("click", \(\) => \{\s+compForm.reset\(\);\s+const compStatusInput = document.getElementById\("comp-status"\);\s+if\(compStatusInput\) compStatusInput.checked = true;\s+updateStatusLabel\(\);\s+editingId = null;\s+document.getElementById\("save-btn"\).innerHTML = "<i class='fa-regular fa-floppy-disk'><\/i> Register Company";\s+document.querySelector\("#modalOverlay \.modal-header h2"\).textContent = "Register New Company";\s+openModal\(modalOverlay\);\s+\}\);\s+\}/, insertStr);
    fs.writeFileSync('script.js', code);
    console.log("Replaced successfully via JS");
}
