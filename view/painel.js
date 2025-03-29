
var RESPOSTA_FILTRO = {};
var MATERIAIS_SELECIONADOS = [];
const URI_MOVIMENTACAO = '/movimentacao';
const URI_PROFESSORES = '/professores';
const URI_MATERIAL = '/material';
const URI_TIPOS_MOVIMENTACAO = '/tipoMovimentacao';
const URI_ULTIMOID = "/nextid";
const URI_ATUALIZAR = '';
const URI_SUBTRACAO = '';

let MATERIAL_JSON = {};
let url = "";
var tipo = 0;
const tipoEntrada=0;
let descricao_global = "";

// Elementos do DOM
const numMovimentacao = document.getElementById("numero-movimentacao");
const dataInput = document.getElementById("data");
const horaInput = document.getElementById("hora");
const cboProfessor = document.getElementById("cboProfessor");
const obv = document.getElementById("observacao");
const tipoMovimentacaoSelect = document.getElementById("tipo-movimentacao");
const materialSelect = document.getElementById("material");
const materialSearch = document.getElementById("material-search");
const quantidadeInput = document.getElementById("quantidade");
const listaMovimentacoes = document.getElementById("listaMovimentacoes");
const pesquisarmaterial = document.getElementById("pesquisarmaterial");
const tbl_material = document.getElementById("resultados");
const cboMaterial = document.getElementById("cbomaterial");


let currentId = parseInt(sessionStorage.getItem('currentId')) || 0;

// Função para preencher automaticamente os campos de data e hora com os valores atuais
function preencherDataHora() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const dataAtual = `${ano}-${mes}-${dia}`;
  const horaAtual = `${horas}:${minutos}`;
  dataInput.value = dataAtual;
  horaInput.value = horaAtual;
}

// Preencher os campos de data e hora na inicialização
preencherDataHora();

// Função para buscar dados do servidor e preencher os selects
async function fetchDados() {
  await fetchProfessores();
  await fetchTiposMovimentacao();
  //cadastrar();
}

// Função para buscar os dados dos professores
async function fetchProfessores() {
  try {
    const response = await fetch(URI_PROFESSORES, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    if (data.status) {
      cboProfessor.innerHTML = ''; // Limpa o select antes de adicionar novos itens
      data.dados.forEach(professor => {
        const option = document.createElement("option");
        option.value = professor.registro;
        option.textContent = professor.nome;
        cboProfessor.appendChild(option);
      });
    } else {
      showNotification('Falha ao carregar professores', 'error');
    }
  } catch (error) {
    console.error('Erro:', error);
    showNotification('Erro ao carregar professores', 'error');
  }
}



/* Função para buscar os dados dos tipos de movimentação
async function fetchTiposMovimentacao() {
  try {
    const response = await fetch(URI_TIPOS_MOVIMENTACAO , {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    //console.log("teste:::::::",data )
    if (data.status) {
      data.dados.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.idtipo;
        switch (option.value) {
          case '1':
            option.textContent = 'Entrada';
            break;
          case '2':
            option.textContent = 'Saída';
            break;
          case '3':
            break;
          case '4':
            break;
          default:
            alert('Tipo inválido.');
            return;
        }
      });
    } else {
      showNotification('Falha ao carregar tipos de movimentação', 'error');
    }
  } catch (error) {
    console.error('Erro:', error);
    showNotification('Erro ao carregar tipos de movimentação', 'error');
  }
  tipoMovimentacaoSelect.innerHTML = '';
}*/

/*async function fetchTiposMovimentacao() {
  const tipoMovimentacaoSelect = document.getElementById('tipo-movimentacao');
  tipoMovimentacaoSelect.innerHTML = ''; 
  try {
    const response = await fetch(URI_TIPOS_MOVIMENTACAO, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    if (data.status) {
      data.dados.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.idtipo;
        option.textContent = tipo.tipoEntrada;
        tipoMovimentacaoSelect.appendChild(option); 
      });
    } else {
      showNotification('Falha ao carregar tipos de movimentação', 'error');
    }
  } catch (error) {
    console.error('Erro:', error);
    showNotification('Erro ao carregar tipos de movimentação', 'error');
  }
}

async function atualizarQuantidade(idMaterial, quantidade, idMovimentacao) {
  try {
    const response = await fetch('/atualizarQuantidade', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({ quantidade, codigoMaterial: idMaterial, idMovimentacao })
    });

    const data = await response.json();
    if (data.status) {
      console.log('Quantidade atualizada com sucesso');
    } else {
      console.error('Erro ao atualizar quantidade:', data.message);
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}*/



async function fetchTiposMovimentacao() {
  const tipoMovimentacaoSelect = document.getElementById('tipo-movimentacao');
  tipoMovimentacaoSelect.innerHTML = '';

  tipoMovimentacaoSelect.addEventListener('change', function() {
    tipo = parseInt(tipoMovimentacaoSelect.value, 10); // Converte para inteiro
    console.log('Tipo selecionado: ' + tipo);
  });

  try {
    const response = await fetch(URI_TIPOS_MOVIMENTACAO, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    const data = await response.json();

    if (data.status) {
      data.dados.forEach(tipo => {
        const option = document.createElement("option");
        option.value = tipo.idtipo;

        switch (tipo.tipoEntrada) {  
         // Alterado para usar tipoEntrada
         case 1:
          tipo = 1;  // Atualizar a variável global 'tipo'
          option.textContent = 'Entrada';
          break;
        case 2:
          tipo = 2;  // Atualizar a variável global 'tipo'
          option.textContent = 'Saída';
          break;
        case 3:
          tipo = 3;  // Atualizar a variável global 'tipo'
          option.textContent = 'Devolução';
          break;
        case 4:
          tipo = 4;  // Atualizar a variável global 'tipo'
          option.textContent = 'Empréstimo';
          break;
        default:
          alert('Tipo inválido.');
          return;
        }
        
        //tipo = tipo.tipoEntrada;

        tipoMovimentacaoSelect.appendChild(option);
      });
    } else {
      showNotification('Falha ao carregar tipos de movimentação', 'error');
    }
  } catch (error) {
    console.error('Erro:', error);
    showNotification('Erro ao carregar tipos de movimentação', 'error');
  }
}


async function getUltimoId() {
  try {
    const response = await fetch(URI_ULTIMOID, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    const data = await response.json();

    console.log("Resposta da API:", data);

    if (data.status) {
      const ultimoId = data.dados[0].ultimoId;
      console.log("Último ID:", ultimoId);
      numMovimentacao.value = ultimoId; // Atribui o último ID ao campo de movimentação
    } else {
      showNotification('Falha ao carregar o id', 'error');
    }
  } catch (error) {
    console.error('Erro:', error);
    showNotification('Erro ao carregar id', 'error');
  }
}


// Função para mostrar notificações flutuantes
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerText = message;
  document.body.appendChild(notification);

  // Exibe a notificação
  setTimeout(() => {
    notification.classList.add('show');
  }, 200); 

  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 500); 
  }, 3000);
}


