import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Form from './Components/Form';
import Update from './Components/Update';


const App = () => {
  console.log("here line 6 app.jsx")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/form' element={<Form />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='*' element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;