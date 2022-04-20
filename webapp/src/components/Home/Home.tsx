import Nav from '../Fragments/Nav';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../Fragments/Footer';
import List from './List';
import ShoesView from './Shoes';
import {useState, useEffect} from 'react';
import { TypeProduct } from '../../shared/shareddtypes';
import { getProducts } from '../../api/api';

const useStyles = makeStyles({
  sizes: {
    marginLeft:'34%',
    marginTop:'100px',
    
  },
  container:{
   height: '90vh',
   width: '90vw',
   
   display: 'grid',
   gridTemplateAreas: `'header header header'
                        'left main right'
                        'footer footer footer'`,
   gridTemplateRows: '1fr 3fr 1fr',
   gridTemplateColumns: '1fr 2fr 1fr',
},
main: {
 gridArea: 'main',
  
},
footer: {
  gridArea: 'footer'
  
},
header: {
  gridArea: 'header'
  
},
left: {
  gridArea: 'left'
  
},right: {
  gridArea: 'right'
  
}

});
const Home = () => {
  // Recarga de la lista de productos para el /home
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const reloadItems = async () => {
    setProducts(await getProducts());
    
    // Inicializacion de carrito
    if(sessionStorage.getItem('cart') == null){
      sessionStorage.setItem('cart', JSON.stringify([]));
    }
  }
  useEffect(()=>{
    reloadItems();
  },[]);
    
    return (
      <div>
        <Nav />
        <ShoesView products={products}/>
        <List/>
        <Footer/>
      </div>
    );
  };
  export default Home;