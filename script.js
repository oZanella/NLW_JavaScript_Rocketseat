const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = 'Bem vindo ao aplicativo de metas';

let meta = {
  value: 'Agua todo dia',
  checked: false,
}

let metas = [meta]

const cadMeta = async () => {
  const meta = await input({ message: 'Digite sua meta:' })

  if (meta.length == 0) {
    mensagem = 'A meta não deve ser vazia'
    return
  }

  metas.push(
    { value: meta, checked: false }
  )

  mensagem = 'Meta cadastrada com sucesso!'
}

const listarMetas = async () => {

  if (metas.length == 0) {
    mensagem = 'Nenhuma meta está disponível para listar'
    return
  }

  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, espaço para marcar/desmarcar e enter para confirmar",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => {
    m.checked = false
  })

  if (respostas.ength == 0) {
    mensagem = 'Nenhuma meta selecionada'
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  mensagem = 'Meta(s) foram atualizada(s)'
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if (realizadas.length == 0) {
    mensagem = 'Não existe metas realizadas :('
    return
  }

  await select({
    message: 'Metas realizadas: ' + realizadas.length,  //concatenação para número de metas
    choices: [...realizadas]
  })

}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true       //pode ser usado apenas !meta.checkd, funciona igual
  })

  if (abertas.length == 0) {
    mensagem = 'Não existem metas abertas! :)'
    return
  }

  await select({
    message: 'Metas Abertas: ' + abertas.length,      //concatenação para número de metas
    choices: [...abertas]
  })
}

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false }
  })

  const itensDeletar = await checkbox({
    message: 'Selecione item para deletar',
    choices: [...metasDesmarcadas],
    instructions: false,
  })

  if (itensDeletar.length == 0) {
    mensagem = 'Nenhum item para deletar'
    return
  }

  itensDeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })

  })

  mensagem = 'Meta(s) deleta(s) com sucesso!'
}

const motrarMensagem = () => {
  console.clear();

  if (mensagem != '') {
    console.log(mensagem)
    console.log('')
    mensagem = ''
  }
}

//menu visível
const start = async () => {

  while (true) {
    motrarMensagem()

    const opcao = await select({
      message: 'Menu >',
      choices: [
        {
          name: 'Cadastrar meta',
          value: 'cadastrar'
        },
        {
          name: 'Listar metas',
          value: 'listar'
        },
        {
          name: 'Metas realizadas',
          value: 'realizadas'           //mesmo nome do case dentro do switch
        },
        {
          name: 'Metas abertas',
          value: 'abertas'           //mesmo nome do case dentro do switch
        },
        {
          name: 'Deletar Metas',
          value: 'deletar'           //mesmo nome do case dentro do switch
        },
        {
          name: 'Sair',
          value: 'sair'
        }
      ]
    })

    switch (opcao) {
      case 'cadastrar':
        await cadMeta()
        break
      case 'listar':
        await listarMetas()
        break
      case 'realizadas':
        await metasRealizadas()
        break
      case 'abertas':
        await metasAbertas()
        break
      case 'deletar':
        await deletarMetas()
        break
      case 'sair':
        console.log('Até a próxima! :)')
        return
    }
  }
}

start()