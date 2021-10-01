import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Developer from 'App/Models/Developer'
import { uuid } from "uuidv4";

export default class BaseDeveloperSeeder extends BaseSeeder {
  public async run() {
    await Developer.createMany([
      {
        id: uuid(),
        nome: 'Daniel Alves',
        sexo: 'Masculino',
        idade: 25,
        hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
        datanascimento: new Date('1996-01-05T02:00:00Z'),
      },
      {
        id: uuid(),
        nome: 'Paola Tavares de Oliveira',
        sexo: 'Feminino',
        idade: 25,
        hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
        datanascimento: new Date('1996-07-01T02:00:00Z'),
      },
      {
        id: uuid(),
        nome: 'Marcia Regina Batista Alves',
        sexo: 'Feminino',
        idade: 47,
        hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
        datanascimento: new Date('1975-06-22T02:00:00Z'),
      },
      {
        id: uuid(),
        nome: 'Itamar Luiz',
        sexo: 'Masculino',
        idade: 49,
        hobby: 'Programar diariamente para obter cada vez mais conhecimento.',
        datanascimento: new Date('1973-08-24T02:00:00Z'),
      },
    ])
  }
}
