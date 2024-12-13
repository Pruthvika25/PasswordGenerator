import React, { useCallback, useEffect, useRef, useState } from 'react';
import "./App.css";

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);  // Corrected state declaration
  let [charAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  let passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";  // Numbers logic
    if (charAllowed) str += "!@#$%^&*_(){}[]~";  // Special characters logic

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  let copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.focus();
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    }).catch((err) => {
        alert('Failed to copy text: ' + err);
    });
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className='main'>
      <div><h1>Password Generator!</h1></div>
      <div className='sub'>
        <input
          type="text"
          value={password}
          ref={passwordRef}
          placeholder='Password'
          readOnly
        />
        <button onClick={copyPasswordToClipBoard}>Copy</button>
      </div>

      <div className='main2'>
        <div className='sub2'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => { setLength(e.target.value); }}
          />
          <label htmlFor="">Length: {length}</label>
          <input
            type="checkbox"
            checked={numberAllowed}  // Reflect state for Numbers checkbox
            id='numberInput'
            onChange={() => { setNumberAllowed((prev) => !prev); }}  // Toggle state on change
          />
          <label htmlFor="">Numbers</label>
          <input
            type="checkbox"
            checked={charAllowed}
            id='charInput'
            onChange={() => { setCharAllowed((prev) => !prev); }}
          />
          <label htmlFor="">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
