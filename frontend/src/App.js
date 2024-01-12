import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar'
import Home from './component/Home';
import ProductAdd from './component/ProductAdd';
import Operation from './component/Operation'
import SearchProduct from './component/SearchProduct'
import Edit from './component/Edit'
import Order from './component/Order'
import NotFoundPage from './component/NotFoundPage'
import Imageuploade from './component/Imageuploade'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/ProductAdd' element={<ProductAdd/>}></Route>
          <Route path='/Operation' element={<Operation/>}></Route>
          <Route path='/Type/:type' element={<SearchProduct/>}></Route>
          <Route path='/Edit/:id' element={<Edit/>}></Route>
          <Route path='/:product_id/order' element={<Order/>}></Route>
          <Route path='/image' element={<Imageuploade/>}></Route>
          <Route path='*' element={<NotFoundPage/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
