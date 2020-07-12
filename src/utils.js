import React from "react";

export const convertToHTML = (text) => {
    return (<pre>${text}</pre>);
}

export const addToArrayImmutable = (array, value) => {
    return [...array, {value}];
}