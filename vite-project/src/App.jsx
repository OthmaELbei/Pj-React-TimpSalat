// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import Container from "@mui/material/Container";
import MeinContent from "./component/MeinContent";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <MeinContent />
        </Container>
      </div>
    </>
  );
}

export default App;
