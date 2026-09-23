"use strict";

// Array de objetos: cada cadastro é salvo aqui durante a sessão.
const usuarios = [
  { nome: "Bia", idade: 22, email: "bia@miauexe.com" },
  { nome: "Rafa", idade: 63, email: "rafa@miauexe.com" }
];

const formulario = document.querySelector("#user-form");
const listaUsuarios = document.querySelector("#user-list");
const busca = document.querySelector("#search");
const resultadoIdade = document.querySelector("#age-result");
const mensagemStatus = document.querySelector("#status-message");
const contador = document.querySelector("#user-count");
const botaoOrdenar = document.querySelector("#sort-button");
const botaoRemover = document.querySelector("#remove-button");
const mascote = document.querySelector("#mascot");

// Arrow function com return: classifica a idade com if / else if / else.
const classificarIdade = (idade) => {
  if (idade <= 17) return "Menor de idade";
  else if (idade <= 59) return "Adulto";
  return "Idoso";
};

function renderizarUsuarios(lista) {
  contador.textContent = `${lista.length} ${lista.length === 1 ? "usuário" : "usuários"}`;

  if (lista.length === 0) {
    listaUsuarios.innerHTML = '<p class="empty-state">Nenhum humano encontrado. O gato está julgando em silêncio.</p>';
    return;
  }

  listaUsuarios.innerHTML = "";
  // Loop forEach e template string para criar os cartões via DOM.
  lista.forEach((usuario) => {
    listaUsuarios.innerHTML += `
      <article class="user-card">
        <h3>${usuario.nome}</h3>
        <p><strong>Idade:</strong> ${usuario.idade} anos · ${classificarIdade(usuario.idade)}</p>
        <p><strong>E-mail:</strong> ${usuario.email}</p>
      </article>`;
  });
}

function atualizarStatus(texto) {
  mensagemStatus.textContent = texto;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const nome = formulario.elements.name.value.trim();
  const idade = Number(formulario.elements.age.value);
  const email = formulario.elements.email.value.trim();
  const usuario = { nome, idade, email }; // objeto com string e number

  usuarios.push(usuario);
  resultadoIdade.textContent = `${nome} foi classificado(a) como: ${classificarIdade(idade)}.`;
  atualizarStatus("Cadastro concluído! Um gato foi informado.");
  formulario.reset();
  busca.value = "";
  renderizarUsuarios(usuarios);
});

botaoOrdenar.addEventListener("click", () => {
  usuarios.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  busca.value = "";
  renderizarUsuarios(usuarios);
  atualizarStatus("Lista ordenada por nome, de A a Z.");
});

botaoRemover.addEventListener("click", () => {
  const removido = usuarios.pop();
  renderizarUsuarios(usuarios);
  atualizarStatus(removido ? `${removido.nome} foi removido(a) da lista.` : "A lista já está vazia.");
});

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase().trim();
  const usuariosFiltrados = usuarios.filter((usuario) => usuario.nome.toLowerCase().includes(termo));
  renderizarUsuarios(usuariosFiltrados);
});

mascote.addEventListener("mouseover", () => {
  atualizarStatus("MIAU! Você ativou o evento mouseover. +10 de carinho!");
});

// Tipos de dados exibidos no console para a atividade.
const exemploTexto = "MiAU.exe";
const exemploNumero = 9;
const exemploBooleano = true;
console.log("typeof texto:", typeof exemploTexto);
console.log("typeof número:", typeof exemploNumero);
console.log("typeof booleano:", typeof exemploBooleano);

renderizarUsuarios(usuarios);
