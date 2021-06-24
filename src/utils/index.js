export const isFalsy = (value) => value === 0 ? false : !value
// 清除控制
export const cleanObj = (object) => {
    const result = {...object}
    Object.keys(result).forEach(key => {
        isFalsy(result[key]) && result[key] != '0' && (delete result[key])
    })
    return result
}
