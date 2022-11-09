import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Categoria from '../../../model/Categoria'; 
import { Box, Grid } from '@mui/material';
import './ListaCategoria.css';
import {useNavigate} from 'react-router-dom';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from "react-toastify";
import { BounceLoader } from 'react-spinners';
import DeleteIcon from '@material-ui/icons/Delete';

function ListaCategoria() {
  const [loading, setLoading] = useState(true)
  const [categorias, setCategoria] = useState<Categoria[]>([])
  let navigate = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  useEffect(() => {
    if (token === "") {
      toast.error('Você precisa estar logado', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
        });
        navigate("/login")

    }
}, [token])

  async function getCategoria(){
    await busca("/categorias", setCategoria, {
      headers: {
        'Authorization': token
      }
    })
    setLoading(false)
    
  }

  useEffect(()=>{
    getCategoria()
  }, [categorias.length])

  return (
    <>

{loading ? 

      <BounceLoader
        className="loading-produtos"
        color="#8806BF"
        loading
        size={80}
        speedMultiplier={1}
      /> 

: (

  <Grid container direction="row" justifyContent="center" alignItems="center" className='grid-equipe'>   

  { 

    categorias.map(categoria =>(
      <Box m={2}>
        <Card variant="outlined" className='margin-categorias'>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Categoria
            </Typography>
            <Typography variant="h5" component="h2">
            {categoria.tipo}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioCategoria/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="cor-botao-categoria" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deleteCategoria/${categoria.id}`}  className="text-decorator-none">
                <Box mx={1}>
                  <Button  size='small' color="secondary">
                    <DeleteIcon />
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
    ))  
    }

    </Grid>
)
  }
    </>
  );
}


export default ListaCategoria;