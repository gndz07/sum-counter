import React, { useState } from "react";
import "./App.css";
import { FaTimes, FaChevronUp, FaChevronDown } from "react-icons/fa";
import useClickOutsideRef from "./libs/useClickOutsideRef";

function App() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedNumbers, selectNumber] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useClickOutsideRef(() => {if (isDropdownOpen) setDropdownOpen(false)})
  const sumReducer = (prev, curr) => prev + curr;

  const handleClick = (num) => {
    selectNumber((numbers) => [...numbers, Number(num)]);
    setDropdownOpen(false);
  };

  const handleDeleteNumber = (number) => {
    selectNumber(selectedNumbers.filter((numbers) => numbers !== number));
  };

  return (
    <div className="container">
      <h1>Select digits to create a sum</h1>

      <div>
        <p className="dropdown-title">Digits</p>
        <div className="dropdown-container" ref={dropdownRef}>
          <button
            className="dropdown-btn"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            Select Digits
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          <div
            className={
              isDropdownOpen ? "options-container" : "options-container-hidden"
            }
          >
            {numbers.map((number, index) => {
              return (
                <button
                  className="options"
                  key={index}
                  onClick={() => handleClick(number)}
                  disabled={selectedNumbers.includes(number)}
                  style={index == numbers.length - 1 ? {borderBottom: "none"} : {}}
                >
                  {number}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <h2>Sum</h2>
        <p className="sum-text">
          {selectedNumbers.length > 0 ? selectedNumbers.reduce(sumReducer) : 0}
        </p>
      </div>

      <div>
        <h2>Selected Digits:</h2>
        <div className="numbers-container">
          {selectedNumbers.length ? (
            selectedNumbers.map((number, index) => {
              return (
                <div key={index} className="selected-num">
                  <p>{number}</p>
                  <FaTimes
                    style={{
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      marginTop: 3,
                    }}
                    onClick={() => handleDeleteNumber(number)}
                  />
                </div>
              );
            })
          ) : (
            <p className="desc-container">You have not selected any digits</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
