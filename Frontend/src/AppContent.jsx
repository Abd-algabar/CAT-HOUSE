import React from "react";
import Nav from "./components/01-Nav/Nav.jsx";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Home from "./pages/home.jsx";
import Footer from "./components/07-Footer/Footer.jsx";
import Login from "./pages/login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import AdoptCats from "./pages/Adopt cats/AdoptCats.jsx";
import CatsForMating from "./pages/Cats for mating/CatsForMating.jsx";
import CatPage from "./pages/cat details/CatPage.jsx";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Me from "./pages/me/Me.jsx";
const AppContent = () => {
  const { isAuthenticated, user, loading } = useAuth();
  //  console.log("Auth status:", { isAuthenticated, user, loading });
  return (
    <>
      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Nav />
                <Home />
              </>
            }
          />

          <Route
            path="login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="signup"
            element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/me"
            element={isAuthenticated &&  <>
            <Nav />
            <Me />
            </>  }
          />

          <Route
            path="/AdoptCats"
            element={
              <>
                <Nav />
                <AdoptCats />
              </>
            }
          />

          <Route
            path="/Mating"
            element={
              <>
                <Nav />
                <CatsForMating />
              </>
            }
          />

          <Route
            path="/catDetails/:id"
            element={
              <>
                <Nav />
                <CatPage />
              </>
            }
          />
        </Routes>
      </Container>
      <Footer />
      <Toaster />
    </>
  );
};

export default AppContent;
