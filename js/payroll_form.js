class EmployeePayrollData {
  get id() {
    return this._id;
  }
  set id(id) {
    this._id = this.id;
  }

  get name() {
    return this._name;
  }
  set name(name) {
    let nameRegex = RegExp("^[A-Z]{1}[a-zA-Z\\s]{2,}$");
    if (nameRegex.test(name)) this._name = name;
    else throw "Incorrect Name!";
  }

  get profile() {
    return this._profile;
  }
  set profile(profile) {
    this._profile = profile;
  }

  get gender() {
    return this._gender;
  }
  set gender(gender) {
    this._gender = gender;
  }

  get department() {
    return this._department;
  }
  set department(department) {
    this._department = department;
  }

  get salary() {
    return this._salary;
  }
  set salary(salary) {
    this._salary = salary;
  }

  get startDate() {
    return this._startDate;
  }
  set startDate(startDate) {
    this._startDate = startDate;
  }

  get note() {
    returnthis._note;
  }
  set note(note) {
    this._note = note;
  }

  toString() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const empDate = !this.startDate
      ? "undefined"
      : this.startDate.toLocaleDateString("en-US", options);

    return (
      "id=" + this.id +
      ", name='" + this.name +
      "', gender ='" + this.gender +
      "', profile=" + this.profile +
      ", department='" + this.department +
      "', salary=" + this.salary +
      ", startDate=" + empDate +
      ", note='" + this.note + "'"
    );
  }
}

window.addEventListener("DOMContentLoaded", () => {
  //name verification
  const name = document.querySelector("#name");
  const nameError = document.querySelector(".name-error");
  const validName = document.querySelector(".valid-name");
  name.addEventListener("input", function () {
    if (name.value.length == 0) {
      nameError.textContent = "";
      validName.textContent = "";
    } else {
      try {
        new EmployeePayrollData().name = name.value;
        nameError.textContent = "";
        validName.textContent = "\u2714";
        document.querySelector(".submitButton").disabled = false;
      } catch (e) {
        nameError.textContent = e;
        validName.textContent = "";
        document.querySelector(".submitButton").disabled = true;
      }
    }
  });

  // salary range
  const salary = document.querySelector("#salary");
  const output = document.querySelector(".salary-output");
  salary.oninput = function () {
    output.textContent = salary.value;
  };

  //date verification
//   const startDate = document.querySelector("#startDate");
//   const startDateError = document.querySelector(".startDate-error");
//   const validStartDate = document.querySelector(".valid-startDate");
//   startDate.addEventListener("input", function () {
//     try {
//       let dateString =
//         document.querySelector("#month").value + " " +
//         document.querySelector("#day").value + ", " +
//         document.querySelector("#year").value;
//       new EmployeePayrollData().startDate = new Date(dateString);
//       startDateError.textContent = "";
//       document.querySelector(".submitButton").disabled = false;
//     } catch (error) {
//       startDateError.textContent = error;
//       validStartDate.textContent = "";
//       document.querySelector(".submitButton").disabled = true;
//     }
//   });
});

const save = () => {
  try {
    let employeePayrollData = createEmployeePayroll();
    updateLocalStorage(employeePayrollData);
  } catch (submitError) {
    alert(submitError);
    return;
  }
};

// Creating employee payroll object
const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();

  employeePayrollData.id = 123;
  employeePayrollData.name = getValue("#name");
  employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
  employeePayrollData.profile = getSelectedValues("[name=profile]").pop();
  employeePayrollData.salary = getValue("#salary");
  dateString =
    document.querySelector("#month").value +
    " " +
    document.querySelector("#day").value +
    ", " +
    document.querySelector("#year").value;
  // employeePayrollData.startDate = new Date(dateString);
  employeePayrollData.startDate = JSON.stringify(dateString);
  employeePayrollData.note = getValue("#notes");
  try {
    employeePayrollData.department = getSelectedValues("[name=department]");
  } catch (error) {
    alert(error);
    return;
  }
//   alert("Employee Added Successfully!\n" + employeePayrollData.toString());
  alert("Employee Added Successfully!\n");
  return employeePayrollData;
};

// getting single value
const getSelectedValues = (propertyName) => {
  let allValues = document.querySelectorAll(propertyName);
  let selectedValues = [];
  allValues.forEach((input) => {
    if (input.checked) selectedValues.push(input.value);
  });
  return selectedValues;
};

// getting multiple values(i.e. Department)
const getValue = (propertyId) => {
  let value = document.querySelector(propertyId).value;
  return value;
};
//Storing in local storage
function updateLocalStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert("Local Storage Updated Successfully!\nTotal Employees : " + employeePayrollList.length);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

// resetting the payroll form(After click on the RESET Button the default value will be set in all the elements)
const resetForm = () => {
    setDefaultValue("#name", "");
    setDefautlText(".name-error");
    setDefautlText(".valid-name");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    resetRange("#salary", ".salary-output");
    setDefaultValue("#day", "1");
    setDefaultValue("#month", "January");
    setDefaultValue("#year", "2020");
    setDefautlText(".startDate-error");
    setDefautlText(".valid-startDate");
    setDefaultValue("#notes", "");
};

const setDefaultValue = (propertyId, value) => {
    const element = document.querySelector(propertyId);
    element.value = value;
};

const unsetSelectedValues = (propertyName) => {
    allValues = document.querySelectorAll(propertyName);
    allValues.forEach(input => input.checked == false);
};

const resetRange = (propertyId, outputId) => {
    const rangeElement = document.querySelector(propertyId);
    rangeElement.value = 400000;
    const outputElement = document.querySelector(outputId);
    outputElement.textContent = rangeElement.value;
};

const setDefautlText = (propertyId) => {
    const contentElement = document.querySelector(propertyId);
    contentElement.textContent = "";
};

