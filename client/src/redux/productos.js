import axios from 'axios'

//CONSTANTES

const GET_ALLPRODUCTS = 'GET_ALLPRODUCTS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_SELPRODUCT = 'GET_SELPRODUCT';
const FILTER_CATEGORIES = 'FILTER_CATEGORIES';
const FILTER_PRODUCTS = 'FILTER_PRODUCTS';
const FIND_PRODUCTS = 'FIND_PRODUCTS';

const url = 'http://localhost:3001/products/';

// STATE

const initialState = {
    products: [],
    selProduct: {},
    statusFilter: false,
}

// REDUCER

export default function productReducer (state = initialState, action){
    switch(action.type){
        case GET_ALLPRODUCTS:
            return { 
                products: action.payload,
                statusFilter: false
            }
        case GET_PRODUCTS:
            return {
                products: action.payload,
                statusFilter: false
            }
        case GET_SELPRODUCT:
            return {
                ...state,
                selProduct: action.payload
            }
        case FILTER_CATEGORIES:
            return {
                ...state,
                products: action.payload,
                statusFilter: false
            }
            
        case FILTER_PRODUCTS:
            return {
                products: action.payload,
                // filterProducts: action.payload,
                statusFilter: true
            }
        case FIND_PRODUCTS:
            return {
                products: action.payload,
                statusFilter: 'search'
            }        
        default:
            return {
                ...state,
                selProduct: {},
                statusFilter: false
            }        
    }
}

// ACTIONS

let arrProducts;

export const getAllProducts = () => async(dispatch) => {
    try{
       const {data} = await axios.get(url)

       dispatch({
           type: GET_ALLPRODUCTS,
           payload: data
       })
    }catch(error){
       console.log(error)
    }
}

export const getProducts = () => async(dispatch) => {
     try{
        const {data} = await axios.get(url)
        let conStock = data.filter(e => e.stock > 0)

        dispatch({
            type: GET_PRODUCTS,
            payload: conStock
        })
     }catch(error){
        console.log(error)
     }
}

export const selProduct = (id) => async(dispatch) => {
    try{
        const {data} = await axios.get(`${url}${id}`)
        dispatch({
            type: GET_SELPRODUCT,
            payload: data
        })
    }catch(error){
        console.log(error)
    }
}

export const findProducts = (arg) => async(dispatch) => {
    try{
        const { data } = await axios.get(
            `http://localhost:3001/products/search?text=${arg}`
        );
        dispatch({
            type: FIND_PRODUCTS,
            payload: data
        })
    }catch(error){
        console.log(error)
    }
}
//data.filter(e.stock > 0)
export const filterProducts = (products,propiedad,arg) => async(dispatch) => {
    try{
        let data = products.filter(e => e[arg] === propiedad)
        
        console.log(propiedad,arg,arrProducts)
        dispatch({
            type: FILTER_PRODUCTS,
            payload: data
        })
    }catch(error){
        console.log(error)
    }
}

export const filterCategory = (id) => async(dispatch) => {
    try{
        const {data} = await axios.get(`${url}category/${id}`)
        
        console.log(data)
        dispatch({
            type: FILTER_CATEGORIES,
            payload: data
        })
    }catch(error){
        console.log(error)   
    }
}

export const clean = (id) => (dispatch) => {
    
    dispatch({
        type:'CLEAN'
    })
}