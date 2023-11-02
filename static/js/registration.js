const Patterns = {
  firstName: /^[a-zA-ZÀ-ÿ]{1,12}$/,
  lastName: /^[a-zA-ZÀ-ÿ]{1,12}$/,
  username: /^[a-z0-9\_\-]{4,16}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{1,255}$/,
  password: /^[a-z0-9\_\-]{4,16}$/,
};

const Status = {
  firstName: 0,
  lastName: 0,
  username: 0,
  email: 0,
  password: 0
};

const validateInput = (event) => {
  switch (event.target.name) {
    case "firstName":
      validateField(Patterns.firstName, event.target, "firstName");
      break;
    case "lastName":
      validateField(Patterns.lastName, event.target, "lastName");
      break;
    case "username":
      validateField(Patterns.username, event.target, "username");
      break;
    case "email":
      validateField(Patterns.email, event.target, "email");
      break;
    case "password":
      validateField(Patterns.password, event.target, "password");
      break;
  };
  validateSubmit();
};

const validateField = (pattern, input, field) => {
  if (pattern.test(input.value)) {
    document.getElementById(`${field}Container`).classList.remove("incorrect");
    document.querySelector(`#${field}Container .inputMessage`).classList.remove("showMessage");
    document.getElementById(`${field}Container`).classList.add("correct");
    Status[field] = 1;
  } else {
    document.getElementById(`${field}Container`).classList.remove("correct");
    document.getElementById(`${field}Container`).classList.add("incorrect");
    document.querySelector(`#${field}Container .inputMessage`).classList.add("showMessage");
    Status[field] = 0;
  };
};

const validateSubmit = () => {
  let validateStatus = 0, statusCounter = 0;
  for (let field in Status) {
    validateStatus += Status[field];
    statusCounter++;
  };

  if (validateStatus === statusCounter && document.getElementById("check").checked) {
    document.querySelector("#submit").disabled = false;
  } else {
    document.querySelector("#submit").disabled = true;
  };
};

document.querySelectorAll("form input").forEach((input) => {
  input.addEventListener("keyup", validateInput);
  input.addEventListener("blur", validateInput);
  input.addEventListener("click", validateSubmit);
});

document.querySelector("form").addEventListener("submit", () => {
  document.querySelectorAll(".correct").forEach((event) => {
    event.classList.remove("correct");
  });

  for (let field in Status) { Status[field] = 0; };
  validateSubmit();
});