function limparFormulario() {
  // Limpar campos de texto
  document.getElementById('observacao').value = '';
  quantidadeInput.value = '';
  listaMovimentacoes.innerHTML = '';
  materialSearch.value = '';
  numMovimentacao.value = '';

  // Preencher novamente data e hora
  preencherDataHora();
}

function validarObservacao(observacao) {
  const sqlInjectionPattern = /(DELETE|DROP|UPDATE|INSERT|--)/i;

  // Testa se a observação contém qualquer padrão de injeção SQL
  return !sqlInjectionPattern.test(observacao);
}

/*
async function pesquisarMaterial() {
  try {
    const valorDigitado = document.getElementById("material-search").value;
    const response = await fetch(URI_MATERIAL + '/' + valorDigitado, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
    RESPOSTA_FILTRO = await response.json();
    if (RESPOSTA_FILTRO.status) {
      // Limpa o select antes de adicionar novos itens
      RESPOSTA_FILTRO.dados.forEach(material => {
        const option = document.createElement("option");
        option.value = material.codigo;
        option.textContent = material.codigo + "|" + material.descricao + "| Quantidade no estoque: " + material.quantidadeAtual;
        cboMaterial.appendChild(option);
      });
    } else {
      //showNotification('Falha ao encontrar material', 'error');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}*/

async function pesquisarMaterial(event) {
  const cboMaterial = document.getElementById("cbomaterial");
  if (event.key === "Enter") {
    cboMaterial.innerHTML = ""; 

    console.log("pesquisarMaterial()");
    try {
      const valorDigitado = document.getElementById("material-search").value;
      const tipoPesquisa = document.getElementById("material").value;

      switch (tipoPesquisa) {
        case '1':
          url = `/material/codigo_mat/${valorDigitado}`;
          break;
        case '2':
          url = `/material/tipo/${valorDigitado}`;
          break;
        case '3':
          url = `/material/numeroBP/${valorDigitado}`;
          break;
        case '4':
          url = `/material/descricao/${valorDigitado}`;
          break;
        case '5':
          url = `/material/observacao/${valorDigitado}`;
          break;
        default:
          alert('Tipo de pesquisa inválido.');
          return;
      }
      console.log("fetch: " + url);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });

      RESPOSTA_FILTRO = await response.json();
      console.log("<<<<",RESPOSTA_FILTRO);

      if (RESPOSTA_FILTRO.status) {
        const cboMaterial = document.getElementById("cbomaterial");
        //cboMaterial.innerHTML = ''; 

        RESPOSTA_FILTRO.dados.forEach(material => {
          const option = document.createElement("option");
          option.value = material.codigo;
          option.textContent = material.codigo + " | " + getDescricaoByCodigoMaterial(material.codigo) + " | Quantidade no estoque: " + material.quantidadeAtual;
          // alert("pesquisa"+ getDescricaoByCodigoMaterial(material.codigo));
          cboMaterial.appendChild(option);
          descricao_global = getDescricaoByCodigoMaterial(material.codigo);
        });


      } else {
        showNotification('Falha ao encontrar material', 'error'); 
      }
    } catch (error) {
      console.error('Erro:', error);
      showNotification('Erro na pesquisa do material', 'error');
    }

  }

}

