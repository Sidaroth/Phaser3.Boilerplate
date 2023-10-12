import { COMPOSITION_INFO } from 'configs/devConfig';
import { State } from './createState';

const alreadyLogged: Array<string> = [];

/* eslint-disable */
const updateFunctionUsage = function updateFunctionUsageFunc(name: string, state: any, functionMap: Map<string, Array<string>>) {
    for (const fun in state) {
        if (functionMap.has(fun)) {
            functionMap.get(fun)?.push(name);
        } else {
            functionMap.set(fun, [name]);
        }
    }
};

const isInFilter = function isInFilterFunc(val: Array<string>, source: string) {
    let isInFilter = true;
    if (COMPOSITION_INFO.ENABLE_FILTER) {
        isInFilter = false;
        if (COMPOSITION_INFO.FILTER) {
            COMPOSITION_INFO.FILTER.every(f => {
                if (val.find(s => s === f)) {
                    isInFilter = true;
                    return false;
                }
                return true;
            });
        }
    }
    let inFactoryFilter = true;
    if (COMPOSITION_INFO.ENABLE_FACTORY_FILTER) {
        inFactoryFilter = false;
        if (COMPOSITION_INFO.FACTORY_FILTER) {
            inFactoryFilter = COMPOSITION_INFO.FACTORY_FILTER.some(ff => ff === source);
        }
    }
    return isInFilter && inFactoryFilter;
};

const getFunctionUsage = function getFunctionUsageFunc(states: Array<State>, source: string) {
    if (alreadyLogged.find(l => l === source)) {
        return;
    }
    alreadyLogged.push(source);
    if (COMPOSITION_INFO && COMPOSITION_INFO.ENABLE) {
        // map all states
        const functionMap = new Map<string, Array<string>>();
        states.forEach(s => {
            updateFunctionUsage(s.name, s.state, functionMap);
        });

        // print info
        functionMap.forEach((val, key) => {
            let inFilter = isInFilter(val, source);
            if (inFilter && val.length > 1) {
                console.log(
                    `%c${source} %cneeds to pipe %c${key} %c=>${val.reduce((acc: string, name: string) => `${acc} ${name},`, '')}`,
                    'color: yellow',
                    'color: inherits',
                    'color: yellow',
                    'color: inherits'
                );
            }
        });
    }
};

export default getFunctionUsage;
