import React, {useState} from 'react';

const Test = () => {
    const [state, setState] = useState(1);

    return (
        <div style={{padding: '1rem'}}>
            <button type="button" onClick={() => setState((p) => p + 1)}>
                <span>Test {state}</span>
            </button>
        </div>
    );
};

export default Test;
