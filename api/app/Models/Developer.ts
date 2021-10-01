import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Developer extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public nome: string

  @column()
  public sexo: string

  @column()
  public idade: number

  @column()
  public hobby: string

  @column()
  public datanascimento: Date
}
