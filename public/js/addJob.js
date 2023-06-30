function showNewContactFields(value) {
    const newContactFields = document.getElementById("newContactFields");
    if (value === "newContact") {
        newContactFields.style.display = "block";
    } else {
        newContactFields.style.display = "none";
    }
}

function showNewCompanyFields(value) {
    const newCompanyFields = document.getElementById("newCompanyFields");
    if (value === "newCompany") {
      newCompanyFields.style.display = "block";
    } else {
      newCompanyFields.style.display = "none";
    }
  }