let personnel = [
  {
    id: 3,
    fName: "dharani",
    lName: "gedela",
    empId: "111",
    email: "dharani@crop",
    phone: "-",
    dept: "",
    loc: "vizag",
    sup: "-",
    status: "Active",
    address: "-"
  }
];

let currentId = 3; // dharani gedela active initially

// DOM Elements
const listContainer = document.getElementById("personnelList");
const btnAddTop = document.getElementById("btnAddTop");
const btnEdit = document.getElementById("btnEdit");

const personnelModalOverlay = document.getElementById("personnelModalOverlay");
const btnPersonnelModalClose = document.getElementById("btnPersonnelModalClose");
const btnModalCancel = document.getElementById("btnModalCancel");
const btnModalSave = document.getElementById("btnModalSave");
const personnelFormObj = document.getElementById("personnelFormObj");
const personnelModalTitle = document.getElementById("personnelModalTitle");

const profilePhotoInput = document.getElementById("profilePhotoInput");
const btnChoosePhoto = document.getElementById("btnChoosePhoto");
const photoFileName = document.getElementById("photoFileName");

function getInitials(fName, lName) {
  let initials = "";
  if (fName) initials += fName.charAt(0).toUpperCase();
  if (lName) initials += lName.charAt(0).toUpperCase();
  if (!initials) return "U";
  return initials;
}

function renderList() {
  if (!listContainer) return;
  listContainer.innerHTML = "";

  personnel.forEach(p => {
    const isActive = p.id === currentId;
    const div = document.createElement("div");
    div.className = `person-item ${isActive ? "active" : ""}`;
    div.onclick = () => selectPerson(p.id);

    const initials = getInitials(p.fName, p.lName);
    const fullName = `${p.fName} ${p.lName}`.trim();
    const dept = p.dept || "No Dept";

    div.innerHTML = `
      <div class="person-avatar">${initials}</div>
      <div class="person-info">
        <span class="person-name">${fullName}</span>
        <span class="person-dept">${dept}</span>
      </div>
    `;

    listContainer.appendChild(div);
  });
}

function selectPerson(id) {
  currentId = id;
  renderList();
  renderDetails();
}

function renderDetails() {
  const p = personnel.find(x => x.id === currentId);
  if (!p) return;

  const initials = getInitials(p.fName, p.lName);
  const fullName = `${p.fName} ${p.lName}`.trim();
  const dept = p.dept || "No Department";

  const fields = {
    detailAvatar: initials, detailName: fullName, detailDept: dept,
    infoFirstName: p.fName || "-", infoLastName: p.lName || "-", infoFullName: fullName || "-",
    infoEmpId: p.empId || "-", infoEmail: p.email || "-", infoPhone: p.phone || "-",
    infoDepartmentDesc: p.dept || "-", infoLocation: p.loc || "-", infoSupervisor: p.sup || "-",
    infoStatus: p.status || "Active", infoAddress: p.address || "-"
  };
  Object.keys(fields).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = fields[id];
  });

  renderEducation();
  renderJobHistory();
  renderExperience();
  renderTraining();
}

// Modal Logic
function openPersonnelModal(mode = "add") {
  if (!personnelModalOverlay) return;
  personnelModalOverlay.classList.remove("hidden");

  if (mode === "add") {
    personnelModalTitle.textContent = "Add New Personnel";
    document.getElementById("editId").value = "";
    personnelFormObj.reset();
    photoFileName.textContent = "No file chosen";
    profilePhotoInput.value = "";
  } else {
    personnelModalTitle.textContent = "Edit Personnel";
    const p = personnel.find(x => x.id === currentId);
    if (p) {
      document.getElementById("editId").value = p.id;
      document.getElementById("fName").value = p.fName;
      document.getElementById("lName").value = p.lName;
      document.getElementById("eId").value = p.empId;
      document.getElementById("email").value = p.email;
      document.getElementById("dept").value = p.dept;
      document.getElementById("status").value = p.status;
      document.getElementById("loc").value = p.loc;
      document.getElementById("sup").value = p.sup;
    }
    photoFileName.textContent = "No file chosen";
    profilePhotoInput.value = "";
  }
}

