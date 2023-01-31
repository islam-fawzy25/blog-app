import React from 'react';
import "./DropDown.scss"
export default function Dropdown(props) {
  const {  children, visible, onClick,img } = props;
  return (
    <div className="dropdown-container">
      <div className="dropdown-button-container">
        <button
          type="button"
          className={`dropdown-button`}
          onClick={onClick}
        >
          {/* &#10247; */}
          {img}
        </button>
      </div>
      {visible && (
        <div className={`options-container`}>{children}</div>
      )}
    </div>
  );
}