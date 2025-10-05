import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [mensagem, setMensagem] = useState("Carregando...")

  useEffect(() => {
    axios.get(import.meta.env.VITE_API_URL + "/")
      .then(res => setMensagem(res.data.message))
      .catch(() => setMensagem("Erro ao conectar com o backend"))
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{mensagem}</h1>
    </div>
  )
}

export default App