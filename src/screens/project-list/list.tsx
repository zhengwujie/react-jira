import React from 'react';
import {User} from "./search-panel";

interface projectList {
    id: string,
    name: string,
    pin: boolean,
    personId: string
    organization: string
}

interface ListProps {
    list: projectList[],
    users: User[]
}

export const List = ({list, users}: ListProps) => {
    return <table>
        <thead>
        <tr>
            <th>名称</th>
            <th>负责人</th>
        </tr>
        </thead>
        <tbody>
        {
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>
                <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>)
        }
        </tbody>
    </table>
}