function getDescricaoByCodigoMaterial(codigo){

  for (const item of RESPOSTA_FILTRO.dados) {
    if (item.codigo === codigo) {
        console.log(`Descrição: ${item.descricao}`);
        return item.descricao;
        return; // Sai da função após encontrar e imprimir a descrição
    }
  }
  
}

// Função para adicionar uma movimentação na tabela
// Quando adicionar a tabela limpar o 
function btnAdd() {
  const tableWrapper = document.querySelector('.table-wrapper');
  const codigo_mat = document.getElementById('cbomaterial').value;
  const quantidade = quantidadeInput.value;
  const tipo_movimentacao = document.getElementById('tipo-movimentacao');
  const numero_movimentacao = document.getElementById("numero-movimentacao");

  let materialExistente = MATERIAIS_SELECIONADOS.find(mat => mat.codigo_mat === codigo_mat);

  if (materialExistente) {
    // Atualizar quantidade conforme o tipo de movimentação
    if (tipo === 1 || tipo === 3) {
      materialExistente.qtd += quantidade; 
      somarDados(codigo_mat, quantidade);  
    } else if (tipo === 2 || tipo === 4) {
      if (materialExistente.qtd >= quantidade) {  
        materialExistente.qtd -= quantidade; 
        subDados(codigo_mat, quantidade);    
      } else {
        alert("Quantidade insuficiente para saída!");
        return;
      }
    }
    const tabelaResultados = document.getElementById('resultados');
    for (let i = 0; i < tabelaResultados.rows.length; i++) {
      let row = tabelaResultados.rows[i];
      if (row.cells[0].textContent === codigo_mat) {
        row.cells[2].textContent = materialExistente.qtd;  // Atualiza a quantidade na tabela
      }
    }
  } else {
  RESPOSTA_FILTRO.dados.forEach(item => {
 
    const option = document.createElement("option");
    if (item.codigo == codigo_mat) {

      MATERIAIS_SELECIONADOS.push({
        'codigo_mat': codigo_mat,
        'qtd': quantidadeInput.value,
        'tipo_movimentacao': tipo_movimentacao.value,
        'numero-movimentacao':numero_movimentacao.value
        }
      );
      console.log(MATERIAIS_SELECIONADOS);
    }
  });


      // Adicionar o material à tabela de resultados
      const tabelaResultados = document.getElementById('resultados');
      const novaLinha = tabelaResultados.insertRow();
      const celulaCodigo = novaLinha.insertCell(0);
      const celulaDescricao = novaLinha.insertCell(1);
      const celulaTipo = novaLinha.insertCell(2);

      celulaCodigo.textContent = codigo_mat;
      celulaDescricao.textContent = descricao_global;
      // alert("botao" +  descricao_global);
      celulaTipo.textContent = quantidade;

      /* Chamar funções para atualizar o estoque no banco
      if (tipo === 1 || tipo === 3) {
        somarDados(codigo_mat, quantidade);  // Atualiza no banco (somar)
      } else if (tipo === 2 || tipo === 4) {
        subDados(codigo_mat, quantidade);    // Atualiza no banco (subtrair)
      }*/
    }

  // Limpar os campos de pesquisa e seleção de material
  cboMaterial.innerHTML = '';
  materialSearch.value = '';

  
  if (!quantidade) {
    showNotification("Insira a quantidade!", 'error');
  } else {
    quantidadeInput.value = '';
  }
  tableWrapper.style.display = 'block';
}

