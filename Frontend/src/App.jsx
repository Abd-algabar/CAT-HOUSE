import Nav from "./components/01-Nav/Nav.jsx";
import { Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";



import AppContent from "./AppContent.jsx";
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

function App() {
  // const { isAuthenticated, user, loading } = useAuth();

  return (
    <AuthProvider>
      {/* <Container maxWidth="lg">
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

          <Route path="login" element={ !isAuthenticated?<Login />:<Navigate to="/" />} />
          <Route path="signup" element={!isAuthenticated?<SignUp />:<Navigate to="/" />} />

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
      <Footer /> */}
      <AppContent />
    </AuthProvider>
  );
}

export default App;
