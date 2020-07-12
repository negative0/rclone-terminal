
const clearExt = (history, setHistory, setIsLoading) => {
    return {
        exec: ({ structure, history, cwd }, command) => {
            return { structure, cwd, history: [] };
        },
    }
};

export default clearExt;