import React, { useState } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    // Function to handle button clicks
    const handleButtonClick = (value) => {
        // Clear the input and result
        if (value === 'C') {
            setInput('');
            setResult('');
            return;
        }

        // Evaluate the expression
        if (value === '=') {
            try {
                // Prevent invalid expressions
                if (input && !/[^0-9+\-*/.() ]/.test(input)) {
                    // Format the result to show decimals properly
                    const evalResult = eval(input);
                    setInput(evalResult.toString()); // Display result directly in input
                    setResult(evalResult.toString()); // Optionally store the result
                } else {
                    setInput('Error');
                    setResult('');
                }
            } catch {
                setInput('Error');
                setResult('');
            }
            return;
        }

        // Handle +/- button
        if (value === '+/-') {
            setInput((prevInput) =>
                prevInput.startsWith('-')
                    ? prevInput.substring(1)
                    : '-' + prevInput
            );
            return;
        }

        // Prevent multiple consecutive operators
        if (/[\+\-\*\/]$/.test(input) && /[\+\-\*\/]/.test(value)) {
            return; // Do nothing if the last character is an operator and another operator is clicked
        }

        // Prevent multiple decimal points in the same number
        if (value === '.' && /[0-9]*\.[0-9]*$/.test(input)) {
            return; // Don't add a decimal point if one already exists
        }

        // Add the clicked value to the input string
        setInput((prevInput) => prevInput + value);
    };

    return (
        <div className="calculator">
            <div className="display">
                <div className="input">{input || '0'}</div>
            </div>
            <div className="buttons">
                <button onClick={() => handleButtonClick('1')}>1</button>
                <button onClick={() => handleButtonClick('2')}>2</button>
                <button onClick={() => handleButtonClick('3')}>3</button>
                <button onClick={() => handleButtonClick('+')}>+</button>
                <button onClick={() => handleButtonClick('4')}>4</button>
                <button onClick={() => handleButtonClick('5')}>5</button>
                <button onClick={() => handleButtonClick('6')}>6</button>
                <button onClick={() => handleButtonClick('-')}>-</button>
                <button onClick={() => handleButtonClick('7')}>7</button>
                <button onClick={() => handleButtonClick('8')}>8</button>
                <button onClick={() => handleButtonClick('9')}>9</button>
                <button onClick={() => handleButtonClick('*')}>*</button>
                <button onClick={() => handleButtonClick('0')}>0</button>
                <button onClick={() => handleButtonClick('/')}>/</button>
                <button onClick={() => handleButtonClick('%')}>%</button>
                <button onClick={() => handleButtonClick('C')}>C</button>
                <button onClick={() => handleButtonClick('+/-')}>+/-</button>
                <button onClick={() => handleButtonClick('.')}>.</button>{' '}
                {/* Added decimal point */}
                <button onClick={() => handleButtonClick('=')}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
