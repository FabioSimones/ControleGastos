import { useEffect } from "react";
import { pessoasApi } from "./api/pessoas";

function App() {
  useEffect(() => {
    pessoasApi.listar()
      .then(data => console.log("Pessoas:", data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Conectando com API...</h1>;
}

export default App;
