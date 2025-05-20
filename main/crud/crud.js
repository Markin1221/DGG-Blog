
(() => {
  // Variável que simula o usuário logado; para demo, altere aqui:
  const usuarioLogado = {
    nome: "Usuário Exemplo",
    admin: true // Defina false para testar comportamento sem admin
  };

  // Elementos DOM usados frequentemente
  const formulario = document.getElementById('formConta');
  const inputNome = document.getElementById('nome');
  const inputEmail = document.getElementById('email');
  const inputIsAdmin = document.getElementById('isAdmin');
  const botaoSalvar = document.getElementById('btnSalvar');
  const botaoCancelar = document.getElementById('btnCancelar');
  const listaContas = document.getElementById('listaContas');
  const usuarioLogadoSpan = document.getElementById('usuarioLogado');

  // Array para armazenar as contas (será preenchido do localStorage)
  let contas = [];

  // Variável para armazenar o índice da conta que está sendo editada (-1 significa modo adicionar)
  let indiceEditar = -1;

  // Exibe o nome do usuário logado na página
  usuarioLogadoSpan.textContent = usuarioLogado.nome + (usuarioLogado.admin ? " (Administrador)" : " (Usuário comum)");

  /**
   * Função para carregar contas do localStorage e atualizar a interface
   */
  function carregarContas() {
    const contasSalvas = localStorage.getItem('contas');
    contas = contasSalvas ? JSON.parse(contasSalvas) : [];
    atualizarTabela();
  }

  /**
   * Salva o array de contas no localStorage (em formato JSON)
   */
  function salvarContas() {
    localStorage.setItem('contas', JSON.stringify(contas));
  }

  /**
   * Atualiza a tabela de contas na interface com os dados atuais do array
   */
  function atualizarTabela() {
    // Limpa o conteúdo existente
    listaContas.innerHTML = '';

    // Percorre cada conta e adiciona uma linha na tabela
    contas.forEach((conta, index) => {
      const linha = document.createElement('tr');

      // Colunas de dados
      const tdNome = document.createElement('td');
      tdNome.textContent = conta.nome;
      linha.appendChild(tdNome);

      const tdEmail = document.createElement('td');
      tdEmail.textContent = conta.email;
      linha.appendChild(tdEmail);

      const tdAdmin = document.createElement('td');
      tdAdmin.textContent = conta.admin ? "Sim" : "Não";
      tdAdmin.className = conta.admin ? 'admin' : 'nao-admin';
      linha.appendChild(tdAdmin);

      // Coluna de ações: editar e deletar
      const tdAcoes = document.createElement('td');

      // Botão Editar, sempre disponível
      const btnEditar = document.createElement('button');
      btnEditar.textContent = "Editar";
      btnEditar.className = 'btn-editar';
      btnEditar.addEventListener('click', () => iniciarEdicao(index));
      tdAcoes.appendChild(btnEditar);

      // Botão Deletar, disponível somente para admins logados
      if (usuarioLogado.admin) {
        const btnDeletar = document.createElement('button');
        btnDeletar.textContent = "Deletar";
        btnDeletar.className = 'btn-deletar';
        btnDeletar.addEventListener('click', () => deletarConta(index));
        tdAcoes.appendChild(btnDeletar);
      }

      linha.appendChild(tdAcoes);
      listaContas.appendChild(linha);
    });

    // Se não existirem contas, pode-se mostrar uma linha informativa opcional (não implementada aqui)
  }

  /**
   * Função para adicionar uma conta nova
   */
  function adicionarConta() {
    // Cria objeto com os valores do formulário
    const novaConta = {
      nome: inputNome.value.trim(),
      email: inputEmail.value.trim(),
      admin: inputIsAdmin.checked
    };

    // Validação simples (já exigida pelo HTML), aqui só para garantir:
    if (!novaConta.nome || !novaConta.email) {
      alert("Por favor, preencha nome e e-mail.");
      return;
    }

    // Adiciona a nova conta no array
    contas.push(novaConta);

    // Salva e atualiza interface
    salvarContas();
    atualizarTabela();

    // Limpa formulário para próxima entrada
    formulario.reset();
  }

  /**
   * Inicia a edição de uma conta específica, carregando seus dados no formulário 
   * @param {number} indice índice da conta a editar
   */
  function iniciarEdicao(indice) {
    // Bloqueia edição se usuário não for admin
    if (!usuarioLogado.admin) {
      alert("Apenas administradores podem editar contas.");
      return;
    }

    const conta = contas[indice];
    inputNome.value = conta.nome;
    inputEmail.value = conta.email;
    inputIsAdmin.checked = conta.admin;
    indiceEditar = indice;

    // Atualiza botões do formulário: alterar texto e mostrar botão cancelar
    botaoSalvar.textContent = "Salvar Alteração";
    botaoCancelar.style.display = "inline-block";
  }

  /**
   * Função para salvar a edição feita no formulário
   */
  function salvarEdicao() {
    if (indiceEditar < 0 || indiceEditar >= contas.length) {
      alert("Índice para edição inválido.");
      return;
    }

    // Atualiza dados no array
    contas[indiceEditar].nome = inputNome.value.trim();
    contas[indiceEditar].email = inputEmail.value.trim();
    contas[indiceEditar].admin = inputIsAdmin.checked;

    // Salva localStorage e atualiza interface
    salvarContas();
    atualizarTabela();

    // Reseta modo edição
    indiceEditar = -1;
    botaoSalvar.textContent = "Adicionar";
    botaoCancelar.style.display = "none";
    formulario.reset();
  }

  /**
   * Função para deletar uma conta.
   * Apenas administradores podem deletar.
   * @param {number} indice índice da conta a deletar
   */
  function deletarConta(indice) {
    if (!usuarioLogado.admin) {
      alert("Apenas administradores podem deletar contas.");
      return;
    }

    // Confirmar exclusão para evitar acidentes
    const confirmado = confirm(`Deseja realmente deletar a conta: ${contas[indice].nome}?`);
    if (!confirmado) return;

    // Remove do array e atualiza interface e armazenamento
    contas.splice(indice, 1);
    salvarContas();
    atualizarTabela();

    // Caso estivesse editando esta conta, cancela edição
    if (indiceEditar === indice) {
      cancelarEdicao();
    }
  }

  /**
   * Função para cancelar o modo edição e resetar o formulário
   */
  function cancelarEdicao() {
    indiceEditar = -1;
    formulario.reset();
    botaoSalvar.textContent = "Adicionar";
    botaoCancelar.style.display = "none";
  }

  /**
   * Função que gerencia o envio do formulário tanto para adicionar quanto editar
   */
  function manipuladorEnvio(event) {
    event.preventDefault(); // Evita que formulário recarregue a página

    if (indiceEditar === -1) {
      adicionarConta();
    } else {
      salvarEdicao();
    }
  }

  /**
   * Inicialização - adiciona eventos e carrega dados existentes
   */
  function init() {
    formulario.addEventListener('submit', manipuladorEnvio);
    botaoCancelar.addEventListener('click', cancelarEdicao);
    carregarContas();
  }

  // Invoca a inicialização quando o script carregar
  init();
})();

function mostrarCadastro() {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");

  // some com o login com fadeOut
  loginForm.style.animation = "fadeOut 0.4s ease forwards";

  setTimeout(() => {
    loginForm.classList.remove("visivel");
    loginForm.classList.add("oculto");

    cadastroForm.classList.remove("oculto");
    cadastroForm.classList.add("visivel");
    cadastroForm.style.animation = "fadeIn 0.4s ease forwards";
  }, 400);
}

function mostrarLogin() {
  const loginForm = document.getElementById("login-form");
  const cadastroForm = document.getElementById("cadastro-form");

  // some com o cadastro com fadeOut
  cadastroForm.style.animation = "fadeOut 0.4s ease forwards";

  setTimeout(() => {
    cadastroForm.classList.remove("visivel");
    cadastroForm.classList.add("oculto");

    loginForm.classList.remove("oculto");
    loginForm.classList.add("visivel");
    loginForm.style.animation = "fadeIn 0.4s ease forwards";
  }, 400);
}
function entrar() {
  // Aqui você pode colocar validação se quiser
  window.location.href = "../index.html"; // Altere o nome conforme sua estrutura
}
