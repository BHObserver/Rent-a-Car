import { Route, Routes } from 'react-router-dom';
import NotMatch from './routes/NotMatch';
import MainPage from './routes/MainPage';
import DetailsPage from './routes/DetailsPage';
import Layout from './components/Layout';
import AuthSection from './routes/AuthSection';

function App() {
  <div className="App">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="details" element={<DetailsPage />} />
        <Route path="*" element={<NotMatch />} />
      </Route>
      <Route path="auth" element={<AuthSection />} />
    </Routes>
  </div>;
}

export default App;
