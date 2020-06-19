import React, { Component } from 'react'
import { Steps, Button, message, Alert } from 'antd';
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import {fetchPizzasData, postPizza, resetData} from '../../../actions/pizza'
import PizzaDough from './PizzaDough';
import PizzaSize from './PizzaSize';
import PizzaFlavor from './PizzaFlavor';


const { Step } = Steps;


class PizzaMount extends Component {

    state = {
        currentStep:0,
        pizza:{
            dough:null,
            size:null,
            flavor:null
        }
    };

    componentDidMount(){
        this.props.fetchPizzasData()
    }

    componentDidUpdate(prevProps){
        const pizzaMounted = this.props.pizzaPost !== null ? this.props.pizzaPost.pizzaMounted : null
        if(prevProps.pizzaPost === null && this.props.pizzaPost !== null){
            if(this.props.pizzaPost.receivedPoints ===true)
            message.success(`Pizza ${pizzaMounted.size.toLowerCase()} de '${pizzaMounted.flavor.toLowerCase()}' com massa ${pizzaMounted.dough.toLowerCase()} criada com sucesso. Você acaba de receber ${this.props.pizzaPost.points} pontos!`,5)
            else message.success(`Pizza ${pizzaMounted.size.toLowerCase()} de '${pizzaMounted.flavor.toLowerCase()}' com massa ${pizzaMounted.dough.toLowerCase()} criada com sucesso!`)
            this.restartPizza()
        }
    }

    restartPizza = () => {
        this.setState({
            currentStep:0,
            pizza:{
                dough:null,
                size:null,
                flavor:null
            }
        })
        this.props.resetData()
    }

    next = () => {
    const currentStep = this.state.currentStep + 1;
    this.setState({ currentStep });
    }

    prev = () => {
    const currentStep = this.state.currentStep - 1;
    this.setState({ currentStep });
    }
    
    onChange = (e) => {
        this.setState({
            ...this.state,
            pizza:{
                ...this.state.pizza,
                [e.target.name]:e.target.value
            }
        })
    }

    validateStep = currentStep => {
        let valid = null
        switch (currentStep) {
            case 0:
                this.state.pizza.dough === null ? valid = false : valid = true;
                break;
            case 1:
                this.state.pizza.size === null ? valid = false : valid = true;
                break;
            case 2:
                this.state.pizza.flavor === null ? valid = false : valid = true;
                break;
            default:
                break;
        }
        return valid
    }

    createPizza = () => {
        this.props.postPizza(this.state.pizza)
    }

    renderSteps = () => {
    const { currentStep } = this.state;
    const steps = [
        {
            title: 'Escolha sua massa',
            content: <PizzaDough doughs = {this.props.doughs} onChange={this.onChange}/>
        },
        {
            title: 'Escolha o tamanho',
            content: <PizzaSize sizes={this.props.sizes} onChange={this.onChange}/>
        },
        {
            title: 'Escolha o sabor',
            content: <PizzaFlavor flavors = {this.props.flavors} onChange={this.onChange}/>
        }
    ];

    return (
        <div>
        <Steps current={currentStep}>
            {steps.map(item => (
            <Step key={item.title} title={item.title} />
            ))}
        </Steps>
        
        <div style={{paddingTop:50,paddingBottom:50,textAlign:"center"}}>
            {steps[currentStep].content}
            
        </div>
        <div >
            {currentStep < steps.length - 1 && ( 
            <Button size="large" style={{float:"right"}} type="primary" onClick={() => {
                if(this.validateStep(currentStep)) this.next()
                else message.error("Por favor, escolha uma opção.")
            }}>
                Próximo
            </Button>
            )}
            {currentStep === steps.length - 1 && (
            <Button size="large" style={{float:"right"}} type="primary" onClick={() => this.createPizza()}>
                Enviar
            </Button>
            )}
            {currentStep > 0 && (
            <Button size="large" style={{float:"right",marginRight:8}} onClick={() => this.prev()}>
                Voltar
            </Button>
            )}
        </div>
        </div>
    );
    }


    render(){
    return (
        <>
        <div style={{padding:20}}>
            <Alert 
            message="Sugestão do dia"
            description={`A sugestão de escolha de sabor do dia é ${this.props.daySuggestion.sabor}. Escolha esse sabor para ganhar pontos de benefício!`}
            type="info"
            />
        </div>
        {this.renderSteps()}
        </>
    );
    }
}


const mapStateToProps = state => {
    return {
        doughs:state.pizza.doughs,
        sizes:state.pizza.sizes,
        flavors:state.pizza.flavors,
        loadingData:state.pizza.loadingData,
        errorData: state.pizza.errorData,
        daySuggestion:state.pizza.daySuggestion,
        pizzaPost: state.pizza.pizzaPost,
        loadingPost:state.pizza.loadingPost,
        errorPost:state.pizza.errorPost
    }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({ 
    fetchPizzasData,
    postPizza,
    resetData
    }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PizzaMount)
