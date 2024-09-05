import React from 'react';

function SignupErrorCard(props) {
    
    const { type, fieldName } = props
    console.log(type, fieldName)
    let errorMassage;
    if(type === 'required') { return errorMassage = `${fieldName} is required`}
    else if(type === 'maxLength' && (fieldName === "name" || fieldName === "password" )) { return errorMassage = `${fieldName} must be within 15 letter`}
    else if(type === 'pattern' && fieldName === "email") { return errorMassage = `${fieldName} doesn't meet the standerds`}
    else if(type === 'pattern' && fieldName === "password") { return errorMassage = `${fieldName} include at least 5 letter and 1 number`}
    
    return (
        <div>
            <span>{errorMassage} is required</span>
        </div>
    );
}

export default SignupErrorCard;