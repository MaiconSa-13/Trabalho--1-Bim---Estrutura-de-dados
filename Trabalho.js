//Declarando um vetor global para armazenar os cadastros dso alunos
var cadastros=[ ]

//Criando uma função para chamar as demais funções, de acoordo com o número que o usuário indforme
function funOpcao(){
  numOpc=Number(document.getElementById("opcao").value); //Recebendo o número(opção) inserida pelo usuário

  //Switch case para chamar a função escolhida pelo usuário
  if(numOpc <1 || numOpc >4){ //Verificando se a opção/número é valida
    alert("Por favor, digite uma opção válida!!")
  }else{
    switch(numOpc){ //Entrando no switch case
      case 1:
        console.log("Cadastramentos de alunos")
        cadastrar(cadastros)
        break;
      case 2:
        console.log("Relatório de cadastros em ordem crescente por nome")
        relatNomes(cadastros) //Chamando função paracriar e mostrar um relatório com nomes em ordem crescentes
        break;
      case 3:
        console.log("Relatório de cadastros de alunos em ordem decrescente por RA")
        ordemDescrescenteRA(cadastros) //Chamando funçao para criar e mostrar relatório de alunos em ordem decrescente por RA 
        break;
      case 4:
        console.log("Relatório de alunos aprovados em ordem crescente por nome")
        crescenteAlunosAprovados(cadastros) //Chamando função para criar mostrar relatório de alunos aprovados em ordem crescente por nome
        break;
    }
  }
}


//Função para receber dados para preencher o vetor de objetos cadastros
function cadastrar(vetor){
    //Reebendo os dados inseridos pelo usuario
    //Declarando variáveis
    let NOME = "";
    let RA = "";
    let IDADE = 0;
    let SEXO = "";
    let MEDIA = 0;
    let RESULTADO = "" 
    let continuar="";
    let objCadastros={}//criando objeto para ser preenchido
    do{
          //Recebendo os dados dos alunos para realizar os cadastros--
          NOME=prompt("Digite o Nome: ")
          while(NOME === ""){ //Não deixando inserir dado errado  
            NOME = prompt("Digite um nome válido: ")
          }
          RA=Number(prompt("Digite o RA: "))
          while(RA === ""){ //Não deixando inserir dado errado  
            RA = Number(prompt("Digite um RA válido: "))
          }
          IDADE=Number(prompt("Digite a idade: "))
          while(isNaN(IDADE) || IDADE  <0){ //Não deixando inserir dado errado  
            IDADE = Number(prompt("Digite uma idade válida: "))
          }
          SEXO=prompt("Digite o sexo: ")
          while(SEXO === ""){ //Não deixando inserir dado errado  
            SEXO = prompt("Digite um sexo válido: ")
          }
          MEDIA=Number(prompt("Digite a Média: "))
          while(isNaN(MEDIA) || MEDIA < 0 || MEDIA > 10){ //Não deixando inserir dado errado  
            MEDIA = Number(prompt("Digite uma média válida: "))
          }
          RESULTADO=prompt("Digite o Resultado: ")
          while(RESULTADO === "" || RESULTADO.toLowerCase() !=="Aprovado".toLowerCase() && RESULTADO.toLowerCase() !== "Reprovado".toLowerCase() ){
            RESULTADO = prompt("Digite um resultado válida:") //Não deixando inserir dado errado  
          }
          //Formatando a entrada dos resultados, colocando a primeira letra do resultado inserido em maiúsculo
          RESULTADO=  RESULTADO[0].toUpperCase() + RESULTADO.substr(1).toLowerCase() 
          //Inserindo dados no objCadastros
          objCadastros= {
              "NOME": NOME,
              "RA" : RA,
              "IDADE" : IDADE,
              "SEXO" : SEXO,
              "MEDIA" : MEDIA,
              "RESULTADO": RESULTADO
          }
          //inserindo objeto com os dados de cadastro no vetor
          vetor.push(objCadastros)
          console.log("Vetor - ",vetor)
          continuar=prompt("Deseja encerrar a execução do progama?(S)-SIM / (N)-NÃO")
          continuar=continuar.toUpperCase() 
    }while(continuar !== "S")
    return vetor;
}


