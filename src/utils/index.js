import {useEffect, useState} from "react";

export const isFalsy = (value) => value === 0 ? false : !value
// 清除控制
export const cleanObj = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        isFalsy(result[key]) && (delete result[key])
    })
    return result
}

export const useMount = (callback) => {
    useEffect(() => {
        callback()
    }, [])
}


export const debounce = (func, delay) => {

    let timeout;
    return () => {
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func()
        }, delay)
    }
}


export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        // 每次在value变化以后，设置一个定时器
        const timeOut = setTimeout(() => setDebounceValue(value), delay)
        // 每一次在上一个userEffect处理完以后在运行
        return () => clearTimeout(timeOut)
    }, [value, delay])
    return debounceValue
}

/*
const log = debounce(() => console.log('call'), 500)
log()log1   赋值timeout执行计时器
log()log2   清空log1, 然后继续赋值log2-timeout
log()log3   清空log2， 然后继续赋值log3-timeout ，最后获取计时之后的结果call
*/

