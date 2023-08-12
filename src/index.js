#!/usr/bin/env node

const { program } = require('commander')
const degit = require('degit')
const pc = require('picocolors')
const path = require('path')

program.version('0.9.0')

program.argument('<starter>', 'O pacote que será copiado.')
program.argument('[pasta]', 'A pasta que será criada com os arquivos.')

program.action(async (starter, pasta) => {
  try {
    console.log(pc.yellow('Cortesia do Estúdio Digital Bocca'))
    console.log(pc.green('Localizando Arquivos...'))

    const starterName = () => {
      return starter === 'electron-vue3' ? 'digitalbocca/electron-vue3#main' : `digitalbocca/edb-${starter}#main`
    }

    const emitter = degit(starterName(), {
      cache: false,
      force: true,
      verbose: true
    })
    emitter.on('info', info => console.log(info.message))
    await emitter.clone(path.resolve((pasta || '.')))

    console.log(pc.green('Seu novo Projeto está pronto.'))
    console.log(pc.yellow('Lembre-se de instalar as dependências.'))
  } catch (e) {
    console.error(e.message)
  }
})

program.parse(process.argv)
