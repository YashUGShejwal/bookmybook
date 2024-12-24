import Router from "./routes/routes.index";

import JwtProvider from "./providers/JwtProvider";

function App() {
  return (
    <JwtProvider>
      <div className="App">
        <Router />
      </div>
    </JwtProvider>
  );
}

export default App;