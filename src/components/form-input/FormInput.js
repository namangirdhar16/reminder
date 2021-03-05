import React from 'react';

const FormInput = ({name , value , handleChange }) => {
    return (
        <div className = "form-input">
            <input type = "text" name = {name} value = {value} onChange = {handleChange} />
            <input type = "password" name = {name} value = {value} onChange = {handleChange} />
        </div>
    )
}