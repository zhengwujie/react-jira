import React from 'react';
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObj, useDebounce, useMount} from "../../utils/index";
import * as qs from "qs";


const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 1000)
    const [list, setList] = useState([])
    //获取项目接口数据
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])
    //获取user接口数据
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users}/>
        <List users={users} list={list}/>
    </div>
}
