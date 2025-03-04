import { useState } from "react";

import React from "react";

const Form = () => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const lidarComMudanca = (evento) => {
    const { name, value } = evento.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const lidarComEnvio = async (evento) => {
    evento.preventDefault();
    const chaveApi = import.meta.env.VITE_STATIC_FORMS_API_KEY; // Pegando a chave do .env

    const resposta = await fetch("https://api.staticforms.xyz/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accessKey: chaveApi,
        ...dadosFormulario,
      }),
    });

    if (resposta.ok) {
      alert("Mensagem enviada com sucesso!");
      setDadosFormulario({ nome: "", email: "", mensagem: "" }); // Limpa os campos após o envio
    } else {
      alert("Houve um erro ao enviar a mensagem.");
    }
  };

  return (
    <div className="paiForm">
      <div>
        <img src="./public/img/animate.svg" alt="" />
      </div>

      <form onSubmit={lidarComEnvio} className="formulario-container">
        <h1>Entre em contato</h1>

        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={dadosFormulario.nome}
            onChange={lidarComMudanca}
            required
          />
        </label>
        <label>
          E-mail:
          <input
            type="email"
            name="email"
            value={dadosFormulario.email}
            onChange={lidarComMudanca}
            required
          />
        </label>
        <label>
          Mensagem:
          <textarea
            name="mensagem"
            value={dadosFormulario.mensagem}
            onChange={lidarComMudanca}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
