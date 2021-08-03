import React from 'react';
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "utils/index";
// import * as qs from "qs";
import {useHttp} from "utils/http";



// const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 3000)
    const [list, setList] = useState([])
    const client = useHttp()


    //获取项目接口数据
    useEffect(() => {
        setIsLoading(true)
        client('projects', {data: cleanObject(debouncedParam)})
            .then(setList)
            .catch(error => {
                setIsLoading(false)
                setList([])
            })
            .finally(() => setIsLoading(false))
    }, [debouncedParam])
    //获取user接口数据
    useMount(() => {
        client('users').then(setUsers)
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List loading={isLoading} users={users} dataSource={list}/>
    </div>
}
