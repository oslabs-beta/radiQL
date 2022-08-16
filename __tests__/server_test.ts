import cookieParser from 'cookie-parser';
import request from 'supertest'; 
import { app } from '../server/server'; 

describe("Test server.ts", (): void => {
  beforeAll(done => {
    done()
  })
  
  afterAll(done => {
    done()
  })
  test("Catch nonexistent route with 404", async () => {
    const res = await request(app).get("/404");
    expect(res.status).toEqual(404);
  });
  test("Catch incorrect request method", async () => {
    const res: request.Response = await request(app).get("/submitURI");
    expect(res.status).toEqual(404); 
  });
  test("Can receive a URI", async () => {
    const res: request.Response = await request(app).post("/submitURI")
    .set('Content-type', 'application/json')
    .send({ dbURI: "postgres://mbvnsdqx:Saf3Rk2qSOmYrab1SzA35utIB5s0jxCQ@heffalump.db.elephantsql.com/mbvnsdqx"});
    expect(res.status).toEqual(200); 
  });
  test("Can receive a URI and return an appropriate object", async () => {
    const res: request.Response = await request(app).post("/submitURI")
    .set('Content-type', 'application/json')
    .send({ dbURI: "postgres://rcwvxixj:QoMsDTMRQyrIxkI_ZfWPvUvHwdifXLt4@heffalump.db.elephantsql.com/rcwvxixj"});
    expect(res.status).toEqual(200); 
    expect(res.text).toContain('"schema":');
    expect(res.text).toContain('"resolver":');
  });
  test("Can allow a registered user to log in", async () => {
    const res: request.Response = await request(app).post("/login")
    .set('Content-type', 'application/json')
    .send({ username: "test666", password: "test"});
    expect(res.status).toEqual(200);
  });
  test("Prevents nonexistent user from logging in", async () => {
    const res: request.Response = await request(app).post("/login")
    .set('Content-type', 'application/json')
    .send({ username: "nonexistentuser138746978126341", password: ""});
    expect(res.status).toEqual(400);
  });
  test("Prevents logins with incorrect password", async () => {
    const res: request.Response = await request(app).post("/login")
    .set('Content-type', 'application/json')
    .send({ username: "test666", password: "wrongpassword"});
    expect(res.status).toEqual(400);
  });
  test("Invokes error handler on improper req body", async () => {
    const res: request.Response = await request(app).post("/register")
    .set('Content-type', 'application/json')
    .send({ username: "test666", wrongfield: "wrong field"});
    expect(res.status).toEqual(501);
  });
});