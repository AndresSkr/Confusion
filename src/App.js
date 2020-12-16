import logo from './logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import MenuComponent from './components/menuComponent';
import './App.css';
import { DISHES } from './shared/dishes';


function App() {

  const state = {
    dishes: DISHES
  };

  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/"> Ristorante con Fusion</NavbarBrand>
        </div>
      </Navbar>
      <MenuComponent dishes={state.dishes} />
    </div>
  );
}

export default App;
