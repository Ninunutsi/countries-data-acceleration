import './styles/App.css';
import './styles/responsive.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements,Route } from 'react-router-dom';
import LayoutIndex from './layout/LayoutIndex';
import MainPage from './pages/MainPage';
import Country, { detailsLoader } from './pages/Country';
import Currency from './pages/Currency';
import Airports from './pages/Airports';
import Error from './pages/Error';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LayoutIndex />}>
      <Route index element={<MainPage />} />
      <Route path=':cca3' element={<Country />} loader={detailsLoader}> 
        <Route index element={<Currency />} loader={detailsLoader}/>
        <Route path='airports' element={<Airports/>} />
      </Route>

      <Route path='*' element={<Error />}/>
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
