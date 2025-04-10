// resources/js/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RouteGuard from './RouteGuard';
import { routes } from './routes';
import '../../sass/app.scss';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={<RouteGuard route={route} />}
            >
              <Route path={route.path} element={route.element} />
            </Route>
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;