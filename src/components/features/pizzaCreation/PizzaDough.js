import React, { Component } from 'react'
import { Radio } from 'antd';

export default class PizzaDough extends Component {
    render() {
        const {doughs} = this.props 
        return (
            <div>
                {doughs !== null && doughs !== undefined && doughs.length > 0 ?
                 <>
                 <Radio.Group name="dough" size="large" buttonStyle="solid" onChange={this.props.onChange}>
                 {doughs.map(d=>{
                     return <Radio.Button value={d}>{d}</Radio.Button>
                 })}
                 </Radio.Group>
                
              </>:<></>}
            </div>
        )
    }
}
