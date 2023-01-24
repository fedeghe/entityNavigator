let count = 0;
const prefix = 'EntNav_',
    isFunction = f => typeof f === 'function',
    debounce = (func, wait) => {
        let timeout;
        return (...params) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...params);
            }, wait);
        };
    },
    escapeComma = r => `${r}`.replace(/,/g, '\\,'),

    trakTime = ({ what, time, opts }) => console.info(...getTimeSpentMessage({params: {what, time}, opts})),

    doWarn = ({ message, params = {}, opts }) => opts.warning && console.warn(getWarnMessage({message, params, opts})),

    doThrow = ({ message, params = {}, opts }) => {throw getErrorMessage({message, params, opts});},

    mayWarnIf = ({ condition, message, params = {}, opts }) => condition && doWarn({message, params, opts}),

    throwIf = ({ condition, message, params = {}, opts }) => condition && doThrow({message, params, opts}),

    getErrorMessage = ({message, params = {}, opts }) => `${opts.lib.toUpperCase()} 🚨 ${paramsMessage({message, params})}`,

    getWarnMessage = ({message, params = {}, opts }) => `${opts.lib.toUpperCase()} 🙉 ${paramsMessage({message, params})}`,

    getTimeSpentMessage = ({params = {what:'not specified', time: 'not specified'}, opts }) => ([
        `%c${opts.lib.toUpperCase()} 🐢 ${paramsMessage({message: '%what% spent %time% ms', params})}`,
        'color:DodgerBlue'
    ]),

    paramsMessage = ({message, params = {}, leaveUnmatching = false}) =>
        Object.entries(params).reduce(
            (acc, [seek, rep]) => acc.replace(new RegExp('%' + seek + '%', 'g'), rep)
        , message)
        .replace(/%([A-z,0-9,_,-]*)%/, (_, $1) => leaveUnmatching ? $1 : ''),

    uniqueID = {
        toString: () => {
            count += 1;
            return prefix + count;
        }
    };
    

export {
    isFunction,
    debounce,
    escapeComma,
    getErrorMessage,
    getWarnMessage,
    getTimeSpentMessage,
    paramsMessage,
    trakTime,
    doWarn, mayWarnIf,
    doThrow, throwIf,
    uniqueID
};
