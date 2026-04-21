document.addEventListener("DOMContentLoaded", function () {
  // LOGIN PAGE
  const loginForm = document.getElementById("loginForm");
  const togglePassword = document.getElementById("togglePassword");

  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const eyeIcon = document.getElementById("eyeIcon");

      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        if (eyeIcon) {
          eyeIcon.classList.remove("fa-eye");
          eyeIcon.classList.add("fa-eye-slash");
        }
      } else {
        passwordInput.type = "password";
        if (eyeIcon) {
          eyeIcon.classList.remove("fa-eye-slash");
          eyeIcon.classList.add("fa-eye");
        }
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email")?.value.trim() || "";
      const password = document.getElementById("password")?.value.trim() || "";

      if (email !== "" && password !== "") {
        window.location.href = "dashboard.html";
      } else {
        alert("Please enter email and password.");
      }
    });
  }

  // DASHBOARD TABS
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTab = this.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      tabContents.forEach((content) => content.classList.remove("active"));

      const selectedTab = document.getElementById(targetTab);
      if (selectedTab) {
        selectedTab.classList.add("active");
      }
    });
  });

  // SIDEBAR BUTTONS
  const menuButtons = document.querySelectorAll(".menu-btn");
  const pageCompanySetup = document.getElementById("page-company-setup");
  const pageCompanyManagement = document.getElementById("page-company-management");
  const companyPageTitle = document.getElementById("companyPageTitle");

  menuButtons.forEach((button) => {
    button.addEventListener("click", function () {
      menuButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const menuName = this.getAttribute("data-menu");
      if (menuName === "Company Setup") {
          if (pageCompanySetup) pageCompanySetup.style.display = "block";
          if (pageCompanyManagement) pageCompanyManagement.style.display = "none";
          if (companyPageTitle) companyPageTitle.textContent = "Company Setup";
      } else if (menuName === "Company Management") {
          if (pageCompanySetup) pageCompanySetup.style.display = "none";
          if (pageCompanyManagement) pageCompanyManagement.style.display = "block";
          if (companyPageTitle) companyPageTitle.textContent = "Company Management";
      } else {
          if (pageCompanySetup) pageCompanySetup.style.display = "none";
          if (pageCompanyManagement) pageCompanyManagement.style.display = "none";
          if (companyPageTitle) companyPageTitle.textContent = menuName;
      }
    });
  });
  // SWITCH COMPANY
  const companySwitch = document.getElementById("companySwitch");
  if (companySwitch) {
    companySwitch.addEventListener("change", function () {
      if (this.value === "Simco NDT Demo") {
        updateCompanyName("Simco NDT Demo");
      } else if (this.value === "Sharp NDE LLC") {
        updateCompanyName("Sharp NDE LLC");
      }
    });
  }

  // COLLAPSE BUTTON
  const collapseBtn = document.getElementById("collapseBtn");
if (collapseBtn) {
  collapseBtn.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("hide-sidebar");
  });
}

  // EDIT COMPANY MODAL
  const editProfileBtn = document.getElementById("editProfileBtn");
  const editCompanyModal = document.getElementById("editCompanyModal");
  const closeEditCompanyModal = document.getElementById("closeEditCompanyModal");
  const cancelEditCompanyBtn = document.getElementById("cancelEditCompanyBtn");
  const saveCompanyBtn = document.getElementById("saveCompanyBtn");

  if (editProfileBtn && editCompanyModal) {
    editProfileBtn.addEventListener("click", function () {
      openModal(editCompanyModal);
    });
  }

  if (closeEditCompanyModal && editCompanyModal) {
    closeEditCompanyModal.addEventListener("click", function () {
      closeModal(editCompanyModal);
    });
  }

  if (cancelEditCompanyBtn && editCompanyModal) {
    cancelEditCompanyBtn.addEventListener("click", function () {
      closeModal(editCompanyModal);
    });
  }

  if (saveCompanyBtn) {
    saveCompanyBtn.addEventListener("click", function () {
      saveCompanyDetails();
    });
  }

  // ADD LOCATION MODAL
  const addLocationBtn = document.getElementById("addLocationBtn");
  const addLocationModal = document.getElementById("addLocationModal");
  const closeAddLocationModal = document.getElementById("closeAddLocationModal");
  const cancelAddLocationBtn = document.getElementById("cancelAddLocationBtn");
  const saveLocationBtn = document.getElementById("saveLocationBtn");

  if (addLocationBtn && addLocationModal) {
    addLocationBtn.addEventListener("click", function () {
      openModal(addLocationModal);
    });
  }

  if (closeAddLocationModal && addLocationModal) {
    closeAddLocationModal.addEventListener("click", function () {
      closeModal(addLocationModal);
    });
  }

  if (cancelAddLocationBtn && addLocationModal) {
    cancelAddLocationBtn.addEventListener("click", function () {
      closeModal(addLocationModal);
    });
  }

  if (saveLocationBtn) {
    saveLocationBtn.addEventListener("click", function () {
      saveLocation();
    });
  }

  // LOGO CHANGE
  const changeLogoBtn = document.getElementById("changeLogoBtn");
  const logoUpload = document.getElementById("logoUpload");

  if (changeLogoBtn && logoUpload) {
    changeLogoBtn.addEventListener("click", function () {
      logoUpload.click();
    });

    logoUpload.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("companyLogoPreview");
        const sideLogo = document.querySelector(".side-logo");

        if (preview) {
          preview.src = e.target.result;
        }

        if (sideLogo) {
          sideLogo.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // MODULES
  setupDocumentsModule();
  setupMethodsModule();
  setupExamsModule();
  setupSignaturesModule();
  setupEmailModule();
  setupAlertsModule();
  setupRichTextEditor();

  // CLOSE MODALS ON BACKGROUND CLICK
  [
    editCompanyModal,
    addLocationModal,
    document.getElementById("newFolderModal"),
    document.getElementById("newFileModal"),
    document.getElementById("addMethodModal"),
    document.getElementById("addExamModal"),
    document.getElementById("addSignatureModal"),
    document.getElementById("addAlertTemplateModal")
  ].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  renderLocations();
});

// GLOBAL DATA
let locations = [];
let currentFolder = "Root";
let currentView = "list";
let methodsData = [];
let methodLevels = ["Level I", "Level II", "Level III"];
let examsData = [];
let signaturesData = [];
let selectedSignatureImage = "";
let alertsData = [];

const documentsData = {
  Root: []
};

// COMMON
function openModal(modal) {
  if (modal) {
    modal.classList.add("show");
  }
}

function closeModal(modal) {
  if (modal) {
    modal.classList.remove("show");
  }
}

function updateCompanyName(name) {
  const pageTitle = document.getElementById("companyPageTitle");
  const companyNameInput = document.getElementById("companyNameInput");

  if (pageTitle) {
    pageTitle.textContent = "Company Setup - " + name;
  }

  if (companyNameInput) {
    companyNameInput.value = name;
  }
}

