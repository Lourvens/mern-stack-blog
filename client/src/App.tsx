import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
