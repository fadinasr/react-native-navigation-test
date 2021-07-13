import { useRef, useState, useEffect } from 'react';

const newValue = () => Object.create(null);

export default function useForceUpdate() {
    const setState = useState(newValue())[1];

    const updatePending = useRef(false);

    const forceUpdate = useRef(() => {
        if (!updatePending.current) {
            setState(newValue());
            updatePending.current = true;
        }
    }).current;

    useEffect(() => {
        updatePending.current = false;
    });

    return forceUpdate;
}