// PROFILE
function saveCompanyDetails() {
  const companyName = document.getElementById("companyNameInput")?.value.trim() || "";
  const address = document.getElementById("companyAddressInput")?.value.trim() || "";
  const email = document.getElementById("companyEmailInput")?.value.trim() || "";
  const phone = document.getElementById("companyPhoneInput")?.value.trim() || "";

  if (companyName === "" || address === "" || email === "") {
    alert("Please fill required fields.");
    return;
  }

  const pageTitle = document.getElementById("companyPageTitle");
  const displayAddress = document.getElementById("displayAddress");
  const displayEmail = document.getElementById("displayEmail");
  const displayPhone = document.getElementById("displayPhone");

  if (pageTitle) {
    pageTitle.textContent = "Company Setup - " + companyName;
  }

  if (displayAddress) {
    displayAddress.textContent = address;
  }

  if (displayEmail) {
    displayEmail.textContent = email;
  }

  if (displayPhone) {
    displayPhone.textContent = phone === "" ? "N/A" : phone;
  }

  closeModal(document.getElementById("editCompanyModal"));
}

function saveLocation() {
  const locationName = document.getElementById("locationNameInput")?.value.trim() || "";
  const locationAddress = document.getElementById("locationAddressInput")?.value.trim() || "";

  if (locationName === "" || locationAddress === "") {
    alert("Please enter location name and address.");
    return;
  }

  locations.push({
    name: locationName,
    address: locationAddress
  });

  renderLocations();

  const locationNameInput = document.getElementById("locationNameInput");
  const locationAddressInput = document.getElementById("locationAddressInput");

  if (locationNameInput) locationNameInput.value = "";
  if (locationAddressInput) locationAddressInput.value = "";

  closeModal(document.getElementById("addLocationModal"));
}

function renderLocations() {
  const locationList = document.getElementById("locationList");
  if (!locationList) return;

  if (locations.length === 0) {
    locationList.innerHTML = `<div class="empty-row">No locations found.</div>`;
    return;
  }

  let rows = "";
  locations.forEach((location, index) => {
    rows += `
      <div class="location-row">
        <span>${escapeHtml(location.name)}</span>
        <span>${escapeHtml(location.address)}</span>
        <span>
          <button class="delete-location-btn" onclick="deleteLocation(${index})">Delete</button>
        </span>
      </div>
    `;
  });

  locationList.innerHTML = rows;
}

function deleteLocation(index) {
  locations.splice(index, 1);
  renderLocations();
}

// DOCUMENTS
function setupDocumentsModule() {
  const newFolderBtn = document.getElementById("newFolderBtn");
  const newFileBtn = document.getElementById("newFileBtn");
  const uploadBtn = document.getElementById("uploadBtn");
  const hiddenFileUpload = document.getElementById("hiddenFileUpload");
  const listViewBtn = document.getElementById("listViewBtn");
  const gridViewBtn = document.getElementById("gridViewBtn");
  const folderSearch = document.getElementById("folderSearch");

  const newFolderModal = document.getElementById("newFolderModal");
  const closeNewFolderModal = document.getElementById("closeNewFolderModal");
  const cancelNewFolderBtn = document.getElementById("cancelNewFolderBtn");
  const saveNewFolderBtn = document.getElementById("saveNewFolderBtn");

  const newFileModal = document.getElementById("newFileModal");
  const closeNewFileModal = document.getElementById("closeNewFileModal");
  const cancelNewFileBtn = document.getElementById("cancelNewFileBtn");
  const saveNewFileBtn = document.getElementById("saveNewFileBtn");

  if (newFolderBtn && newFolderModal) {
    newFolderBtn.addEventListener("click", function () {
      openModal(newFolderModal);
    });
  }

  if (closeNewFolderModal && newFolderModal) {
    closeNewFolderModal.addEventListener("click", function () {
      closeModal(newFolderModal);
    });
  }

  if (cancelNewFolderBtn && newFolderModal) {
    cancelNewFolderBtn.addEventListener("click", function () {
      closeModal(newFolderModal);
    });
  }

  if (saveNewFolderBtn) {
    saveNewFolderBtn.addEventListener("click", function () {
      createFolder();
    });
  }

  if (newFileBtn && newFileModal) {
    newFileBtn.addEventListener("click", function () {
      openModal(newFileModal);
    });
  }

  if (closeNewFileModal && newFileModal) {
    closeNewFileModal.addEventListener("click", function () {
      closeModal(newFileModal);
    });
  }

  if (cancelNewFileBtn && newFileModal) {
    cancelNewFileBtn.addEventListener("click", function () {
      closeModal(newFileModal);
    });
  }

  if (saveNewFileBtn) {
    saveNewFileBtn.addEventListener("click", function () {
      createFile();
    });
  }

  if (uploadBtn && hiddenFileUpload) {
    uploadBtn.addEventListener("click", function () {
      hiddenFileUpload.click();
    });

    hiddenFileUpload.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;

      documentsData[currentFolder].push({
        type: "file",
        name: file.name
      });

      renderDocuments();

      hiddenFileUpload.value = "";
    });
  }

  if (listViewBtn) {
    listViewBtn.addEventListener("click", function () {
      currentView = "list";
      renderDocumentsToolbar();
      renderDocuments();
    });
  }

  if (gridViewBtn) {
    gridViewBtn.addEventListener("click", function () {
      currentView = "grid";
      renderDocumentsToolbar();
      renderDocuments();
    });
  }

  if (folderSearch) {
    folderSearch.addEventListener("input", function () {
      renderFolderList(this.value.trim().toLowerCase());
    });
  }

  renderFolderList();
  renderDocumentsToolbar();
  renderDocuments();
}

function createFolder() {
  const input = document.getElementById("newFolderNameInput");
  if (!input) return;

  const folderName = input.value.trim();

  if (folderName === "") {
    alert("Please enter folder name.");
    return;
  }

  if (documentsData[folderName]) {
    alert("Folder already exists.");
    return;
  }

  documentsData[folderName] = [];
  documentsData[currentFolder].push({
    type: "folder",
    name: folderName
  });

  input.value = "";
  closeModal(document.getElementById("newFolderModal"));
  renderFolderList();
  renderDocuments();
}

function createFile() {
  const input = document.getElementById("newFileNameInput");
  if (!input) return;

  const fileName = input.value.trim();

  if (fileName === "") {
    alert("Please enter file name.");
    return;
  }

  documentsData[currentFolder].push({
    type: "file",
    name: fileName
  });

  input.value = "";
  closeModal(document.getElementById("newFileModal"));
  renderDocuments();
}

