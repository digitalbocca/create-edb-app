#!/usr/bin/env node

const { program } = require('commander')
const degit = require('degit')
const chalk = require('chalk')
const path = require('path')

program.version('0.6.0')

program.arguments('<starter> [pasta]')

program.description('Executa o programa', {
  starter: 'O pacote que será copiado.',
  pasta: 'A pasta que será criada com os arquivos.'
})

program.action(async (starter, pasta) => {
  try {
    console.log(chalk.yellow('Cortesia do Estúdio Digital Bocca'))
    console.log(chalk.green('Localizando Arquivos...'))
    const emmiter = degit(`digitalbocca/edb-${starter}#main`, {
      cache: false,
      force: true,
      verbose: true
    })
    emmiter.on('info', info => console.log(info.message))
    await emmiter.clone(path.resolve((pasta || '.')))

    console.log(chalk.green('Seu novo Projeto está pronto.'))
    console.log(chalk.yellow('Lembre-se de instalar as dependências.'))
  } catch (e) {
    console.error(e.message)
  }
})

program.parse(process.argv)
