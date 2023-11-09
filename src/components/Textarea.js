import React from 'react';


const TextArea = ({ state, onInputChange, setIsFocused, remainingChars }) => {
   


return (<div className="textarea-container">
                        
                            <textarea
                                name="message"
                                required
                                placeholder="Your Message"
                                value={state.message}
                                maxLength={280}
                                onChange={onInputChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />

                            <div
                                className="circle"
                                style={{
                                borderColor: remainingChars > 50 ? 'green' : 'red',
                                
                                }}
                            >
                                {remainingChars}
                            </div>
                        
                    </div>)
}

export default TextArea;
  
  
  