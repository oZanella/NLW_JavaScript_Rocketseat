const { select, input } = require('@inquirer/prompts')

const cadMeta = async () => {
  const meta = await input({ message: 'Digite sua meta:'})

  if(meta.length == 0) {
    console.log('A meta não deve ser vazia')
  }else{
    console.log('Meta salva com sucesso!')
    return  
  }
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
        break
      case 'listar':
        console.log('vamos listar')
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