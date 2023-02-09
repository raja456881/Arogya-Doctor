import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Skeleton } from "antd";

// components
import Login from "./login/loginForm";
import InvalidPath from "./invalidPath";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Skeleton style={{ padding: "200px" }} active />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<p>test</p>} />
          <Route path="*" element={<InvalidPath />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
