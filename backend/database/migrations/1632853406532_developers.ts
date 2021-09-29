import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Developers extends BaseSchema {
  protected tableName = 'developers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.string('sexo')
      table.integer('idade')
      table.string('hobby')
      table.date('datanascimento')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
