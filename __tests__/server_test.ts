import request from 'supertest'; 
import { app } from '../server/server'; 

describe("Test server.ts", () => {
  test("Catch nonexistent route with 404", async () => {
    const res = await request(app).get("/404");
    expect(res.status).toEqual(404);
  });
  test("Catch incorrect request method", async () => {
    const res = await request(app).get("/submitURI");
    expect(res.status).toEqual(404); 
  });
  test("Can receive a URI", async () => {
    const res = await request(app).post("/submitURI")
    .set('Content-type', 'application/json')
    .send({ dbURI: "postgres://mbvnsdqx:Saf3Rk2qSOmYrab1SzA35utIB5s0jxCQ@heffalump.db.elephantsql.com/mbvnsdqx"});
    expect(res.status).toEqual(200); 
  });
  test("Can receive a URI and return an appropriate object", async () => {
    const res = await request(app).post("/submitURI")
    .set('Content-type', 'application/json')
    .send({ dbURI: "postgres://rcwvxixj:QoMsDTMRQyrIxkI_ZfWPvUvHwdifXLt4@heffalump.db.elephantsql.com/rcwvxixj"});
    expect(res.status).toEqual(200); 
    expect(res.text).toContain('"schema":');
    expect(res.text).toContain('"resolver":');
  });
  test("Can allow a registered user to log in", async () => {
    const res = await request(app).post("/login")
    .set('Content-type', 'application/json')
    .send({ username: "test666", password: "test"});
    expect(res.status).toEqual(200);
  })
});