import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import EmailEditorPage from "./pages/EmailEditorPage";
import TemplateEditorPage from "./pages/TemplateEditorPage";
import NavBar2 from "./components/NavBar2";
import TemplatePage from "./pages/TemplatePage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/template" element={<TemplatePage/>} />
          <Route path="/new" element={<TemplateEditorPage />} />
          <Route path="/edit/:templateId" element={<NavBar2><TemplateEditorPage /></NavBar2>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
