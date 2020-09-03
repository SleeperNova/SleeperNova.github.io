// Assignment Code
var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

function generatePassword() {
  var confirmLength = prompt(
    "How many characters would you like your password to be?",
    "Choose a number between 8 and 128"
  );
  confirmLength = parseInt(confirmLength);
  // confrim lenth is more than 8 OR less than 128
  if (confirmLength < 8 || confirmLength > 128) {
    alert("Please choose a number between 8 and 128.");
    return generatePassword();
  }

  var Upper = confirm("Would you like to include upper case letters?");
  var Lower = confirm("Would you like to include lower case letters?");
  var Number = confirm("Would you like to include numbers?");
  var Symbol = confirm("Would you like to include symbols?");

  // checking values to make sure at least one value was selected
  if (!(Upper || Lower || Number || Symbol)) {
    alert("Please select a minimum of one option");
    return generatePassword();
  }
  // defining passwords as a blank value that can be filled
  var password = "";
  // concat
  while (password.length < confirmLength) {
    if (Upper) {
      // concat together (non-array concat)
      password += getRandomUpper();
      // once it reaches the number entered it breaks the cycle
      if (password.length === confirmLength) break;
    }
    if (Lower) {
      password += getRandomLower();
      if (password.length === confirmLength) break;
    }
    if (Number) {
      password += getRandomNumber();
      if (password.length === confirmLength) break;
    }
    if (Symbol) {
      password += getRandomSymbol();
      if (password.length === confirmLength) break;
    }
  }

  // turns string into an array to shuffle (ensuring one of each but mixing them up)
  password = password.split("");
  // for loop i = length not 0 to avoid issues
  for (var i = password.length; i < password.length; i++) {
    var randIndex = Math.floor(Math.random() * password.length);
    var temp1 = password[i];
    var temp2 = password[randIndex];
    // shuffle
    password[i] = temp2;
    password[randIndex] = temp1;
  }
  // turns the array back into a string
  return password.join("");
}

// Random Generation
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*()";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

//copy to clipboard w/ optional line to clear
function copyPassword() {
  var copyText = document.getElementById("password");
  copyText.select();
  document.execCommand("Copy");
  alert("Copied to Clipboard");
  //document.getElementById("password").value = "";
}