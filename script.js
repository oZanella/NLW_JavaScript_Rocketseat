const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: 'Agua todo dia',
  checked: false,
}

let metas = [meta]

const cadMeta = async () => {
  const meta = await input({ message: 'Digite sua meta:' })

  if (meta.length == 0) {
    console.log('A meta não deve ser vazia')
    return
  }

  metas.push(
    { value: meta, checked: false }
  )
}

const listarMetas = async () => {
  const respostas = await checkbox({
    message: "Use as setas para mudar de meta, espaço para marcar/desmarcar e enter para confirmar",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => {
    m.checked = false
  })

  if (respostas.length == 0) {
    console.log('Nenhuma meta selecionada')
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  console.log('Meta(s) foram atualizada(s)')
}

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if (realizadas.length == 0) {
    console.log('Não existe metas realizadas :(')
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
    console.log('Não existem metas abertas! :)')
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
    console.log('Nenhum item para deletar')
    return
  }

  itensDeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })

  })

  console.log('Meta(s) deleta(s) com sucesso!')
}

//menu visível
const start = async () => {

  while (true) {

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
        console.log(metas)
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