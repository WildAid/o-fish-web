import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    radioButton: {
        border: '1px solid rgba(10, 64, 116, 1)',
        borderRadius: 18,
        outline: 'transparent',
        minWidth: 138,
        backgroundColor: props => props.active ? '#0A4074' : '#FFFFFF',
        color: props => props.active ? '#FFFFFF' : '#0A4074',
        fontFamily: 'SF Pro Text',
        fontSize: 12,
        height: '100%',
        maxHeight: 40,
        marginRight: 16,
        cursor: 'pointer',
        transition: 'all .3s ease',
    }
});

const RadioButtonStyled = ({ option, onClick }) => {
    const { radioButton } = useStyles({ active: option.active });

    return (
        <button className={radioButton} onClick={() => onClick(option.value)}>
            {option.label}
        </button>
    )
}


export const RadioButton = ({ options, onChange, defaultValue }) => {
    const [active, setActive] = React.useState(defaultValue);

    const onClick = (value) => {
        setActive(value);
        onChange(value);
    }

    return (
        <div className='flex-row align-center' style={{ height: '100%' }}>
            {options.map((option) => (
                <RadioButtonStyled
                    option={{ ...option, active: option.value === active }}
                    onClick={onClick}
                />
            ))}
        </div>
    )
}