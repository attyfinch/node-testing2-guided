const Hobbits = require('./hobbits-model')
const db = require('../../data/dbConfig')

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db.seed.run()
})

test('Environment is testing', () => {
    expect(process.env.NODE_ENV).toBe('testing')
})

describe('getAll', () => {
    test('resolves all the hobbits in the table', async () => {
        const result = await Hobbits.getAll();
        expect(result).toHaveLength(4)
        expect(result[1]).toMatchObject({id: 2, name: 'frodo'})
        expect(result[2].name).toBe('pippin')
    })
})

/*  [
      { id: 1, name: 'sam' },
      { id: 2, name: 'frodo' },
      { id: 3, name: 'pippin' },
      { id: 4, name: 'merry' }
    ]
*/

describe('getById', () => {
    test('resolves the hobbit by the given id', async () => {
        const sam = await Hobbits.getById(1)
        expect(sam).toMatchObject({id: 1, name: 'sam'})
        
        const frodo = await Hobbits.getById(2)
        expect(frodo).toMatchObject({id: 2, name: 'frodo'})

        /* I can also declare result with let to run subsequent tests */

    })
})

describe('insert', () => {
    const bilbo = {name: 'bilbo'}
    test('resolves newly created hobbits', async () => {
        const result = await Hobbits.insert(bilbo)
        expect(result).toMatchObject(bilbo)
    })
    test('adds the hobbits to the hobbits table', async () => {
        await Hobbits.insert(bilbo)
        const records = await db('hobbits')
        expect(records).toHaveLength(5)
    })
})