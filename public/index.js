document.addEventListener("DOMContentLoaded", function() {
  const registrationForm = document.getElementById("registration-form");
  const username = document.getElementById('name');

  const phoneInput = document.getElementById('phone');
  const phoneError = document.getElementById('phone-error');
  
  const email = document.getElementById('email');
  const invalidEmail = document.getElementById('email-error');
  
  const pass = document.getElementById('password');
  const invalidPassword = document.getElementById('pass-eror');
  const passStrength = document.getElementById('pass-strength');

  const confirmPass = document.getElementById('confirm-password');
  
  registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();

    validUsername(username);
    phoneValidation(event);
    emailValidation(email);
    verifyPassword(event);
  })
  
  function validUsername(username) {
    if(username.value !== "") {
      username.classList.add("ring-green-400");
      username.classList.remove("ring-red-600");
    } else {
      username.classList.add("ring-red-600");
      username.classList.remove("ring-green-400");
    }
  }

  function phoneValidation(event) {
    let isValid = true;
    const phoneValue = phoneInput.value.trim();
    if (!/^\d{8,12}$/.test(phoneValue)) {
      phoneError.classList.remove('hidden');
      isValid = false;
    } else {
      phoneError.classList.add("hidden");
    }

    if (!isValid) {
      event.preventDefault();
    }
  }
  
  function emailValidation(email) {
    let validRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if(email.value.match(validRegex)) {
      email.classList.add("ring-blue-400")
      email.classList.remove("ring-red-600")
      invalidEmail.classList.add("hidden");
      return true;
    } else {
      email.classList.add("ring-red-600");
      invalidEmail.classList.remove("hidden");
      invalidEmail.classList.add("block");
      return false;
    }
  }
  
  function verifyPassword(event) {
    if(pass.value == ""){
      invalidPassword.classList.remove("hidden");
      event.preventDefault();
    } else if (pass.value.length < 8) {
      invalidPassword.classList.remove("hidden");
      invalidPassword.innerText = "Password must be at least 8 character";
      event.preventDefault();
    } else {
      invalidPassword.classList.add("hidden")
    }

    if (pass.value !== confirmPass.value) {
      invalidPassword.classList.remove("hidden");
      event.preventDefault();
    } else {
      invalidPassword.classList.add("hidden")
    }
  }

  function passwordStrength() {
    passStrength.classList.add("hidden");
    const strength = {
      1: "very weak",
      2: "normal",
      3: "medium",
      4: "strong",
    }

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
    if (regex.test(pass.value)) {
      passStrength.innerText = "Password " + strength[4];
      passStrength.classList.remove("hidden");
      return console.log(pass + " Password is strong");
    }

    let count = 0;
    let regex1 = /[a-z]/;
    if (regex1.test(pass.value)){
      count++;
    }
    let regex2 = /[A-Z]/;
    if (regex2.test(pass.value)) {
      count++;
    }
    let regex3 = /[\d]/;
    if (regex3.test(pass.value)) {
      count++;
    }
    let regex4 = /[!@#$%^&*.?]/;
    if (regex4.test(pass.value)) {
      count++;
    }
    if (count > 0) {
      passStrength.innerText = "Password " + strength[count];
      passStrength.classList.remove("hidden");
    }
  }
  
  email.addEventListener('keyup', function() {
    emailValidation(email);
  })
  
  username.addEventListener('keyup', function() {
    validUsername(username);
  })

  pass.addEventListener('keyup', function() {
    passwordStrength()
  })
});
