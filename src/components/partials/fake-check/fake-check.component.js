import React from "react";
import "./fake-check.css";
import Icon from '@material-ui/core/Icon';

export default function FakeCheck({name, title, checked, onCheck, className}) {
    className = className + " fake-check" + (checked ? " checked" : "");
    return (
      <div className={className} onClick={()=>{onCheck(name, title)}}>
        <div className={"fake-check-box" + (checked ? " checked" : "")}>
          {checked && <Icon>check</Icon>}
        </div>
        <label>{title}</label>
      </div>
    )
}
