import styled, {css} from 'styled-components';

//Shared styled elements
const buttonStyle = css`
    background-color: black;
    color: white;
    border: none;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
    }
`;

const invertedButtonStyle = css`
    background-color: white;
    color: black;
    border: 1px solid black;

    &:hover {
        background-color: black;
        color: white;
        border: none;
    }
`;

const googleSignInStyle = css`
    background-color: #4285f4;
    color: white;
    border: none;

    &:hover {
        background-color: #357ae8;
        border: none;
    }
`;


//Get shared button styles
const getButtonStyles = props => {
    if(props.isGoogleSignIn) {
        return googleSignInStyle;
    }

    return props.inverted ? invertedButtonStyle : buttonStyle;
};

//Styled components
export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 13px;    
    color: white;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    font-weight: bolder;    
    cursor: pointer;
    display: flex;
    justify-content: center;    

    ${getButtonStyles}
`; 