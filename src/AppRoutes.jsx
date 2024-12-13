// src/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => {
        const Page = route.page;
        
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              ) : (
                <Page />
              )
            }
          />
        );
      })}
    </Routes>
  );
};