// Função para cadastrar a movimentação
async function cadastrar() {
  console.log("cadastrar()");
  const idMovimentacao = numMovimentacao.value;
  const data = dataInput.value;
  const hora = horaInput.value;
  const observacao = obv.value.trim();
  const tipoMovimentacao = tipoMovimentacaoSelect.value;
  const idProfessor = cboProfessor.value;


  // Verificação de campos obrigatórios
  if (!idMovimentacao || !data || !hora || !tipoMovimentacao || !idProfessor) {
      showNotification('Todos os campos (exceto observação) devem ser preenchidos!', 'error');
      return;
  }
  
  // Validar a observação para bloquear palavras proibidas
  if (!validarObservacao(observacao)) {
    showNotification('Observação contém palavras proibidas. Corrija o texto.', 'error');
    return; 
  } 

  // Verifica se há materiais selecionados
  if (MATERIAIS_SELECIONADOS.length === 0) {
    showNotification('Nenhum material selecionado para movimentação!', 'error');
    return;
  }

  // Verifica se há mais de um material selecionado
  if (MATERIAIS_SELECIONADOS.length > 1) {
    showNotification("Movimentação cadastrada com sucesso!", 'success');
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  const codigo_mat = document.getElementById('cbomaterial').value;
  const tipo_movimentacao = document.getElementById('tipo-movimentacao');
  if (MATERIAIS_SELECIONADOS == 0 ){
     MATERIAIS_SELECIONADOS.push({
      "codigo_mat" : codigo_mat,
      "quantidade" : quantidadeInput.value,
      "tipo_movimentacao": tipo_movimentacao.value
     });
  }

  const dadosMovimentacao = {
      idMovimentacao:idMovimentacao,
      data: data,
      hora:hora,
      observacao_mov: observacao,
      tipoMovimentacao_idTipoMovimentacao: {
          idTipoMovimentacao: tipoMovimentacao
      },
      professor_registro: idProfessor,
      MATERIAIS_SELECIONADOS
  };

  console.log(dadosMovimentacao);


  try {
    console.log("fetch: /" + URI_MOVIMENTACAO);
      const response = await fetch(URI_MOVIMENTACAO, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
          },
          body: JSON.stringify(dadosMovimentacao)
      });
      const data = await response.json();
      if (data.status) {
          showNotification('Movimentação cadastrada com sucesso!', 'success');
          setTimeout(() => {
           location.reload();
          }, 1000);
      } else {
         showNotification('Erro ao cadastrar movimentação', 'error');
      }
  } catch (error) {
      console.error('Erro:', error);
      showNotification('Erro ao cadastrar movimentação', 'error');
  }

  // Continuar com o fluxo de cadastro se houver apenas um material selecionado
  if (MATERIAIS_SELECIONADOS.length > 0) {  // Verifique se o array não está vazio
    const material = MATERIAIS_SELECIONADOS[0];  // Pegue o primeiro material
    const codigo_mat = material.codigo_mat;
    const quantidade = material.qtd;

    ///////////////////alert("codigo" + codigo_mat + "qtd: " + quantidade)

    console.log("Material a ser atualizado:", material);

    // Atualizar quantidade no banco de dados
    console.log("TIPO -------------------------------------------- " + tipo);
    
    /*let materialExistente = MATERIAIS_SELECIONADOS.find(mat => mat.codigo_mat === codigo_mat);
    alert("existe: " + materialExistente)
    if (materialExistente) {
        console.log("Material encontrado:", materialExistente);*/
        if (tipo === 1 || tipo === 3) {
            return;
        } else if (tipo === 2 || tipo === 4) {
            return;    
        }
    } else {
        console.error("Material não encontrado ou quantidade insuficiente.");
    }




    // Marcar o material como atualizado
    material.atualizado = true;

    // Limpar seleção após o cadastro
    //MATERIAIS_SELECIONADOS = [];
    limparTabela();
    getUltimoId();
  }


// Evento de pesquisa de materiais
materialSearch.addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const options = materialSelect.options;

  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const optionText = option.textContent.toLowerCase();
    option.style.display = optionText.includes(searchTerm) ? '' : 'none';
  }
});

function materialSearch_onkeyup() {
  let filtro = materialSearch.value;
  construirTabela(filtro);
}

function limparTabela() {
  var qtdLinhas = 1;
  var totalLinhas = tbl_material.rows.length;
  for (var i = qtdLinhas; i < totalLinhas; i++) {
    tbl_material.deleteRow(qtdLinhas);
  }
}

function construirTabela(filtro) {
  limparTabela();
  const material = MATERIAL_JSON;

  for (let materiais of material) {
    if (filtro != null) {
      let codigo_mat = materiais.codigo_mat
      codigo_mat = codigo_mat.toLowerCase();
      filtro = filtro.toLowerCase();
      let result = codigo_mat.includes(filtro);
      if (result == false) {
        continue;
      }
    }
    let descricao = materiais.descricao;


    const linha = document.createElement("tr");
    const colunaCodigo = document.createElement("td");
    const colunaDescricao = document.createElement("td");
    const colunaTipo = document.createElement("td");
    

    linha.appendChild(colunaCodigo);
    linha.appendChild(colunaDescricao);
    linha.appendChild(colunaTipo);

    tbl_material.appendChild(linha);

  }
}



// Inicializar fetch de dados
fetchDados();
getUltimoId();

cadastrar();