function renderFolderList(searchText = "") {
  const folderList = document.getElementById("folderList");
  if (!folderList) return;

  const folders = Object.keys(documentsData).filter((folder) =>
    folder.toLowerCase().includes(searchText)
  );

  let html = "";

  folders.forEach((folder) => {
    html += `
      <button class="folder-item ${folder === currentFolder ? "active" : ""}" onclick="openFolder('${jsEscape(folder)}')">
        <i class="fa-solid fa-folder"></i> ${escapeHtml(folder)}
      </button>
    `;
  });

  folderList.innerHTML = html;
}

function openFolder(folderName) {
  currentFolder = folderName;

  const currentFolderTitle = document.getElementById("currentFolderTitle");
  if (currentFolderTitle) {
    currentFolderTitle.textContent = folderName;
  }

  const folderSearch = document.getElementById("folderSearch");
  const searchText = folderSearch ? folderSearch.value.trim().toLowerCase() : "";

  renderFolderList(searchText);
  renderDocuments();
}

function renderDocumentsToolbar() {
  const listViewBtn = document.getElementById("listViewBtn");
  const gridViewBtn = document.getElementById("gridViewBtn");

  if (listViewBtn && gridViewBtn) {
    listViewBtn.classList.remove("active", "orange-tool");
    gridViewBtn.classList.remove("active", "orange-tool");

    if (currentView === "list") {
      listViewBtn.classList.add("active", "orange-tool");
    } else {
      gridViewBtn.classList.add("active", "orange-tool");
    }
  }
}

