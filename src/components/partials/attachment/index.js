import React, { useRef, useMemo } from 'react';
import AttachFileIcon from "@material-ui/icons/AttachFile";

export const AttachFile = ({ onChange, className = "blue-color" }) => {
    const id = useMemo(() => ("attach" + Math.random()).replace("0.", ""), []);
    const inputRef = useRef(null);

    const handleFileSelect = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = (e) => {
            onChange(e.target.result);
        }
        reader.readAsArrayBuffer(file);
    };

    return (
        <>
            <input
                type="file"
                id={id}
                onChange={handleFileSelect}
                ref={inputRef}
                style={{ display: 'none' }}
                accept="image/*"
            />
            <AttachFileIcon
                style={{ cursor: 'pointer' }}
                className={className}
                onClick={() => inputRef.current?.click()}
            />
        </>
    )
}