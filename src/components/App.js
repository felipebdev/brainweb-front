import React from 'react';
import PizzaMount from './features/pizzaCreation/PizzaMount'
import {Row,Col} from 'antd'
import { PageHeader } from 'antd';

import './App.css'


export default class App extends React.Component{
  render(){
    return(
      <>

        <Row>
          <PageHeader
              title="Monte sua pizza"
              subTitle="Brainweb Test, por Felipe Bonazzi"
            />
        </Row>

        <Row justify="center" style={{marginTop:50}}>
          <Col>
            <PizzaMount />
          </Col>
        </Row>

      </>

    );
  }
}