//Função de ordenação0
function quickSort(vetor, fnComp, ini = 0, fim = vetor.length - 1){
  if(fim <= ini) return //caso se estivere feitas todas as comparações

  const pivot = fim  //Defime o pivot como último valor do vetor 
  let div = ini - 1 // Div é usado para colocar valores menores ou iguais ao pivô à esquerda

  //Laço for para fazer as comparações entre os elementos do vetor com o pivot 
  for(let i = ini; i < fim; i++){
      //verifica  se o valor do vetor[i] é menor ou igual ao valor pivot
      if(fnComp(vetor[pivot] , vetor[i])){
          div++ //Avançando o valor de div (div recebe div+1)
          if(div !== i){ //se div for diferente de i faz as trocas 
              [ vetor[i], vetor[div] ] = [  vetor[div],  vetor[i] ] //trocando a o  valor do vetor[i] com o valor do vetor[div]
            
          }
      }
  }
  div++ //Avançando o valor de div (div recebe div+1)
  
  if(fnComp(vetor[div] , vetor[pivot]) && div !== pivot){ //Para colocar o vetor[pivot]no meio do vetor
      [ vetor[div], vetor[pivot] ] = [ vetor[pivot], vetor[div] ] //trocando os valore de vetor[div] com o vetor[pivo]
  }

  quickSort(vetor, fnComp, ini, div - 1) //Chama recursivo para ordenar valores a esquerda
  quickSort(vetor, fnComp, div + 1, fim) //Chama recursivo para ordenar valores a direita

  return vetor;
}



//função gerar relatório de alunso por ordem crescente
function relatNomes(vetor){

    //declarando variavel que vai reeceber o relatório
    let relatNomeCresc =""

    //Chamando função de  quickSort para ordenar o vetor de objetos em ordem crescente por nome
    quickSort(vetor,
      (elem1, elem2) => elem1.NOME > elem2.NOME)
    
    //Criando laço For para gerar o relatório 
    for (let i =0; i<vetor.length; i++){
        relatNomeCresc+="Nome: " + vetor[i].NOME+" RA: "+vetor[i].RA + " Idade: "+vetor[i].IDADE + " Sexo: "+vetor[i].SEXO+" Média: "+ vetor[i].MEDIA +" Resultado: " +vetor[i].RESULTADO+"<br>"
    }

    console.log("Relatorio")
    console.log(relatNomeCresc)

    //Saída de dados  
    document.getElementById("tituloRelatorio").innerHTML="Relatório de Alunos em ordem crescente por Nome"+"<br>"; //Mostranndo o título do relatório no HTML
    document.getElementById("relat").innerHTML= relatNomeCresc; //Mostrando o relatório no HTML

    return relatNomeCresc; //retornadno o reklatório
}

//Função gerar relatório de alunso por ordem decrescente por RA
function ordemDescrescenteRA(vetor){
  //declarando variaveis
  var relatDecresRA="" //criando variavel para armazenar o relatório 

  //chamando funçaõ quickSort para Ordenar o vetor de objetos em ordem decrescente por RA
  quickSort(vetor,
    (elem1, elem2) => elem1.RA < elem2.RA)
  
  
   console.log("Vetor==== ", vetor)
    
  //Criadno laço for para gerar orelatório de alunos por ordem decrescenet de RA
   for(i=0; i<vetor.length;i++){
     relatDecresRA+="Nome: " + vetor[i].NOME+" RA: "+vetor[i].RA + " Idade: "+vetor[i].IDADE + " Sexo: "+vetor[i].SEXO+" Média: "+ vetor[i].MEDIA +" Resultado: " +vetor[i].RESULTADO+"<br>"
   }
   console.log("====================== Relatorio de ordem decrescente por RA ====================== ") 
   console.log(relatDecresRA)

   //Saída de daddos 
   document.getElementById("tituloRelatorio").innerHTML="Relatório de Alunos em ordem decrescente por RA"+"<br>"; //Mostranndo o título do relatório no HTML 
   document.getElementById("relat").innerHTML= relatDecresRA; //Mostrando o relatório no HTML

   return relatDecresRA; //retornadno o reklatório
}

//Funçao para ordenação por nomes em ordem crescente, mas  somente aprovados
function crescenteAlunosAprovados(vetor){
 // declarando vetor que vai receber o relatório em ordem crescente por nome dos alunos aprovados
  let relatOrdemAprovados=" "

  //Chamando função quickSort para ordenar o vetor de objetos em ordem crescente por nome 
  quickSort(vetor,
    (elem1, elem2) => elem1.NOME > elem2.NOME)
  
  //Criando laço para filtar os alunos aprovados, gerar orelat´rios destes alunos   
  for (i=0; i<vetor.length; i++){
    if(vetor[i].RESULTADO === "Aprovado"){ //verificando se o Aluno foi Aprovado 
      //Gerando o relatório dos Alunos Aprovados
      relatOrdemAprovados+= "Nome: " + vetor[i].NOME+" RA: "+vetor[i].RA + " Idade: "+vetor[i].IDADE + " Sexo: "+vetor[i].SEXO+" Média: "+ vetor[i].MEDIA +" Resultado: " +vetor[i].RESULTADO+"<br>" 
    }
  }

  console.log("====================== Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados.====================== ") 
  console.log(relatOrdemAprovados)

  //Saída de dados
  document.getElementById("tituloRelatorio").innerHTML="Relatório de Alunos em ordem crescente por Nome, apenas Aprovados"+"<br>";  //Mostranndo o título do relatório no HTML
  document.getElementById("relat").innerHTML= relatOrdemAprovados; //Mostrando o relatório no HTML

  return relatOrdemAprovados; //retornadno o reklatório
}





