import React, { Component } from 'react'
import {Radio} from 'antd';

export default class PizzaSize extends Component {
    render() {
        const {sizes} = this.props 
        return (
            <div>
                {sizes !== null && sizes !== undefined && sizes.length > 0 ?
                 <>
                 <Radio.Group name="size" size="large" buttonStyle="solid" onChange={this.props.onChange}>
                 {sizes.map(s=>{
                     return <Radio.Button value={s}>{s}</Radio.Button>
                 })}
                 </Radio.Group>
                
              </>:<></>}
            </div>
        )
    }
}
