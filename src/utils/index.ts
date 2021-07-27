import {useEffect, useState} from "react";

export const isFalsy = (value: unknown): boolean => value === 0 ? false : !value
// 清除控制
export const cleanObj = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        // @ts-ignore
        isFalsy(result[key]) && (delete result[key])
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [callback])
}


// export const debounce = (func, delay) => {
//
//     let timeout;
//     return () => {
//         if (timeout) {
//             clearTimeout(timeout)
//         }
//         timeout = setTimeout(() => {
//             func()
//         }, delay)
//     }
// }

// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        // 每次在上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
};

/*
const log = debounce(() => console.log('call'), 500)
log()log1   赋值timeout执行计时器
log()log2   清空log1, 然后继续赋值log2-timeout
log()log3   清空log2， 然后继续赋值log3-timeout ，最后获取计时之后的结果call
*/

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.splice(index, 1)
            setValue(copy)
        }
    }
}
