import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';
import axios from 'axios';



const url ='http://localhost:3001/category/';

const AgregarCategorias = () =>{

    const [visible, setVisible] = useState(false);
    const [categorie,setCategorie] = useState({
        name:'',
        description:''
    });

    const postCategorie = async() =>{
        await axios.post(url, categorie)
        .then(res=>{
            setVisible(true);
        })
    }

    const handleInputChange =(e)=>{//toma el value del input
        setCategorie({
            ...categorie,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e)=>{ //las acciones para agregar producto o actualizar.
        e.preventDefault();
        setCategorie({
            name:'',
            description:''
        })
        postCategorie();
    }

    const onDismiss = () => setVisible(false);




    return(
        <div>
            <Alert color="success" isOpen={visible} toggle={onDismiss}>
                Categoría agregada!!
            </Alert>
            <form onSubmit={onSubmit}>
                <h3>Crear Categoría</h3>
                <div className="form-group">
                    <label>Categoría:</label><br />
                    <input  type='text' name='name' onChange={handleInputChange} value={categorie.name} />
                </div>
                <div className="form-group">
                    <label>Descripción:</label><br />
                    <textarea name='description' onChange={handleInputChange} value={categorie.description}/>
                </div>
                <button class="btn btn-primary" type='submit'>Crear categoría</button>
            </form>

            
        </div>
    )
}

export default AgregarCategorias