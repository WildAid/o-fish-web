import React from "react";
import FakeCheckBox from '../fake-check/fake-check.component';

export default function FilterLine({partConfig, parts, onCheck, check = false}) {
    const checked = parts.indexOf(partConfig.name) >= 0 || check;
    return (
      <FakeCheckBox
        className='filter-line'
        name={partConfig.name}
        title={partConfig.title}
        checked={checked}
        onCheck={()=>{
          onCheck(partConfig);
        }}>
      </FakeCheckBox>
    )
}
