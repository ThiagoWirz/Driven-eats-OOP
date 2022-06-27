let pratoSelecionado = null;
let bebidaSelecionada = null;
let sobremesaSelecionada = null;

const btnConfirmar = document.querySelector(".confirmar");
const btnCancelar = document.querySelector(".cancelar");
const btnPedir = document.querySelector(".fazer-pedido");

class Produto {
  constructor({ nome, imagem, descricao, preco, tipo }) {
    this.nome = nome;
    this.imagem = imagem;
    this.descricao = descricao;
    this.preco = preco;
    this.tipo = tipo;
  }

  selecionar(elemento) {
    const selecionado = document.querySelector(`.${this.tipo} .selecionado`);
    if (selecionado !== null) {
      selecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    this.tipo === "prato" &&
      (pratoSelecionado = {
        nome: this.nome,
        preco: this.preco,
      });

    this.tipo === "bebida" &&
      (bebidaSelecionada = {
        nome: this.nome,
        preco: this.preco,
      });

    this.tipo === "sobremesa" &&
      (sobremesaSelecionada = {
        nome: this.nome,
        preco: this.preco,
      });

    this.verificarPedido();
  }

  getView() {
    const view = document.createElement("div");
    view.classList.add("opcao");
    view.addEventListener("click", () => {
      this.selecionar(view);
    });
    view.innerHTML = `
        <img src="${this.imagem}" />
        <div class="titulo">${this.nome}</div>
        <div class="descricao">${this.descricao}</div>
        <div class="fundo">
            <div class="preco">R$ ${this.preco.toFixed(2)}</div>
            <div class="check">
                <ion-icon name="checkmark-circle"></ion-icon>
            </div>
        </div>
    `;

    return view;
  }

  verificarPedido() {
    if (pratoSelecionado && bebidaSelecionada && sobremesaSelecionada) {
      btnPedir.classList.add("ativo");
      btnPedir.disabled = false;
      btnPedir.innerHTML = "Fazer pedido";
    }
  }
}

const pratos = [
  new Produto({
    nome: "Estrombelete de Frango",
    imagem: "img/frango_yin_yang.png",
    descricao: "Um pouco de batata, um pouco de salada",
    preco: 14.9,
    tipo: "prato",
  }),
  new Produto({
    nome: "Asa de Boi",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com molho shoyu",
    preco: 14.9,
    tipo: "prato",
  }),
  new Produto({
    nome: "Carne de Monstro",
    imagem: "img/frango_yin_yang.png",
    descricao: "Com batata assada e farofa",
    preco: 14.9,
    tipo: "prato",
  }),
];

const bebidas = [
  new Produto({
    nome: "Coquinha gelada",
    imagem: "img/coquinha_gelada.png",
    descricao: "Lata 350ml",
    preco: 4.9,
    tipo: "bebida",
  }),
  new Produto({
    nome: "Caldo de Cana",
    imagem: "img/coquinha_gelada.png",
    descricao: "Copo 600ml",
    preco: 4.9,
    tipo: "bebida",
  }),
  new Produto({
    nome: "Corote Gelado",
    imagem: "img/coquinha_gelada.png",
    descricao: "Garrafa 400ml",
    preco: 4.9,
    tipo: "bebida",
  }),
];

const sobremesas = [
  new Produto({
    nome: "Pudim",
    imagem: "img/pudim.png",
    descricao: "Gosto de doce de leite",
    preco: 7.9,
    tipo: "sobremesa",
  }),
  new Produto({
    nome: "Flam",
    imagem: "img/pudim.png",
    descricao: "Gosto de chocolate",
    preco: 7.9,
    tipo: "sobremesa",
  }),
  new Produto({
    nome: "Brigadeiro",
    imagem: "img/pudim.png",
    descricao: "3 unidades",
    preco: 7.9,
    tipo: "sobremesa",
  }),
];

function getPrecoTotal() {
  return (
    pratoSelecionado.preco +
    bebidaSelecionada.preco +
    sobremesaSelecionada.preco
  );
}

function confirmarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.remove("escondido");

  document.querySelector(".confirmar-pedido .prato .nome").innerHTML =
    pratoSelecionado.nome;
  document.querySelector(".confirmar-pedido .prato .preco").innerHTML =
    pratoSelecionado.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .bebida .nome").innerHTML =
    bebidaSelecionada.nome;
  document.querySelector(".confirmar-pedido .bebida .preco").innerHTML =
    bebidaSelecionada.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .sobremesa .nome").innerHTML =
    sobremesaSelecionada.nome;
  document.querySelector(".confirmar-pedido .sobremesa .preco").innerHTML =
    sobremesaSelecionada.preco.toFixed(2);

  document.querySelector(".confirmar-pedido .total .preco").innerHTML =
    getPrecoTotal().toFixed(2);
}

function cancelarPedido() {
  const modal = document.querySelector(".overlay");
  modal.classList.add("escondido");
}

function enviarZap() {
  const telefoneRestaurante = 553299999999;
  const encodedText = encodeURIComponent(
    `Olá, gostaria de fazer o pedido: \n- Prato: ${
      pratoSelecionado.nome
    } \n- Bebida: ${bebidaSelecionada.nome} \n- Sobremesa: ${
      sobremesaSelecionada.nome
    } \nTotal: R$ ${getPrecoTotal().toFixed(2)}`
  );

  const urlWhatsapp = `https://wa.me/${telefoneRestaurante}?text=${encodedText}`;
  window.open(urlWhatsapp);
}

const pratosContainer = document.querySelector(".opcoes.prato");
pratos.forEach((prato) => pratosContainer.appendChild(prato.getView()));

const bebidasContainer = document.querySelector(".opcoes.bebida");
bebidas.forEach((bebida) => bebidasContainer.appendChild(bebida.getView()));

const sobremesasContainer = document.querySelector(".opcoes.sobremesa");
sobremesas.forEach((sobremesa) =>
  sobremesasContainer.appendChild(sobremesa.getView())
);

btnConfirmar.addEventListener("click", () => {
  enviarZap();
});

btnCancelar.addEventListener("click", () => {
  cancelarPedido();
});

btnPedir.addEventListener("click", () => {
  confirmarPedido();
});
