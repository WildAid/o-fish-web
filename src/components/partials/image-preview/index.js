import React from 'react';
import { Clear } from '@material-ui/icons';


export const ImagePreview = ({ src, onRemove }) => (
    <div style={{
        width: 150,
        height: 200,
        position: 'relative'
    }}>
        <Clear
            color="secondary"
            style={{ cursor: 'pointer', right: 5, bottom: 5, position: 'absolute' }}
            onClick={onRemove}
        />
        <img src={src} style={{ width: '100%', height: '100%' }} alt="" />
    </div>
)