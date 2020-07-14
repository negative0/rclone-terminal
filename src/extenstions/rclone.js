import {coreCommand} from "rclone-api";
import {addToArrayImmutable, convertToHTML} from "../utils";

/**
 * rclone handles the execution of rclone commands in the terminal.
 * @param history       {array}
 * @param setHistory    {function(array)}
 * @param setIsLoading  {function(boolean)}
 * @returns {{exec: (function({structure: *, history?: *, cwd: *}, *): {cwd: *, history: *, structure: *})}}
 */
const rclone = (history, setHistory, setIsLoading) => {
    return {
        exec: ({structure, history, cwd}, command) => {
            setIsLoading(true);
            let args = [];
            let opts = {};

            for (let i in command.args) {
                if (command.args.hasOwnProperty(i)) {
                    if (isNaN(parseInt(i))) {
                        opts[i] = command.args[i];
                        continue;
                    }
                    let arg = command.args[i];
                    args.push(arg);
                }
            }
            coreCommand(args, opts).then(res => {
                console.log(res);
                setHistory(
                    addToArrayImmutable(history, convertToHTML(res.result))
                );
                setIsLoading(false);

            }, err=>{
                setHistory(
                    addToArrayImmutable(history, convertToHTML(`ERROR: ${err.message}`))
                );
                setIsLoading(false);
            });

            return {structure, cwd, history};
        }
    }
};

export default rclone;