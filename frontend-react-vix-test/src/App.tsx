import React, { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button data-testid="count" onClick={() => setCount((c) => c + 1)}>
            </button>
        </div>
    );
}

export default App;
