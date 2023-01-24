import ACTIONS from './actions'

import {
    doThrow, uniqueID, trakTime,
    doWarn, throwIf, mayWarnIf, isFunction
} from '../utils';

import {
    LIB
} from '../constants';
import ERRORS from './errors';
import WARNS from './warns';


const opts = {lib: LIB},
    actions = {
        [ACTIONS.INIT]: ({payload: config}) => ({}),
    },

    reducer = (oldState, action) => {
        const { payload = {}, type } = action;
        throwIf({ condition: typeof type === 'undefined', message: ERRORS.REDUCER_NO_TYPE_IN_ACTION.description, opts});
        if (type in actions) {
            const newState = {
                ...oldState,
                ...actions[type]({payload, oldState})
            };
            return newState;
        }
        return oldState;
    },

    init = cnf => reducer({}, {type: ACTIONS.INIT, payload: cnf});

export default () => ({
    reducer,
    init
});

/* eslint-enable */