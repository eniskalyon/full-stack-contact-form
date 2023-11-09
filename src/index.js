import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import sendToDb from './utilities/sendToDb';
import Form from './components/Form';
import './styles/main.scss';

function App() {
   
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    
    const [result, setResult] = useState(null); 
    const [remainingChars, setRemainingChars] = useState(280);
    const [isFocused, setIsFocused] = useState(false);

  

    const onInputChange = (event) => {
        const { name, value, tagName } = event.target;
        const textarea = event.target;

        if (tagName.toLowerCase() === 'textarea') {
            const minHeight = parseFloat(window.getComputedStyle(textarea).minHeight);

            textarea.style.height = 'auto';
            const newHeight = Math.max(textarea.scrollHeight, minHeight);
            textarea.style.height = newHeight + 'px';
    
          }

       
  
  setState({
            ...state,
            [name]: value,
        });

        if (name === 'message') {
            setRemainingChars(280 - value.length);
        }
    };
   

    return (
       <Form
       onInputChange={onInputChange}
       state={state} 
       setState={setState}
       isFocused={isFocused}
       setIsFocused={setIsFocused}
       remainingChars={remainingChars}
       setRemainingChars={setRemainingChars}
       result={result} 
       setResult={setResult} 
       onSubmit={(e) => sendToDb(e,  state, setState, result, setResult, onInputChange, isFocused, setIsFocused)} 
       />
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
