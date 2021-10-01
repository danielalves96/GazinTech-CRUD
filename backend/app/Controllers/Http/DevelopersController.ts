import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Developer from 'App/Models/Developer'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DevelopersController {
  public async index({ request }: HttpContextContract) {
    if (!request.parsedUrl.query) {
      const developers = await Developer.all()
      return developers
    } else {
      const page = request.input('page', 1)
      const limit = 10
      const developers = await Database.from('developers').paginate(page, limit)
      return developers
    }
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['id', 'nome', 'sexo', 'idade', 'hobby', 'datanascimento'])
    const developer = await Developer.create(data)
    return developer
  }

  public async show({ params }: HttpContextContract) {
    const developer = await Developer.findOrFail(params.id)
    return developer
  }

  public async update({ request, params }: HttpContextContract) {
    const developer = await Developer.findOrFail(params.id)
    const data = request.only(['nome', 'sexo', 'idade', 'hobby', 'datanascimento'])
    developer.merge(data)
    await developer.save()
    return developer
  }

  public async destroy({ params }: HttpContextContract) {
    const developer = await Developer.findOrFail(params.id)
    await developer.delete()
  }
}
