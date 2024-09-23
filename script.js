const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
  value: 'Agua todo dia',
  checked: false,
}

let metas = [ meta ]

const cadMeta = async () => {
  const meta = await input({ message: 'Digite sua meta:' })

  if (meta.length == 0) {
    console.log('A meta não deve ser vazia')
  } else {
    console.log('Meta salva com sucesso!')
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

  respostas.forEach((resposta) => {
    const meta = metas.find((n) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  console.log('Meta(s) foram atualizada(s)')
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
        await listarMetas
        break
      case 'sair':
        console.log('Até a próxima! :)')
        return
      default:
        console.error('Opção inválida, verifique!');
    }
  }
}

start()