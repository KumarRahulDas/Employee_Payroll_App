let employeePayrollList;
window.addEventListener("DOMContentLoaded", () => {
  employeePayrollList = getEmployeePayrollDataFromStorage();
  document.querySelector(".emp-count").textContent = employeePayrollList.length;
  createInnerHtml();
  localStorage.removeItem("EmployeeToEdit");
});

const getEmployeePayrollDataFromStorage = () => {
  return localStorage.getItem("EmployeePayrollList")
    ? JSON.parse(localStorage.getItem("EmployeePayrollList"))
    : [];
};

const createInnerHtml = () => {
  const headerHtml =
    "<th>ID</th>" +
    "<th>ProfilePic</th>" +
    "<th>Name</th>" +
    "<th>Gender</th>" +
    "<th>Department</th>" +
    "<th>Salary</th>" +
    "<th>Start Date</th>" +
    "<th>Actions</th>";

  let innerHtml = `${headerHtml}`;
  if (employeePayrollList.length == 0) {
    return;
  }
  for (let employeePayrollData of employeePayrollList) {
    innerHtml = `${innerHtml}
        <tr>
            <td>${employeePayrollData._id}</td>
            <td><img class="profile" alt="" src="${employeePayrollData._profile}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDepartmentHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${employeePayrollData._startDate}</td>
            <td>
                <img id="${employeePayrollData._id}" onclick="remove(this)"
                    alt="delete" src="..//assets/icons/delete-black-18dp.svg">
                <img id="${employeePayrollData._id}" onclick="update(this)"
                    alt="edit" src="..//assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
  }
  document.querySelector("#display").innerHTML = innerHtml;
};

const getDepartmentHtml = (departmentList) => {
  let departmentHtml = "";
  for (let department of departmentList) {
    departmentHtml = `${departmentHtml} <div class="dept-label">${department}</div>`;
  }
  return departmentHtml;
};

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(employeeData => employeeData._id == node.id);
    if (!employeePayrollData) return;
    const index = employeePayrollList.map(employeeData => employeeData._id).indexOf(employeePayrollData._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
};

const update = (node) => {
    let employeePayrollData = employeePayrollList.find(employeeData => employeeData._id == node.id);
    if (!employeePayrollData) return;
    localStorage.setItem("EmployeeToEdit", JSON.stringify(employeePayrollData));
    window.location.replace(site_properties.add_employee_payroll_page);
};