import React from 'react';
import {Form, Input, Select} from "antd";

export interface User {
    id: string,
    name: string,
    title: string,
    organization: string,
    token: string
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void

}


export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {


    return <Form>
        <div>
            <Input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}></Input>
            <Select style={{'width':'100px'}} value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option key="userId" value="{''}">负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </div>
    </Form>
}
