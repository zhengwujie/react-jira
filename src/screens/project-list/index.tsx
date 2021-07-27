import React from 'react';
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObj, useDebounce, useMount} from "utils/index";
// import * as qs from "qs";
import {useHttp} from "utils/http";


// const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 1000)
    const [list, setList] = useState([])
    const client = useHttp()


    //获取项目接口数据
    useEffect(() => {
        client('projects', {data: cleanObj(debouncedParam)}).then(setList)
    }, [debouncedParam])
    //获取user接口数据
    useMount(() => {
        client('users').then(setUsers)
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List users={users} list={list}/>
    </div>
}
