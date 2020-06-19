import React, { Component } from 'react'
import {Radio} from 'antd';

export default class PizzaFlavor extends Component {
    render() {
        const {flavors} = this.props 
        return (
            <div>
                {flavors !== null && flavors !== undefined && flavors.length > 0 ?
                 <>
                 <Radio.Group name="flavor" size="large" buttonStyle="solid" onChange={this.props.onChange}>
                 {flavors.map(f=>{
                     return <Radio.Button value={f}>{f}</Radio.Button>
                 })}
                 </Radio.Group>
                
              </>:<></>}
            </div>
        )
    }
}
