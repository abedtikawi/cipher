let ceaser = (text1, shift) => {
  // String.from char code transfers the charcodeAt() to an actual letter from the ascii code

  return String.fromCharCode(
    //spread operater ... used to spread the word text 1
    ...text1
      //split the charachters found in text 1 to an array each char is an element in the array
      .split('')
      //map each character found in text1
      //char . charCodeAt() - 97 (letters of the lower case ) + shift key  % 26 ( 26 characters ) + 97 to re achieve the letter
      //we subtracted before but shifted this time
      .map((char) => ((char.charCodeAt() - 97 + shift) % 26) + 97)
  );
};

function calculate() {
  let key = document.getElementById('key').value;
  //Remove the spaces using all matching chars using regex
  let text = document.getElementById('textinput').value.replace(/[^a-z]/g, '');
  if (text === '' || key === '') {
    return alert('Enter the text and key  to encrypt/decrypt');
  }

  // create element Li = list item
  let node = document.createElement('LI');
  // create text node and insert the value with (call the above function ceaser with the shift key)
  let textnode = document.createTextNode(ceaser(text, parseInt(key)));
  //append the list with the value
  node.appendChild(textnode);
  //insert the list into the encryptList
  document.getElementById('encryptList').appendChild(node);
}
function bruteForce() {
  //Remove space from text
  let text = document.getElementById('textinput2').value.replace(/[^a-z]/g, '');
  if (text === '') {
    //send alert message
    return alert('Enter the text to decrypt');
  }

  for (let i = 1; i <= 25; i++) {
    //create a LI = list item
    let node = document.createElement('LI');
    // create text node and insert the value with (call the above function ceaser with the shift key)
    let textnode = document.createTextNode(ceaser(text, -i));
    //append the list with the value
    node.appendChild(textnode);
    //insert the list into the encryptList
    document.getElementById('bruteForceList').appendChild(node);
  }
}
function encryptRailFence() {
  //Remove space from text
  plaintext = document
    .getElementById('p')
    .value.toLowerCase()
    .replace(/[^a-z]/g, '');
  //send alert message
  if (plaintext.length < 1) {
    alert('please enter some plaintext');
    return;
  }
  let key = parseInt(document.getElementById('depth').value);
  // make sure that that the size of the key entered is less than the key
  if (key > Math.floor(2 * (plaintext.length - 1))) {
    alert('key is too large for the plaintext length.');
    return;
  } //check for empty depth
  if (key < 0 || key === 0) {
    alert('please enter a positive depth value');
    return;
  }

  ciphertext = '';
  //start at line  or depth = 0
  for (line = 0; line < key - 1; line++) {
    //making sure that we skip two places ,zig zag ,
    skip = 2 * (key - line - 1);
    j = 0;

    for (i = line; i < plaintext.length; ) {
      //init an end point with j =0 where we will append the charAt  to the cipher text we created aboce
      ciphertext += plaintext.charAt(i);
      //here we are making sure to skip in a zig zag pattern
      if (line == 0 || j % 2 == 0) i += skip;
      //else increment the i with the same Skip method we defined above
      else i += 2 * (key - 1) - skip;
      //increment j till we reach the plaintext fully with ciphertext.length == j
      j++;
    }
  }
  for (i = line; i < plaintext.length; i += 2 * (key - 1))
    //appending the ciphertext with the values of plain text
    ciphertext += plaintext.charAt(i);
  //inserting the ciphertext into block C of input text found on the html
  document.getElementById('c').value = ciphertext;
}

function decryptRailFence(f) {
  ciphertext = document
    .getElementById('c')
    .value.toLowerCase()
    .replace(/[^a-z]/g, '');
  if (ciphertext.length < 1) {
    alert('please enter some ciphertext (letters only)');
    return;
  }
  let key = parseInt(document.getElementById('depth').value);
  if (key < 0 || key === 0) {
    alert('please enter a positive depth value');
    return;
  }
  if (key > Math.floor(2 * (ciphertext.length - 1))) {
    alert('please enter 1 - 22.');
    return;
  }
  //create an array called pt with the length of the cipher text inserted
  pt = new Array(ciphertext.length);
  //start at line  or depth = 0
  k = 0;

  for (line = 0; line < key - 1; line++) {
    //making sure that we skip two places ,zig zag ,
    skip = 2 * (key - line - 1);
    j = 0;
    for (i = line; i < ciphertext.length; ) {
      // init an end point with j =0 where we will append the charAt  to the cipher text we created above
      // insert into pt the charAt of cipher text with incremented values
      pt[i] = ciphertext.charAt(k++);
      // here we are making sure to skip in a zig zag pattern of 2 spaces
      if (line == 0 || j % 2 == 0) i += skip;
      //else increment the i with the same Skip method we defined above
      else i += 2 * (key - 1) - skip;
      //increment j till we reach the plaintext fully with ciphertext.length == j
      j++;
    }
  }

  for (i = line; i < ciphertext.length; i += 2 * (key - 1))
    //appending the pt[i] with the values of plain text
    pt[i] = ciphertext.charAt(k++);
  //inserting the ciphertext into block C of input text found on the html
  document.getElementById('p').value = pt.join('');
  //we used pt.join here because we have elements of an array
}
