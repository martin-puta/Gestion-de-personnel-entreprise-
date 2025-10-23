import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import About from './pages/About';
import Analatics from './pages/Analatics';
import Comment from './pages/Comment';
import Product from './pages/Product';
import ProductList from './pages/ProductList';
import "./pages/style.css"
function App() {
  return (
    <div className="App">
      {/* <SideBar/> */}
      <BrowserRouter>
      <SideBar>
      <Routes>
        <Route path='/' element={<DashBoard/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/analatics' element={<Analatics/>}></Route>
        <Route path='/comment' element={<Comment/>}></Route>
        <Route path='/product' element={<Product/>}></Route>
        <Route path='/productList' element={<ProductList/>}></Route>
      </Routes>
      </SideBar>
      </BrowserRouter>
    </div>
  );
}

export default App;
