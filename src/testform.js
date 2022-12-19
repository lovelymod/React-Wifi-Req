import React, { useRef } from "react";

const RegisterForm = () => {
  const inputRef = useRef(null);
  const test = () => {
    console.log(inputRef.current.value);
  };
  return (
    <div className="">
      <input ref={inputRef} type="text" />

      <button onClick={test}>go !!</button>
    </div>
  );
};
export default RegisterForm;
