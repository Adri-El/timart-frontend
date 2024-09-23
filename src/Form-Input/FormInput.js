import "./FormInput.css";
import React, { useState, useRef } from "react";

const FormInp = (props) => {
  return (
    <div className="form__input form__inp">
      <div className="firstname">
        <label>{props.labelname1}</label>
        <input name={props.name1} type={props.type1} ref={props.inp1Ref} />
      </div>

      <div className="lastname">
        <label>{props.labelname2}</label>
        <input name={props.name2} type={props.type2} ref={props.inp2Ref} />
      </div>
    </div>
  );
};

const FormInput = (props) => {
  const [showPassText, setShowPassText] = useState("Show");
  const [showPass, setShowPass] = useState(true);
  const inputEl = useRef();

  const showPassHandler = () => {
    setShowPass(!showPass);

    if (showPass) {
      setShowPassText("Hide");
      inputEl.current.type = "text";
      inputEl.current.focus();
    } else {
      setShowPassText("Show");
      inputEl.current.type = "password";
      inputEl.current.focus();
    }
  };

  return (
    <div className="form__input">
      <label>{props.label}</label>

      <input
        name={props.name}
        type={props.type}
        ref={inputEl}
        placeholder={props.placeHolder}
      />
      {props.type === "password" ? (
        <span className="show-pass" onClick={showPassHandler}>
          {" "}
          {showPassText}
        </span>
      ) : null}
    </div>
  );
};

const InputForm = (props) => {
  return (
    <div className="form__input">
      <label>{props.label}</label>

      <input
        name={props.name}
        type={props.type}
        ref={props.inpRef}
        placeholder={props.placeHolder}
      />
    </div>
  );
};

const PhoneInput = (props) => {
  return (
    <div className="phone-input">
      <label>{props.label}</label>

      <div className="phoneInput-box">
        {props.children}
        <input
          name={props.name}
          type={props.type}
          placeholder={props.placeHolder}
          ref={props.refData}
        />
      </div>
    </div>
  );
};

const FormButton = (props) => {
  return (
    <div className="form__input">
      <button onClick={props.btnAction} disabled={props.disabledValue}>
        {props.btnValue}
      </button>
    </div>
  );
};

const SelectInput = (props) => {
  return (
    <div className="form__input">
      <label>Product Category</label>
      <select name="cat" className="inputselect" ref={props.catRef}>
        <option value="">Category</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Electronics">Electronics</option>
        <option value="Health & Beauty">Health & Beauty</option>
        <option value="Electricals">Electricals</option>
        <option value="Fashion">Fashion</option>
        <option value="Groceries">Groceries</option>
        <option value="Babies/kids">Babies/kids</option>
        <option value="Household supplies">Household supplies</option>
        <option value="Condiment">Condiment</option>
        <option value="Home/furniture appliances">
          Home/furniture appliances
        </option>
        <option value="Construction, Tools/ repair equipment">
          Construction, Tools/ repair equipment
        </option>
      </select>
    </div>
  );
};

const TextArea = (props) => {
  return (
    <div className="tex-area-box">
      <label>Delivery Address</label>
      <textarea cols={30} ref={props.textRef}></textarea>
    </div>
  );
};

export {
  FormInp,
  FormInput,
  InputForm,
  FormButton,
  SelectInput,
  PhoneInput,
  TextArea,
};
