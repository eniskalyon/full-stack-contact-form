import React from 'react';
import sendToDb from '../utilities/sendToDb';
import TextArea from './Textarea';


const Form = ({
    state,
    setState,
    result,
    setResult,
    onInputChange,
    remainingChars,
    setRemainingChars,
    isFocused,
    setIsFocused 
}) => {

    return (
        <div className='container'>
        <div className='form-card'>
            <div className='title-and-response'>
                <h1>Contact us</h1>

                {result && (
                <p className={`${result.success ? 'success' : 'error'}`}>
                    {result.message}
                </p>
            )}
                </div>
            
            
            <form onSubmit={(e) => sendToDb(e, state, setState, setResult)}>
                <p>
                   
                    <input
                        type="text"
                        required
                        name="name"
                        placeholder="Your name"
                        value={state.name}
                        onChange={onInputChange}
                    />
                </p>
                <p>
                    <input
                        type="email"
                        required
                        name="email"
                        placeholder="Email Address"
                        value={state.email}
                        onChange={onInputChange}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        required
                        name="subject"
                        placeholder="Subject"
                        value={state.subject}
                        onChange={onInputChange}
                    />
                </p>

                <TextArea
                onInputChange={onInputChange}
                state={state}
                setState={setState}
                remainingChars={remainingChars} 
                setRemainingChars={setRemainingChars}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                />

               

                <p>
                    <input type="submit" value="Send Message" />
                </p>
            </form>
        </div>
    </div>
    )
}

export default Form