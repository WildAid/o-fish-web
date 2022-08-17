import React, { useRef, useMemo } from 'react';
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { v4 as uuidv} from 'uuid';

export const AttachFile = ({ onChange, className = "blue-color" }) => {
    const id = useMemo(() => "attach" + uuidv(), []);
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