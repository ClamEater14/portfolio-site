// import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PageBase from './components/PageBase';
import Home from './views/Home';
import Projects from './views/Projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageBase />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
