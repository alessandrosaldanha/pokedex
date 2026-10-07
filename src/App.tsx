import React, { useState } from "react"; // 1. Importe o useState
import "./App.css";
import Home from "./pages/home/Home";
import Button from "./components/buttons/Buttons";

function App() {
  // 2. Crie um estado para guardar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = () => {
    alert("Botão clicado");
    setErrorMessage(""); // Limpa o erro se o usuário clicar no outro botão
  };

  const handleDesativou = () => {
    // 3. Atualize o estado com a mensagem que deseja exibir
    setErrorMessage("Ocorreu um erro ao desativar!");
  };

  return (
    <div className="App">
      Pokemon List <Home />
      <Button label="Enviar" onClick={handleClick} variant="primary" />
      <Button label="Desativar" onClick={handleDesativou} variant="secondary" />
      {/* 4. Renderize a mensagem condicionalmente na tela */}
      {errorMessage && (
        <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default App;
