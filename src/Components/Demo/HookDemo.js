import {useState} from 'react'

function HookDemo() {
    const [count, setCount] = useState(0);

    function handleClickEvent() {
        setCount(count + 1)
    }

    return (
        <button onClick={handleClickEvent}>Count: {count}</button>
    )
}

export default HookDemo