function closePersonnelModal() {
  if (!personnelModalOverlay) return;
  personnelModalOverlay.classList.add("hidden");
  personnelFormObj.reset();
}

// Event Listeners
if (btnAddTop) btnAddTop.addEventListener("click", () => openPersonnelModal("add"));
if (btnEdit) btnEdit.addEventListener("click", () => openPersonnelModal("edit"));

if (btnPersonnelModalClose) btnPersonnelModalClose.addEventListener("click", closePersonnelModal);
if (btnModalCancel) btnModalCancel.addEventListener("click", closePersonnelModal);

if (btnChoosePhoto) {
  btnChoosePhoto.addEventListener("click", () => {
    profilePhotoInput.click();
  });
}

if (profilePhotoInput) {
  profilePhotoInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      photoFileName.textContent = e.target.files[0].name;
    } else {
      photoFileName.textContent = "No file chosen";
    }
  });
}

if (personnelModalOverlay) {
  personnelModalOverlay.addEventListener("click", (e) => {
    // Do nothing
  });

  personnelModalOverlay.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

if (btnModalSave) {
  btnModalSave.addEventListener("click", () => {
    if (!personnelFormObj.reportValidity()) return;

    const editId = document.getElementById("editId").value;

    const pData = {
      fName: document.getElementById("fName").value,
      lName: document.getElementById("lName").value,
      empId: document.getElementById("eId").value,
      email: document.getElementById("email").value,
      dept: document.getElementById("dept").value,
      status: document.getElementById("status").value,
      loc: document.getElementById("loc").value,
      sup: document.getElementById("sup").value,
      phone: "-",
      address: "-"
    };

    if (editId) {
      // Edit existing
      const index = personnel.findIndex(x => x.id == editId);
      if (index > -1) {
        personnel[index] = { ...personnel[index], ...pData };
        currentId = parseInt(editId);
      }
    } else {
      // Add new
      const newId = personnel.length ? Math.max(...personnel.map(x => x.id)) + 1 : 1;
      personnel.push({ id: newId, ...pData });
      currentId = newId;
    }

    closePersonnelModal();
    renderList();
    renderDetails();
  });
}

if (personnelFormObj) {
  personnelFormObj.addEventListener("submit", (e) => {
    e.preventDefault();
    btnModalSave.click();
  });
}

// Tabs Logic
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const tabContentTitle = document.getElementById("tabContentTitle");

const tabsContainer = document.querySelector(".tabs");
let indicator = document.querySelector(".tab-indicator");
if (tabsContainer && !indicator) {
  indicator = document.createElement("div");
  indicator.className = "tab-indicator";
  tabsContainer.appendChild(indicator);
}

function updateIndicator(btn) {
  if (indicator && btn) {
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.transform = `translateX(${btn.offsetLeft}px)`;
  }
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // This could conflict with dashboard tabs if .tab-btn is reused? 
    // Wait! Dashboard tabs also use .tab-btn but they are in `#page-company-setup`.
    // Let's scope it to `#page-personnel` tabs. (Will do via `closest` check).
    const isPersonnelTab = btn.closest('#page-personnel');
    if (!isPersonnelTab) return; // ignore dashboard tabs

    const personnelTabs = document.querySelectorAll("#page-personnel .tab-btn");
    const personnelContents = document.querySelectorAll("#page-personnel .tab-content");

    personnelTabs.forEach(b => b.classList.remove("active"));
    personnelContents.forEach(c => c.classList.add("hidden"));

    btn.classList.add("active");
    updateIndicator(btn);

    const tabId = btn.getAttribute("data-tab");
    const targetContent = document.getElementById("tab-" + tabId);
    if (targetContent) targetContent.classList.remove("hidden");

    if (tabId === 'personal') {
      if (tabContentTitle) tabContentTitle.textContent = "Personal Information";
    } else {
      if (tabContentTitle) tabContentTitle.textContent = btn.textContent;
    }
  });
});

