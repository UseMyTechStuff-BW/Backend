const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

const user1 = { username: 'joe', password: '1234', role: 'renter' }
const user2 = { username: 'billy', password: '1234', role: 'owner' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('[POST] /register - register new user', () => {
  it('returns a status 201 CREATED', async () => {
    const res = await request(server).post('/api/auth/register').send(user1)
    expect(res.status).toBe(201)
  })
  it('returns a newly created user', async () => {
    const res = await request(server).post('/api/auth/register').send(user1)
    expect(res.body).toMatchObject({ username: 'joe', role: 'renter' })
  })
})

describe('[POST] /login - login as user', () => {
  it('login succesful with status 200', async () => {
    await request(server).post('/api/auth/register').send(user2)
    const res = await request(server).post('/api/auth/login').send(user2)
    expect(res.status).toBe(200)
  })
  it('responds with the welcome message', async () => {
    await request(server).post('/api/auth/register').send(user2)
    const res = await request(server).post('/api/auth/login').send(user2)
    expect(res.body.message).toBe('billy is back!')
  })
})

describe('[GET] /equipment - get all equipment', () => {
  it('get equipment succesful with status 200', async () => {
    const res = await request(server).get('/api/equipment')
    expect(res.status).toBe(200)
  })
  it('responds with equipment', async () => {
    const res = await request(server).get('/api/equipment')
    expect(res.body).toMatchSnapshot()
  })
})

describe('[DEL] /equipment/:id - unable to delete unless owner token is added to header', () => {
  it('delete equipment not succesful with status 401', async () => {
    const res = await request(server).delete('/api/equipment/1')
    expect(res.status).toBe(401)
  })
})

describe('[POST] /requests - unable to post rental request unless authorized', () => {
  it('responds with 401 because not authorized', async () => {
    const res = await request(server).post('/api/requests').send({ equipment_id: 2 })
    expect(res.status).toBe(401)
  })
})

describe("[GET] /owner - unable to get owner equip unless authorized", () => {
  it("responds with 401 because not authorized", async () =>{
    const res = await request(server).get('/api/users/owner')
    expect(res.status).toBe(401)
  })
})

describe("[GET] /renter - unable to get renter equip unless authorized", () => {
  it("responds with 401 because not authorized", async () =>{
    const res = await request(server).get('/api/users/renter')
    expect(res.status).toBe(401)
  })
})