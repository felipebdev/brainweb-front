import axios from 'axios'

export const RESET_APP = 'RESET_APP'

export const FETCH_PIZZAS = 'FETCH_PIZZAS'
export const FETCH_PIZZAS_DONE = 'FETCH_PIZZAS_DONE'
export const FETCH_PIZZAS_FAILED = 'FETCH_PIZZAS_FAILED'

export const POST_PIZZA = 'POST_PIZZA'
export const POST_PIZZA_DONE = 'POST_PIZZA_DONE'
export const POST_PIZZA_FAILED = 'POST_PIZZA_FAILED'

const fetchPizzasRequest = () => {
    return {
        type:FETCH_PIZZAS
    }
}

const fetchPizzasDone = data => {
    return {
        type:FETCH_PIZZAS_DONE,
        data
    }
}


const fetchPizzasFailed = error => {
    return {
        type:FETCH_PIZZAS_FAILED,
        error
    }
}

const postPizzaRequest = () => {
    return {
        type:POST_PIZZA
    }
}


const postPizzaDone = (data) => {
    return {
        type:POST_PIZZA_DONE,
        data:data
    }
}


const postPizzaFailed = (error) => {
    return {
        type:POST_PIZZA_FAILED,
        error:error
    }
}

export const resetData = () => {
    return {
        type:RESET_APP
    }
}


// async creators

export const fetchPizzasData = () =>{
    return (dispatch) => {
        dispatch(fetchPizzasRequest())
        axios.get('http://localhost:3001/pizzas').then(response => {
            dispatch(fetchPizzasDone(response.data))
        }).catch(error=>{
            dispatch(fetchPizzasFailed(error))
        })
    }
}

export const postPizza = pizza => {
    return (dispatch) => {
        dispatch(postPizzaRequest())
        axios.post('http://localhost:3001/pizza/make',pizza).then(response =>{
            dispatch(postPizzaDone(response.data))
        }).catch(error => {
            dispatch(postPizzaFailed(error))
        })
    }
}