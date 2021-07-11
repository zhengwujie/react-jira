import React from "react";
import {useArray, useMount} from "utils";

export const TsReactTest = () => {
    const persons: { name: string, age: number }[] = [{
        name: "jay", age: 18
    }, {
        name: '小明', age: 12
    }]
    const {value, clear, removeIndex, add} = useArray(persons)
    useMount(() => {

    })
    return (
        <div>
            {/*点击添加addjohn*/}
            <button onClick={() => add({name: 'john', age: 34})}>add john</button>
            {/*点击以后删除第一项*/}
            <button onClick={() => removeIndex(0)}>remove 0</button>
            {/*点击清空所有*/}
            <button style={{marginBottom: '50px'}} onClick={() => clear()}>clear</button>
            {value.map((person, index) => (
                <div style={{marginBottom: '30px'}} key={index}>
                    <span style={{color: 'red'}}>{index}</span>
                    <span>{person.name}</span>
                    <span>{person.age}</span>
                </div>
            ))}
        </div>
    )
}
