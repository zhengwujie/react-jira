import qs from 'qs'
import * as auth from 'auth-provider'
import {useAuth} from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?: string,
    data?: object
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    // axios 和 fetch 区别 axios服务器异常的时候可以捕捉到异常，fetch是捕捉不到异常
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({message: '请重新登录'})
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    const {user} = useAuth()
    // TODO 讲解TS
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, {...config, token: user?.token})
}

/*
interface 也没法实现Utility type
type Person = {
    name: string,
    age: number
}
const xiaoming: Person = {name: '小明', age: 23}
Partial容错
const xiaoming1: Partial<Person> = {name: '小明'}
Omit删除指向
const shenmiren: Omit<Person, 'name'> = {age: 23}
type PersonKeys = keyof Person
type PersonOnlyName = Pick<Person, 'name' | 'age'>
type Age = Exclude<PersonKeys, 'name'>
*/
