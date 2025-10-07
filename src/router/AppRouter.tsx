import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { appRoutes } from "./routes";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/hook";
import type { RootState } from "../store/store";
import Loader from "../components/common/Loader";
import { fetchProfile } from "@/api/auth";

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(!user);
  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(true);
        try {
         await dispatch(fetchProfile());
        } catch (err) {
          console.error("Profile fetch error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch, user]);

  if (loading) return <Loader />;

  return (
    <Router>
      <Routes>
        {appRoutes.map((route) => {
          let element = route.element;

          if (route.protected) {
            element = (
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                {route.element}
              </ProtectedRoute>
            );
          } else if (route.guest) {
            element = (
              <GuestRoute isAuthenticated={isAuthenticated}>
                {route.element}
              </GuestRoute>
            );
          }

          return <Route key={route.path} path={route.path} element={element} />;
        })}

        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="*"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
