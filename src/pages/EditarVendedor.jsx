import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/EditarVendedor.css";

function EditarVendedor() {
  const navigate = useNavigate();
  const { cpf } = useParams(); // usamos o CPF da URL

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Buscar dados do vendedor pelo CPF
  useEffect(() => {
    fetch(
      `https://sistema-vendas-back.onrender.com/vendedores/vendedores/${cpf}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar vendedor");
        return res.json();
      })
      .then((data) => setForm(data))
      .catch(() => setErro("Erro ao carregar dados do vendedor."));
  }, [cpf]);

  const formatarCPF = (cpf) =>
    cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  const formatarTelefone = (telefone) =>
    telefone.replace(/\D/g, "").replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cpf") {
      setForm({ ...form, [name]: formatarCPF(value) });
    } else if (name === "telefone") {
      setForm({ ...form, [name]: formatarTelefone(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErro("");
    setSucesso("");
  };

  const validarFormulario = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.nome.trim()) return "O nome é obrigatório.";
    if (form.cpf.replace(/\D/g, "").length !== 11) return "CPF inválido.";
    if (form.telefone.replace(/\D/g, "").length !== 11)
      return "Telefone inválido.";
    if (!emailRegex.test(form.email)) return "Email inválido.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    fetch(
      `https://sistema-vendas-back.onrender.com/vendedores/vendedores/${cpf}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar vendedor");
        return res.json();
      })
      .then(() => {
        setSucesso("Vendedor atualizado com sucesso!");
        setTimeout(() => {
          navigate("/vendedores");
        }, 1000);
      })
      .catch(() => {
        setErro("Erro ao atualizar vendedor. Tente novamente.");
      });
  };

  return (
    <div className="novo-vendedor">
      <div className="header">
        <div className="rectangle-2"></div>

        <div className="group-1">
          <div className="frame-168">
            <img
              className="design-sem-nome-22-1"
              src="/design-sem-nome-22-10.png"
              alt="logo"
            />
            <div className="skin-clinic">Ana Scent</div>
          </div>
        </div>

        <div className="frame-189">
          <div className="frame-188">
            <div className="frame-184">
              <Link to="/" className="home2">
                Home
              </Link>
            </div>
            <div className="frame-185">
              <Link to="/clientes" className="clientes">
                Clientes
              </Link>
            </div>
            <div className="frame-186">
              <Link to="/produtos" className="produtos">
                Produtos
              </Link>
            </div>
            <div className="frame-187">
              <Link to="/vendas" className="vendas">
                Vendas
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="cadastrar-novo-vendedor">Editar Vendedor</div>

      <form onSubmit={handleSubmit}>
        <div className="frame-174">
          <div className="group-225">
            <label className="nome">Nome</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="group-227">
            <label className="cpf-cnpj">CPF</label>
            <input
              className="input"
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              disabled // não deixar editar o CPF se ele é a chave
            />
          </div>

          <div className="group-228">
            <label className="telefone">Telefone</label>
            <input
              className="input"
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="group-229">
            <label className="email">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="group-230">
            <label className="email">Comissão (%)</label>
            <input
              className="input"
              type="number"
              name="comissao_percentual"
              value={form.comissao_percentual}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          {erro && <div className="mensagem-erro">{erro}</div>}
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}

          <div className="botoes-container">
            <div className="cadastrar-butao2">
              <button
                type="button"
                className="cancelar"
                onClick={() => navigate("/vendedores")}
              >
                Cancelar
              </button>
            </div>

            <div className="cadastrar-butao">
              <button type="submit" className="cadastrar-vendedor">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditarVendedor;
