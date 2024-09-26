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

  if (respostas.length == 0) {
    console.log('Nenhuma meta selecionada')
    return
  }

  metas.forEach((m) => {
    m.checked = false
  })

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

 if(realizadas.length == 0) {
  console.log('Não existe metas realizadas :(')
  return
 }

 await select({
  message: 'Metas realizadas',
  choices: [...realizadas]
 })

}

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
      case 'sair':
        console.log('Até a próxima! :)')
        return
    }
  }
}

start()