const activeTab = document.querySelector("#page-personnel .tab-btn.active");
if (activeTab) {
  setTimeout(() => updateIndicator(activeTab), 50);
}

const subTabBtns = document.querySelectorAll(".sub-tab-btn");
const subTabContents = document.querySelectorAll(".sub-tab-content");

subTabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    subTabBtns.forEach(b => b.classList.remove("active"));
    subTabContents.forEach(c => c.classList.add("hidden"));

    btn.classList.add("active");
    const subTabId = btn.getAttribute("data-subtab");
    document.getElementById("subtab-" + subTabId).classList.remove("hidden");
  });
});

function getActivePerson() {
  const p = personnel.find(x => x.id === currentId);
  if (p) {
    if (!p.education) p.education = [];
    if (!p.jobHistory) p.jobHistory = [];
    if (!p.experience) p.experience = [];
    if (!p.training) p.training = [];
  }
  return p;
}

function getFileName(inputId) {
  const input = document.getElementById(inputId);
  if (input && input.files && input.files.length > 0) return input.files[0].name;
  return "No file";
}

function renderTable(data, tbodyId, emptyMsg, colCount, rowHTML) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${colCount}" class="empty-state">${emptyMsg}</td></tr>`;
  } else {
    tbody.innerHTML = data.map(rowHTML).join("");
  }
}

const toggleModal = (modal, formId, show) => {
  if (!modal) return;
  if (show && formId) {
    const formEl = document.getElementById(formId);
    if (formEl) formEl.reset();
  }
  modal.classList[show ? 'remove' : 'add']("hidden");
};

const educationModalObj = document.getElementById("educationModal");
window.openEducationModal = () => toggleModal(educationModalObj, "educationForm", true);
window.closeEducationModal = () => toggleModal(educationModalObj, null, false);

function renderEducation() {
  const p = getActivePerson();
  if (!p) return;
  renderTable(p.education, "eduTableBody", "No education records found.", 5, (edu, idx) => `
    <tr>
      <td>${edu.degree}</td><td>${edu.school}</td><td>${edu.year}</td>
      <td><a href="#" style="color: var(--primary);"><i class="ph ph-file-text"></i> ${edu.doc}</a></td>
      <td style="text-align: right;"><button class="icon-btn-small" onclick="deleteEducation(${idx})"><i class="ph ph-trash" style="color: #ef4444;"></i></button></td>
    </tr>`);
}

window.saveEducation = function () {
  const degree = document.getElementById("eduDegree").value.trim();
  const school = document.getElementById("eduSchool").value.trim();
  const year = document.getElementById("eduYear").value.trim();

  if (!degree || !school || !year) {
    alert("Please fill all required fields (*).");
    return;
  }

  const p = getActivePerson();
  p.education.push({ degree, school, year, doc: getFileName("eduDocument") });
  renderEducation();
  window.closeEducationModal();
};

window.deleteEducation = function (idx) {
  const p = getActivePerson();
  p.education.splice(idx, 1);
  renderEducation();
};

const jobHistoryModalObj = document.getElementById("jobHistoryModal");
const jhCurrentEmp = document.getElementById("jhCurrentEmp");
const jhEndDate = document.getElementById("jhEndDate");

window.openJobHistoryModal = function () {
  toggleModal(jobHistoryModalObj, "jobHistoryForm", true);
  if (jhEndDate) {
    jhEndDate.disabled = false; jhEndDate.style.opacity = "1";
  }
};
window.closeJobHistoryModal = () => toggleModal(jobHistoryModalObj, null, false);

if (jhCurrentEmp) {
  jhCurrentEmp.addEventListener("change", (e) => {
    if (!jhEndDate) return;
    if (e.target.checked) {
      jhEndDate.value = "Present";
      jhEndDate.disabled = true;
      jhEndDate.style.opacity = "0.5";
    } else {
      jhEndDate.value = "";
      jhEndDate.disabled = false;
      jhEndDate.style.opacity = "1";
    }
  });
}