function renderDocuments() {
  const fileItems = document.getElementById("fileItems");
  const emptyFolderState = document.getElementById("emptyFolderState");

  if (!fileItems || !emptyFolderState) return;

  const items = documentsData[currentFolder] || [];

  if (items.length === 0) {
    emptyFolderState.style.display = "flex";
    fileItems.style.display = "none";
    return;
  }

  emptyFolderState.style.display = "none";
  fileItems.style.display = currentView === "grid" ? "grid" : "flex";
  fileItems.className = `file-items ${currentView}-view`;

  let html = "";

  items.forEach((item, index) => {
    const iconClass = item.type === "folder" ? "fa-folder" : "fa-file-lines";
    const iconColor = item.type === "folder" ? "#3b82f6" : "#eb8f1f";

    html += `
      <div class="file-card">
        <div class="file-left">
          <i class="fa-solid ${iconClass}" style="color:${iconColor};"></i>
          <span class="file-name">${escapeHtml(item.name)}</span>
        </div>
        <div class="file-actions">
          ${
            item.type === "folder"
              ? `<button class="small-action-btn" onclick="openFolder('${jsEscape(item.name)}')">Open</button>`
              : ""
          }
          <button class="small-action-btn" onclick="deleteDocumentItem(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  fileItems.innerHTML = html;
}

function deleteDocumentItem(index) {
  if (!documentsData[currentFolder]) return;

  const item = documentsData[currentFolder][index];

  if (item.type === "folder") {
    delete documentsData[item.name];
  }

  documentsData[currentFolder].splice(index, 1);

  const folderSearch = document.getElementById("folderSearch");
  const searchText = folderSearch ? folderSearch.value.trim().toLowerCase() : "";

  renderFolderList(searchText);
  renderDocuments();
}

// METHODS
function setupMethodsModule() {
  const addMethodBtn = document.getElementById("addMethodBtn");
  const addMethodModal = document.getElementById("addMethodModal");
  const closeAddMethodModal = document.getElementById("closeAddMethodModal");
  const cancelAddMethodBtn = document.getElementById("cancelAddMethodBtn");
  const saveMethodBtn = document.getElementById("saveMethodBtn");
  const addLevelChipBtn = document.getElementById("addLevelChipBtn");

  const methodNameSearch = document.getElementById("methodNameSearch");
  const techniqueSearch = document.getElementById("techniqueSearch");
  const levelSearch = document.getElementById("levelSearch");

  const prevMethodBtn = document.getElementById("prevMethodBtn");
  const nextMethodBtn = document.getElementById("nextMethodBtn");

  if (addMethodBtn && addMethodModal) {
    addMethodBtn.addEventListener("click", function () {
      const methodNameInput = document.getElementById("methodNameInput");
      const methodTechniqueInput = document.getElementById("methodTechniqueInput");
      const methodAbbreviationInput = document.getElementById("methodAbbreviationInput");
      const methodLevelInput = document.getElementById("methodLevelInput");
      const excludeCertificateInput = document.getElementById("excludeCertificateInput");
      const excludeCompositeInput = document.getElementById("excludeCompositeInput");

      if (methodNameInput) methodNameInput.value = "";
      if (methodTechniqueInput) methodTechniqueInput.value = "";
      if (methodAbbreviationInput) methodAbbreviationInput.value = "";
      if (methodLevelInput) methodLevelInput.value = "";
      if (excludeCertificateInput) excludeCertificateInput.checked = false;
      if (excludeCompositeInput) excludeCompositeInput.checked = false;

      methodLevels = ["Level I", "Level II", "Level III"];
      renderLevelChips();
      openModal(addMethodModal);
    });
  }

  if (closeAddMethodModal && addMethodModal) {
    closeAddMethodModal.addEventListener("click", function () {
      closeModal(addMethodModal);
    });
  }

  if (cancelAddMethodBtn && addMethodModal) {
    cancelAddMethodBtn.addEventListener("click", function () {
      closeModal(addMethodModal);
    });
  }

  if (saveMethodBtn) {
    saveMethodBtn.addEventListener("click", function () {
      saveMethod();
    });
  }

  if (addLevelChipBtn) {
    addLevelChipBtn.addEventListener("click", function () {
      addMethodLevel();
    });
  }

  if (methodNameSearch) {
    methodNameSearch.addEventListener("input", renderMethodsTable);
  }

  if (techniqueSearch) {
    techniqueSearch.addEventListener("input", renderMethodsTable);
  }

  if (levelSearch) {
    levelSearch.addEventListener("input", renderMethodsTable);
  }

  if (prevMethodBtn) {
    prevMethodBtn.addEventListener("click", function () {
      alert("Previous button is working.");
    });
  }

  if (nextMethodBtn) {
    nextMethodBtn.addEventListener("click", function () {
      alert("Next button is working.");
    });
  }

  renderMethodsTable();
}

function addMethodLevel() {
  const levelInput = document.getElementById("methodLevelInput");
  if (!levelInput) return;

  const newLevel = levelInput.value.trim();

  if (newLevel === "") {
    alert("Please enter a level.");
    return;
  }

  if (methodLevels.includes(newLevel)) {
    alert("Level already added.");
    return;
  }

  methodLevels.push(newLevel);
  levelInput.value = "";
  renderLevelChips();
}

function renderLevelChips() {
  const levelChipList = document.getElementById("levelChipList");
  if (!levelChipList) return;

  let html = "";
  methodLevels.forEach((level, index) => {
    html += `
      <div class="level-chip">
        <span>${escapeHtml(level)}</span>
        <button type="button" onclick="removeMethodLevel(${index})">✕</button>
      </div>
    `;
  });

  levelChipList.innerHTML = html;
}

function removeMethodLevel(index) {
  methodLevels.splice(index, 1);
  renderLevelChips();
}

function saveMethod() {
  const methodName = document.getElementById("methodNameInput")?.value.trim() || "";
  const technique = document.getElementById("methodTechniqueInput")?.value.trim() || "";
  const abbreviation = document.getElementById("methodAbbreviationInput")?.value.trim() || "";
  const excludeCertificate = document.getElementById("excludeCertificateInput")?.checked || false;
  const excludeComposite = document.getElementById("excludeCompositeInput")?.checked || false;

  if (methodName === "" || technique === "" || abbreviation === "") {
    alert("Please fill all required fields.");
    return;
  }

  methodsData.push({
    methodName,
    technique,
    abbreviation,
    levels: [...methodLevels],
    excludeCertificate,
    excludeComposite
  });

  const methodNameInput = document.getElementById("methodNameInput");
  const methodTechniqueInput = document.getElementById("methodTechniqueInput");
  const methodAbbreviationInput = document.getElementById("methodAbbreviationInput");
  const methodLevelInput = document.getElementById("methodLevelInput");
  const excludeCertificateInput = document.getElementById("excludeCertificateInput");
  const excludeCompositeInput = document.getElementById("excludeCompositeInput");

  if (methodNameInput) methodNameInput.value = "";
  if (methodTechniqueInput) methodTechniqueInput.value = "";
  if (methodAbbreviationInput) methodAbbreviationInput.value = "";
  if (methodLevelInput) methodLevelInput.value = "";
  if (excludeCertificateInput) excludeCertificateInput.checked = false;
  if (excludeCompositeInput) excludeCompositeInput.checked = false;

  methodLevels = ["Level I", "Level II", "Level III"];

  renderLevelChips();
  renderMethodsTable();
  closeModal(document.getElementById("addMethodModal"));
}

function renderMethodsTable() {
  const methodsTableBody = document.getElementById("methodsTableBody");
  const methodsCountText = document.getElementById("methodsCountText");

  if (!methodsTableBody) return;

  const methodNameSearch = document.getElementById("methodNameSearch")?.value.trim().toLowerCase() || "";
  const techniqueSearch = document.getElementById("techniqueSearch")?.value.trim().toLowerCase() || "";
  const levelSearch = document.getElementById("levelSearch")?.value.trim().toLowerCase() || "";

  const filteredMethods = methodsData.filter((method) => {
    const matchesName = method.methodName.toLowerCase().includes(methodNameSearch);
    const matchesTechnique = method.technique.toLowerCase().includes(techniqueSearch);
    const matchesLevel = method.levels.join(" ").toLowerCase().includes(levelSearch);

    return matchesName && matchesTechnique && matchesLevel;
  });

  if (filteredMethods.length === 0) {
    methodsTableBody.innerHTML = `<div class="empty-row">No methods found.</div>`;
    if (methodsCountText) {
      methodsCountText.textContent = "Showing 1 to 0 of 0 results";
    }
    return;
  }

  let html = "";
  filteredMethods.forEach((method) => {
    const levelsHtml = method.levels
      .map((level) => `<span class="method-level-tag">${escapeHtml(level)}</span>`)
      .join("");

    const realIndex = methodsData.indexOf(method);

    html += `
      <div class="method-row">
        <span>${escapeHtml(method.methodName)}</span>
        <span>${escapeHtml(method.technique)}</span>
        <span>${escapeHtml(method.abbreviation)}</span>
        <div class="method-level-tags">${levelsHtml}</div>
        <div class="method-actions">
          <button class="method-action-btn" onclick="deleteMethod(${realIndex})">Delete</button>
        </div>
      </div>
    `;
  });

  methodsTableBody.innerHTML = html;

  if (methodsCountText) {
    methodsCountText.textContent = `Showing 1 to ${filteredMethods.length} of ${filteredMethods.length} results`;
  }
}

function deleteMethod(index) {
  methodsData.splice(index, 1);
  renderMethodsTable();
}

// EXAMS
function setupExamsModule() {
  const addExamBtn = document.getElementById("addExamBtn");
  const addExamModal = document.getElementById("addExamModal");
  const closeAddExamModal = document.getElementById("closeAddExamModal");
  const cancelAddExamBtn = document.getElementById("cancelAddExamBtn");
  const saveExamBtn = document.getElementById("saveExamBtn");

  if (addExamBtn && addExamModal) {
    addExamBtn.addEventListener("click", function () {
      const examNameInput = document.getElementById("examNameInput");
      const examPassMarksInput = document.getElementById("examPassMarksInput");
      const examScoringDetailsInput = document.getElementById("examScoringDetailsInput");

      if (examNameInput) examNameInput.value = "";
      if (examPassMarksInput) examPassMarksInput.value = "";
      if (examScoringDetailsInput) examScoringDetailsInput.value = "";

      openModal(addExamModal);
    });
  }

  if (closeAddExamModal && addExamModal) {
    closeAddExamModal.addEventListener("click", function () {
      closeModal(addExamModal);
    });
  }

  if (cancelAddExamBtn && addExamModal) {
    cancelAddExamBtn.addEventListener("click", function () {
      closeModal(addExamModal);
    });
  }

  if (saveExamBtn) {
    saveExamBtn.addEventListener("click", function () {
      saveExamType();
    });
  }

  renderExamsTable();
}

function saveExamType() {
  const name = document.getElementById("examNameInput")?.value.trim() || "";
  const passMarks = document.getElementById("examPassMarksInput")?.value.trim() || "";
  const scoringDetails = document.getElementById("examScoringDetailsInput")?.value.trim() || "";

  if (name === "" || passMarks === "") {
    alert("Please fill Name and Pass Marks.");
    return;
  }

  examsData.push({
    name: name,
    passMarks: passMarks,
    scoringDetails: scoringDetails === "" ? "-" : scoringDetails
  });

  renderExamsTable();
  closeModal(document.getElementById("addExamModal"));
}

function renderExamsTable() {
  const examsTableBody = document.getElementById("examsTableBody");
  if (!examsTableBody) return;

  if (examsData.length === 0) {
    examsTableBody.innerHTML = `<div class="empty-row">No exam types found.</div>`;
    return;
  }

  let html = "";

  examsData.forEach((exam, index) => {
    html += `
      <div class="exam-row">
        <span>${escapeHtml(exam.name)}</span>
        <span>${escapeHtml(exam.passMarks)}</span>
        <span>${escapeHtml(exam.scoringDetails)}</span>
        <div class="exam-actions">
          <button class="exam-action-btn" onclick="deleteExamType(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  examsTableBody.innerHTML = html;
}

function deleteExamType(index) {
  examsData.splice(index, 1);
  renderExamsTable();
}

// SIGNATURES
function setupSignaturesModule() {
  const addSignatureBtn = document.getElementById("addSignatureBtn");
  const addSignatureModal = document.getElementById("addSignatureModal");
  const closeAddSignatureModal = document.getElementById("closeAddSignatureModal");
  const cancelAddSignatureBtn = document.getElementById("cancelAddSignatureBtn");
  const saveSignatureBtn = document.getElementById("saveSignatureBtn");
  const signatureUploadBox = document.getElementById("signatureUploadBox");
  const signatureImageInput = document.getElementById("signatureImageInput");

  if (addSignatureBtn && addSignatureModal) {
    addSignatureBtn.addEventListener("click", function () {
      resetSignatureForm();
      addSignatureModal.classList.add("show");
    });
  }

  if (closeAddSignatureModal && addSignatureModal) {
    closeAddSignatureModal.addEventListener("click", function () {
      addSignatureModal.classList.remove("show");
    });
  }

  if (cancelAddSignatureBtn && addSignatureModal) {
    cancelAddSignatureBtn.addEventListener("click", function () {
      addSignatureModal.classList.remove("show");
    });
  }

  if (signatureUploadBox && signatureImageInput) {
    signatureUploadBox.addEventListener("click", function () {
      signatureImageInput.click();
    });

    signatureImageInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be up to 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        selectedSignatureImage = e.target.result;

        const previewWrap = document.getElementById("signaturePreviewWrap");
        const previewImage = document.getElementById("signaturePreviewImage");

        if (previewWrap && previewImage) {
          previewImage.src = selectedSignatureImage;
          previewWrap.style.display = "block";
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (saveSignatureBtn) {
    saveSignatureBtn.addEventListener("click", function () {
      saveSignature();
    });
  }

  renderSignaturesTable();
}

function resetSignatureForm() {
  const nameInput = document.getElementById("signatureNameInput");
  const levelInput = document.getElementById("signatureLevelInput");
  const imageInput = document.getElementById("signatureImageInput");
  const previewWrap = document.getElementById("signaturePreviewWrap");
  const previewImage = document.getElementById("signaturePreviewImage");

  if (nameInput) nameInput.value = "";
  if (levelInput) levelInput.value = "";
  if (imageInput) imageInput.value = "";
  if (previewImage) previewImage.src = "";
  if (previewWrap) previewWrap.style.display = "none";

  selectedSignatureImage = "";
}

function saveSignature() {
  const name = document.getElementById("signatureNameInput")?.value.trim() || "";
  const level = document.getElementById("signatureLevelInput")?.value.trim() || "";
  const modal = document.getElementById("addSignatureModal");

  if (name === "" || selectedSignatureImage === "") {
    alert("Please fill Name and upload Signature Image.");
    return;
  }

  signaturesData.push({
    name: name,
    level: level === "" ? "-" : level,
    image: selectedSignatureImage
  });

  renderSignaturesTable();

  if (modal) {
    modal.classList.remove("show");
  }
}

function renderSignaturesTable() {
  const signaturesTableBody = document.getElementById("signaturesTableBody");
  if (!signaturesTableBody) return;

  if (signaturesData.length === 0) {
    signaturesTableBody.innerHTML = `<div class="empty-row">No signatures found.</div>`;
    return;
  }

  let html = "";

  signaturesData.forEach((signature, index) => {
    html += `
      <div class="signature-row">
        <span>${escapeHtml(signature.name)}</span>
        <span>${escapeHtml(signature.level)}</span>
        <span><img src="${signature.image}" alt="Signature" class="signature-thumb"></span>
        <div class="signature-actions">
          <button class="signature-action-btn" onclick="deleteSignature(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  signaturesTableBody.innerHTML = html;
}

function deleteSignature(index) {
  signaturesData.splice(index, 1);
  renderSignaturesTable();
}

// EMAIL
function setupEmailModule() {
  const authButtons = document.querySelectorAll(".auth-tab-btn, .auth-method-btn");
  const authHelpText = document.getElementById("authHelpText") || document.getElementById("authMethodHelp");
  const smtpPort = document.getElementById("smtpPort") || document.getElementById("smtpPortInput");
  const useSslTls = document.getElementById("useSslTls") || document.getElementById("sslTlsInput");
  const testConnectionBtn = document.getElementById("testConnectionBtn");
  const sendTestBtn = document.getElementById("sendTestBtn") || document.getElementById("sendTestEmailBtn");
  const saveEmailBtn = document.getElementById("saveEmailBtn") || document.getElementById("saveEmailConfigBtn");

  authButtons.forEach((button) => {
    button.addEventListener("click", function () {
      authButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const type = this.getAttribute("data-auth");

      if (type === "basic") {
        if (authHelpText) {
          authHelpText.textContent =
            "Works for most providers. For Office 365/Gmail, you'll need an 'App Password'.";
        }
        if (smtpPort) smtpPort.value = "587";
      } else if (type === "oauth2") {
        if (authHelpText) {
          authHelpText.textContent =
            "Use OAuth2 for secure provider authentication without storing a standard password.";
        }
        if (smtpPort) smtpPort.value = "587";
      } else if (type === "graph") {
        if (authHelpText) {
          authHelpText.textContent =
            "Use Microsoft Graph API to send mail without traditional SMTP delivery.";
        }
        if (smtpPort) smtpPort.value = "443";
      }
    });
  });

  if (useSslTls && smtpPort) {
    useSslTls.addEventListener("change", function () {
      smtpPort.value = this.checked ? "465" : "587";
    });
  }

  if (testConnectionBtn) {
    testConnectionBtn.addEventListener("click", function () {
      const host = (document.getElementById("smtpHost") || document.getElementById("smtpHostInput"))?.value.trim() || "";
      const username = (document.getElementById("smtpUsername") || document.getElementById("smtpUsernameInput"))?.value.trim() || "";

      if (host === "" || username === "") {
        alert("Please enter SMTP Host and Email Address before testing connection.");
        return;
      }

      alert("Connection test successful.");
    });
  }

  if (sendTestBtn) {
    sendTestBtn.addEventListener("click", function () {
      const testEmail = (document.getElementById("testRecipientEmail") || document.getElementById("testRecipientInput"))?.value.trim() || "";

      if (testEmail === "") {
        alert("Please enter recipient email for test.");
        return;
      }

      alert("Test email sent successfully to " + testEmail);
    });
  }

  if (saveEmailBtn) {
    saveEmailBtn.addEventListener("click", function () {
      const host = (document.getElementById("smtpHost") || document.getElementById("smtpHostInput"))?.value.trim() || "";
      const username = (document.getElementById("smtpUsername") || document.getElementById("smtpUsernameInput"))?.value.trim() || "";

      if (host === "" || username === "") {
        alert("Please fill required email configuration fields.");
        return;
      }

      alert("Email configuration saved successfully.");
    });
  }
}

// ALERTS
function setupAlertsModule() {
  const updateScheduleBtn = document.getElementById("updateScheduleBtn");
  const addAlertTemplateBtn = document.getElementById("addAlertTemplateBtn");
  const closeAlertTemplateModal = document.getElementById("closeAlertTemplateModal");
  const cancelAlertTemplateBtn = document.getElementById("cancelAlertTemplateBtn");
  const saveAlertTemplateBtn = document.getElementById("saveAlertTemplateBtn");
  const alertModal = document.getElementById("addAlertTemplateModal");
  const alertTypeInput = document.getElementById("alertTypeInput");

  if (updateScheduleBtn) {
    updateScheduleBtn.addEventListener("click", function () {
      const time = document.getElementById("dailyCheckTime")?.value || "";
      alert("Daily schedule updated to " + time);
    });
  }

  if (addAlertTemplateBtn && alertModal) {
    addAlertTemplateBtn.addEventListener("click", function () {
      resetAlertTemplateForm();
      alertModal.classList.add("show");
    });
  }

  if (closeAlertTemplateModal && alertModal) {
    closeAlertTemplateModal.addEventListener("click", function () {
      alertModal.classList.remove("show");
    });
  }

  if (cancelAlertTemplateBtn && alertModal) {
    cancelAlertTemplateBtn.addEventListener("click", function () {
      alertModal.classList.remove("show");
    });
  }

  if (saveAlertTemplateBtn) {
    saveAlertTemplateBtn.addEventListener("click", function () {
      saveAlertTemplate();
    });
  }

  if (alertTypeInput) {
    alertTypeInput.addEventListener("change", function () {
      updateAlertSubjectByType(this.value);
    });
  }

  renderAlertsTable();
}

function resetAlertTemplateForm() {
  const alertTypeInput = document.getElementById("alertTypeInput");
  const alertDaysInput = document.getElementById("alertDaysInput");
  const alertSubjectInput = document.getElementById("alertSubjectInput");
  const alertBodyEditor = document.getElementById("alertBodyEditor");
  const alertBodyInput = document.getElementById("alertBodyInput");
  const alertBodyTextarea = document.getElementById("alertBodyInput");
  const checkboxes = document.querySelectorAll(".alertRecipientCheckbox");

  if (alertTypeInput) alertTypeInput.value = "Certification Expiry";
  if (alertDaysInput) alertDaysInput.value = "30";
  if (alertSubjectInput) {
    alertSubjectInput.value = "Notification: Certification Expiry Reminder";
  }

  if (alertBodyEditor && alertBodyEditor.getAttribute("contenteditable") === "true") {
    alertBodyEditor.innerHTML = `
      <p>Dear {{personnel_name}},</p>
      <p>This is an automated reminder that your <b>{{item_name}}</b> is due for expiry on <b>{{expiry_date}}</b>.</p>
      <p>Please ensure that you initiate the renewal process soon to avoid any expiration issues.</p>
      <p><b>Details:</b><br>Method: {{method}}<br>Level: {{level}}<br>Certificate No: {{certificate_number}}</p>
      <p>Thank you,<br>{{company_name}} Management</p>
    `;
  }

  if (alertBodyInput && alertBodyEditor && alertBodyEditor.getAttribute("contenteditable") === "true") {
    alertBodyInput.value = alertBodyEditor.innerHTML.trim();
  } else if (alertBodyTextarea && !alertBodyEditor) {
    alertBodyTextarea.value = `Dear {{personnel_name}},

This is an automated reminder that your {{item_name}} is due for expiry on {{expiry_date}}.
Please ensure that you initiate the renewal process soon to avoid any expiration issues.

Details:
Method: {{method}}
Level: {{level}}
Certificate No: {{certificate_number}}

Thank you,
{{company_name}} Management`;
  }

  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
}

function updateAlertSubjectByType(type) {
  const alertSubjectInput = document.getElementById("alertSubjectInput");
  if (!alertSubjectInput) return;

  if (type === "Certification Expiry") {
    alertSubjectInput.value = "Notification: Certification Expiry Reminder";
  } else if (type === "Eye Exam Expiry") {
    alertSubjectInput.value = "Notification: Eye Exam Expiry Reminder";
  } else if (type === "Training Expiry") {
    alertSubjectInput.value = "Notification: Training Expiry Reminder";
  }
}

function saveAlertTemplate() {
  syncEditorContent();

  const type = document.getElementById("alertTypeInput")?.value || "";
  const days = document.getElementById("alertDaysInput")?.value.trim() || "";
  const subject = document.getElementById("alertSubjectInput")?.value.trim() || "";
  const alertBodyField = document.getElementById("alertBodyInput");
  const body = alertBodyField ? alertBodyField.value.trim() : "";
  const recipientCheckboxes = document.querySelectorAll(".alertRecipientCheckbox");
  const modal = document.getElementById("addAlertTemplateModal");

  const recipients = [];
  recipientCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      recipients.push(checkbox.value);
    }
  });

  if (days === "" || subject === "" || body === "") {
    alert("Please fill all required alert template fields.");
    return;
  }

  if (recipients.length === 0) {
    alert("Please select at least one recipient.");
    return;
  }

  alertsData.push({
    type: type,
    milestone: days + " days",
    recipients: recipients.join(", "),
    subject: subject,
    body: body
  });

  renderAlertsTable();

  if (modal) {
    modal.classList.remove("show");
  }
}

function renderAlertsTable() {
  const alertsTableBody = document.getElementById("alertsTableBody");
  if (!alertsTableBody) return;

  if (alertsData.length === 0) {
    alertsTableBody.innerHTML = `
      <div class="alerts-empty-state">
        <i class="fa-regular fa-bell"></i>
        <p>No automated alerts configured yet.</p>
      </div>
    `;
    return;
  }

  let html = "";

  alertsData.forEach((alertItem, index) => {
    html += `
      <div class="alert-row">
        <span>${escapeHtml(alertItem.type)}</span>
        <span>${escapeHtml(alertItem.milestone)}</span>
        <span>${escapeHtml(alertItem.recipients)}</span>
        <span>${escapeHtml(alertItem.subject)}</span>
        <div class="alert-actions">
          <button class="alert-action-btn" onclick="deleteAlertTemplate(${index})">Delete</button>
        </div>
      </div>
    `;
  });

  alertsTableBody.innerHTML = html;
}

function deleteAlertTemplate(index) {
  alertsData.splice(index, 1);
  renderAlertsTable();
}

// RICH TEXT EDITOR
function setupRichTextEditor() {
  const toolbarButtons = document.querySelectorAll(".editor-tool-btn");
  const editor = document.getElementById("alertBodyEditor");

  if (!editor || toolbarButtons.length === 0) return;

  toolbarButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const command = this.getAttribute("data-command");
      const value = this.getAttribute("data-value");

      editor.focus();

      if (command === "createLink") {
        const url = prompt("Enter link URL:");
        if (url) {
          document.execCommand("createLink", false, url);
        }
      } else if (command === "formatBlock") {
        document.execCommand("formatBlock", false, value || "p");
      } else {
        document.execCommand(command, false, null);
      }

      syncEditorContent();
    });
  });

  editor.addEventListener("input", syncEditorContent);
  syncEditorContent();
}

function syncEditorContent() {
  const editor = document.getElementById("alertBodyEditor");
  const hiddenInput = document.getElementById("alertBodyInput");

  if (editor && hiddenInput && editor.getAttribute("contenteditable") === "true") {
    hiddenInput.value = editor.innerHTML.trim();
  }
}

// HELPERS
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function jsEscape(text) {
  return String(text)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");
}
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");

if (profileBtn && profileDropdown) {
  profileBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    profileDropdown.classList.toggle("show");
  });

  document.addEventListener("click", function () {
    profileDropdown.classList.remove("show");
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    window.location.href = "index.html"; // go back to login
  });
}
function setupProfileDropdown() {
  const profileBtn = document.getElementById("profileBtn");
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutBtn = document.getElementById("logoutBtn");

  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });

    profileDropdown.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("click", function () {
      profileDropdown.classList.remove("show");
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      window.location.href = "index.html";
    });
  }
}

// ==========================
// COMPANY MANAGEMENT MODULE
// ==========================

// Initial Data
let companies = [
    {
        id: 1,
        company: "Surya Corp",
        email: "suryateja@company.com",
        address: "new york",
        startDate: "2026-04-05",
        validTill: "2027-11-18",
        status: true
    },
    {
        id: 2,
        company: "sai@corp",
        email: "sai@corp.com",
        address: "london",
        startDate: "2026-04-08",
        validTill: "2026-11-12",
        status: true
    },
    {
        id: 4,
        company: "pavancorp",
        email: "pavan@corp.com",
        address: "germany",
        startDate: "2026-04-08",
        validTill: "2026-04-12",
        status: true
    }
];

let editingId = null;

// Format Date to MM/DD/YYYY
function formatDate(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
    return dateStr;
}

// Render Table
function renderTable() {
    const tableBody = document.querySelector("#comp-table tbody");
    if(!tableBody) return;
    
    tableBody.innerHTML = "";

    const filterCompanyInput = document.getElementById("filter-company");
    const filterEmailInput = document.getElementById("filter-email");
    const filterDateInput = document.getElementById("filter-date");
    const filterStatusInput = document.getElementById("filter-status");

    const fCompany = filterCompanyInput ? filterCompanyInput.value.toLowerCase() : "";
    const fEmail = filterEmailInput ? filterEmailInput.value.toLowerCase() : "";
    const fDate = filterDateInput ? filterDateInput.value : "";
    const fStatus = filterStatusInput ? filterStatusInput.value : "All";

    const filteredCompanies = companies.filter(company => {
        const matchCompany = company.company.toLowerCase().includes(fCompany);
        const matchEmail = company.email.toLowerCase().includes(fEmail);
        const matchDate = fDate ? (company.startDate.includes(fDate) || company.validTill.includes(fDate) || formatDate(company.startDate).includes(fDate) || formatDate(company.validTill).includes(fDate)) : true;

        let matchStatus = true;
        if (fStatus === "Active") matchStatus = company.status === true;
        else if (fStatus === "Inactive") matchStatus = company.status === false;

        return matchCompany && matchEmail && matchDate && matchStatus;
    });

    filteredCompanies.forEach(company => {
        const tr = document.createElement("tr");

        const statusClass = company.status ? "management-status-active" : "management-status-inactive";
        const statusText = company.status ? "Active" : "Inactive";

        tr.innerHTML = `
            <td>
                <div class="td-flex">
                    <div class="table-icon-wrap"><i class='fa-solid fa-building'></i></div>
                    <strong>${company.company}</strong>
                </div>
            </td>
            <td>
                <div class="td-flex">
                    <div class="table-icon-wrap" style="background:transparent"><i class='fa-regular fa-envelope'></i></div>
                    ${company.email}
                </div>
            </td>
            <td>
                <div class="td-flex">
                    <div class="table-icon-wrap" style="background:transparent"><i class='fa-solid fa-location-dot'></i></div>
                    ${company.address || "No address"}
                </div>
            </td>
            <td>${formatDate(company.startDate)}</td>
            <td>${formatDate(company.validTill)}</td>
            <td>
                <span class="management-status-badge ${statusClass}">${statusText}</span>
            </td>
            <td>
                <div class="action-btns">
                    <button class="edit-btn" onclick="editMgmtCompany(${company.id})"><i class='fa-solid fa-pen-to-square'></i></button>
                    <button class="delete-btn" onclick="deleteMgmtCompany(${company.id})"><i class='fa-solid fa-trash'></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateStatusLabel() {
    const compStatusInput = document.getElementById("comp-status");
    const statusLabel = document.getElementById("statusLabel");
    const toggleContainer = document.querySelector(".toggle-container");
    if(!compStatusInput || !statusLabel) return;
    
    if (compStatusInput.checked) {
        statusLabel.textContent = "Active";
        statusLabel.style.color = "#10B981";
        if(toggleContainer){
          toggleContainer.style.backgroundColor = "var(--status-active-bg, #ECFDF5)";
          toggleContainer.style.borderColor = "var(--status-active-border, #A7F3D0)";
        }
    } else {
        statusLabel.textContent = "Inactive";
        statusLabel.style.color = "#DC2626";
        if(toggleContainer){
          toggleContainer.style.backgroundColor = "#FEE2E2";
          toggleContainer.style.borderColor = "#FECACA";
        }
    }
}

// Edit Company
window.editMgmtCompany = function (id) {
    const company = companies.find(c => c.id === id);
    if (company) {
        editingId = company.id;
        document.getElementById("comp-name").value = company.company;
        document.getElementById("comp-email").value = company.email;
        document.getElementById("startDate").value = company.startDate;
        document.getElementById("validTill").value = company.validTill;
        document.getElementById("staff-limit").value = "";
        document.getElementById("comp-status").checked = company.status;
        document.getElementById("officeAddress").value = company.address;

        updateStatusLabel();
        
        document.getElementById("save-btn").innerHTML = "<i class='fa-regular fa-floppy-disk'></i> Register Company";
        document.querySelector("#modalOverlay .modal-header h2").textContent = "Register New Company";
        
        openModal(document.getElementById("modalOverlay"));
    }
}

// Delete Company
window.deleteMgmtCompany = function (id) {
    companies = companies.filter(c => c.id !== id);
    renderTable();
}

document.addEventListener("DOMContentLoaded", function () {
    const modalOverlay = document.getElementById("modalOverlay");
    const addBtn = document.getElementById("add-btn");
    const closeBtn = document.getElementById("close-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const compForm = document.getElementById("comp-form");
    
    const filterCompanyInput = document.getElementById("filter-company");
    const filterEmailInput = document.getElementById("filter-email");
    const filterDateInput = document.getElementById("filter-date");
    const filterStatusInput = document.getElementById("filter-status");

    if(filterCompanyInput) filterCompanyInput.addEventListener("input", renderTable);
    if(filterEmailInput) filterEmailInput.addEventListener("input", renderTable);
    if(filterDateInput) filterDateInput.addEventListener("input", renderTable);
    if(filterStatusInput) filterStatusInput.addEventListener("input", renderTable);
    
    if (addBtn) {
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
    }
    
    const filterBtn = document.getElementById("filter-btn");
    const filterBox = document.getElementById("filter-box");
    if (filterBtn && filterBox) {
        filterBtn.addEventListener("click", () => {
            if (filterBox.style.display === "none") {
                filterBox.style.display = "flex";
                filterBtn.classList.add("active");
            } else {
                filterBox.style.display = "none";
                filterBtn.classList.remove("active");
            }
        });
    }
    
    const compStatusInput = document.getElementById("comp-status");
    if(compStatusInput) compStatusInput.addEventListener("change", updateStatusLabel);
    
    if(compForm) {
        compForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const newCompany = {
                id: editingId || Date.now(),
                company: document.getElementById("comp-name").value,
                email: document.getElementById("comp-email").value,
                startDate: document.getElementById("startDate").value,
                validTill: document.getElementById("validTill").value,
                status: document.getElementById("comp-status").checked,
                address: document.getElementById("officeAddress").value
            };

            if (editingId) {
                const index = companies.findIndex(c => c.id === editingId);
                if (index > -1) {
                    companies[index] = newCompany;
                }
            } else {
                companies.push(newCompany);
            }

            renderTable();
            closeModal(modalOverlay);
        });
    }
    
    // Set active tab logic nicely
    const params = new URLSearchParams(window.location.search);
    if(params.get('tab') === 'companyManagement') {
        const mgmtBtn = document.querySelector('[data-menu="Company Management"]');
        if(mgmtBtn) mgmtBtn.click();
    }
    
    renderTable();
});

let personnel = [
  {
    id: 3,
    fName: "dharani",
    lName: "gedela",
    empId: "15",
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
    if(el) el.textContent = fields[id];
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
if(btnAddTop) btnAddTop.addEventListener("click", () => openPersonnelModal("add"));
if(btnEdit) btnEdit.addEventListener("click", () => openPersonnelModal("edit"));

if(btnPersonnelModalClose) btnPersonnelModalClose.addEventListener("click", closePersonnelModal);
if(btnModalCancel) btnModalCancel.addEventListener("click", closePersonnelModal);

if(btnChoosePhoto) {
  btnChoosePhoto.addEventListener("click", () => {
    profilePhotoInput.click();
  });
}

if(profilePhotoInput) {
  profilePhotoInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files.length > 0) {
      photoFileName.textContent = e.target.files[0].name;
    } else {
      photoFileName.textContent = "No file chosen";
    }
  });
}

if(personnelModalOverlay) {
  personnelModalOverlay.addEventListener("click", (e) => {
    // Do nothing
  });

  personnelModalOverlay.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

if(btnModalSave) {
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

if(personnelFormObj) {
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
    if(targetContent) targetContent.classList.remove("hidden");

    if (tabId === 'personal') {
      if(tabContentTitle) tabContentTitle.textContent = "Personal Information";
    } else {
      if(tabContentTitle) tabContentTitle.textContent = btn.textContent;
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
  if(!modal) return;
  if(show && formId) {
    const formEl = document.getElementById(formId);
    if(formEl) formEl.reset();
  }
  modal.classList[show ? 'remove' : 'add']("hidden");
};

const educationModalObj = document.getElementById("educationModal");
window.openEducationModal = () => toggleModal(educationModalObj, "educationForm", true);
window.closeEducationModal = () => toggleModal(educationModalObj, null, false);

function renderEducation() {
  const p = getActivePerson();
  if(!p) return;
  renderTable(p.education, "eduTableBody", "No education records found.", 5, (edu, idx) => `
    <tr>
      <td>${edu.degree}</td><td>${edu.school}</td><td>${edu.year}</td>
      <td><a href="#" style="color: var(--primary);"><i class="ph ph-file-text"></i> ${edu.doc}</a></td>
      <td style="text-align: right;"><button class="icon-btn-small" onclick="deleteEducation(${idx})"><i class="ph ph-trash" style="color: #ef4444;"></i></button></td>
    </tr>`);
}

window.saveEducation = function() {
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

window.deleteEducation = function(idx) {
  const p = getActivePerson();
  p.education.splice(idx, 1);
  renderEducation();
};

const jobHistoryModalObj = document.getElementById("jobHistoryModal");
const jhCurrentEmp = document.getElementById("jhCurrentEmp");
const jhEndDate = document.getElementById("jhEndDate");

window.openJobHistoryModal = function() {
  toggleModal(jobHistoryModalObj, "jobHistoryForm", true);
  if(jhEndDate) {
    jhEndDate.disabled = false; jhEndDate.style.opacity = "1";
  }
};
window.closeJobHistoryModal = () => toggleModal(jobHistoryModalObj, null, false);

if (jhCurrentEmp) {
  jhCurrentEmp.addEventListener("change", (e) => {
    if(!jhEndDate) return;
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
  if(!p) return;
  renderTable(p.jobHistory, "jhTableBody", "No job history found.", 5, (jh, idx) => `
    <tr>
      <td>${jh.company}</td><td>${jh.position}</td><td>${jh.fromDate} - ${jh.endDate}</td>
      <td><a href="#" style="color: var(--primary);"><i class="ph ph-file-text"></i> ${jh.doc}</a></td>
      <td style="text-align: right;"><button class="icon-btn-small" onclick="deleteJobHistory(${idx})"><i class="ph ph-trash" style="color: #ef4444;"></i></button></td>
    </tr>`);
}

window.saveJobHistory = function() {
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

window.deleteJobHistory = function(idx) {
  const p = getActivePerson();
  p.jobHistory.splice(idx, 1);
  renderJobHistory();
};

const experienceModalObj = document.getElementById("experienceModal");
window.openExperienceModal = () => toggleModal(experienceModalObj, "experienceForm", true);
window.closeExperienceModal = () => toggleModal(experienceModalObj, null, false);

function renderExperience() {
  const p = getActivePerson();
  if(!p) return;
  renderTable(p.experience, "expTableBody", "No experience records found.", 3, (exp, idx) => `
    <tr>
      <td><strong>${exp.method}</strong></td><td>${exp.hours} hrs</td>
      <td style="text-align: right;"><button class="icon-btn-small" onclick="deleteExperience(${idx})"><i class="ph ph-trash" style="color: #ef4444;"></i></button></td>
    </tr>`);
}

window.saveExperience = function() {
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

window.deleteExperience = function(idx) {
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

window.saveTraining = function() {
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
