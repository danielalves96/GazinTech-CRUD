import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { GazinTechAPI: 'Is running...' }
})

Route.resource('/developers', 'DevelopersController').apiOnly()
