import {
    FETCH_PIZZAS,
    FETCH_PIZZAS_DONE,
    FETCH_PIZZAS_FAILED,
    
    POST_PIZZA,
    POST_PIZZA_DONE,
    POST_PIZZA_FAILED
} from '../actions/pizza';

const initialState = {
    doughs:[],
    sizes:[],
    flavors:[],
    daySuggestion:{},
    loadingData:null,
    errorData: null,

    pizzaPost:null,
    loadingPost:null,
    errorPost:null
}

export default (state = initialState, action) =>{
    state = {...state};
    switch (action.type) {
        case 'RESET_APP':
            state.pizzaPost = null;
            state.loadingPost = null;
            state.errorPost = null; 
            break;
        case FETCH_PIZZAS:
            state.loadingData = true;
            break;
        case FETCH_PIZZAS_DONE:
            state.loadingData = false;
            state.doughs = action.data.massas;
            state.sizes = action.data.tamanhos;
            state.flavors = action.data.sabores;
            state.daySuggestion = action.data.sugestao;
            break;
        case FETCH_PIZZAS_FAILED:
            state.loadingData = false;
            state.errorData = action.data.error;
            break;
        
        case POST_PIZZA:
            state.loadingPost = true;
            break;
        case POST_PIZZA_DONE:
            state.pizzaPost = action.data;
            state.loadingPost = false;
            break;
        case POST_PIZZA_FAILED:
            state.loadingPost = false;
            state.errorPost = action.data.error;
            break;
        
        default:
            break;
    }
    return state;
}