function renderJobHistory() {
  const p = getActivePerson();
  if (!p) return;
  renderTable(p.jobHistory, "jhTableBody", "No job history found.", 5, (jh, idx) => `
    <tr>
      <td>${jh.company}</td><td>${jh.position}</td><td>${jh.fromDate} - ${jh.endDate}</td>
      <td><a href="#" style="color: var(--primary);"><i class="ph ph-file-text"></i> ${jh.doc}</a></td>
      <td style="text-align: right;"><button class="icon-btn-small" onclick="deleteJobHistory(${idx})"><i class="ph ph-trash" style="color: #ef4444;"></i></button></td>
    </tr>`);
}

window.saveJobHistory = function () {
  const company = document.getElementById("jhCompany").value.trim();
  const position = document.getElementById("jhPosition").value.trim();
  const fromDate = document.getElementById("jhFromDate").value.trim();
  let endDate = document.getElementById("jhEndDate").value.trim();

  if (jhCurrentEmp && jhCurrentEmp.checked) endDate = "Present";

  if (!company || !position || !fromDate || !endDate) {
    alert("Please fill all required fields (*).");
    return;
  }

  const p = getActivePerson();
  p.jobHistory.push({ company, position, fromDate, endDate, doc: getFileName("jhDocument") });
  renderJobHistory();
  window.closeJobHistoryModal();
};

window.deleteJobHistory = function (idx) {
  const p = getActivePerson();
  p.jobHistory.splice(idx, 1);
  renderJobHistory();
};

const experienceModalObj = document.getElementById("experienceModal");
window.openExperienceModal = () => toggleModal(experienceModalObj, "experienceForm", true);
window.closeExperienceModal = () => toggleModal(experienceModalObj, null, false);

function renderExperience() {
  const p = getActivePerson();
  if (!p) return;
  renderTable(p.experience, "expTableBody", "No experience records found.", 3, (exp, idx) => `
    <tr>
      <td><strong>${exp.method}</strong></td><td>${exp.hours} hrs</td>
      <td style="text-align: right;"><button class="icon-btn-small" onclick="deleteExperience(${idx})"><i class="ph ph-trash" style="color: #ef4444;"></i></button></td>
    </tr>`);
}

window.saveExperience = function () {
  const method = document.getElementById("expMethod").value.trim();
  const hours = document.getElementById("expHours").value.trim();

  if (!method || !hours) {
    alert("Please fill all required fields (*).");
    return;
  }

  const p = getActivePerson();
  p.experience.push({ method, hours });
  renderExperience();
  window.closeExperienceModal();
};

window.deleteExperience = function (idx) {
  const p = getActivePerson();
  p.experience.splice(idx, 1);
  renderExperience();
};

const trainingModalObj = document.getElementById("trainingModal");
window.openTrainingModal = () => toggleModal(trainingModalObj, "trainingForm", true);
window.closeTrainingModal = () => toggleModal(trainingModalObj, null, false);

function renderTraining() {
  console.log("Render Training called.");
}

window.saveTraining = function () {
  window.closeTrainingModal();
};

document.addEventListener('DOMContentLoaded', () => {
  // Menu logic handling for Personnel
  const menuButtons = document.querySelectorAll(".menu-btn");
  const pageCompanySetup = document.getElementById("page-company-setup");
  const pageCompanyManagement = document.getElementById("page-company-management");
  const pagePersonnel = document.getElementById("page-personnel");
  const companyPageTitle = document.getElementById("companyPageTitle");

  menuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const menuName = this.getAttribute("data-menu");
      if (menuName === "Personnel") {
        if (pageCompanySetup) pageCompanySetup.style.display = "none";
        if (pageCompanyManagement) pageCompanyManagement.style.display = "none";
        if (pagePersonnel) pagePersonnel.style.display = "block";
        if (companyPageTitle) companyPageTitle.textContent = "Personnel Information";

        // Re-render when selected
        setTimeout(() => {
          renderList();
          renderDetails();
        }, 50);
      } else {
        if (pagePersonnel) pagePersonnel.style.display = "none";
        // Check other pages are handled correctly by the existing code
      }
    });
  });
});
