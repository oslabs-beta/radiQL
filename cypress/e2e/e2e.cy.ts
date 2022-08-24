/// <reference types="cypress" />
describe('e2e tests', () => {
  it('can login and logout', () => {
    // login
    cy.visit('http://localhost:8080/');
    cy.wait(5000);
    cy.contains('Login').click();
    cy.contains('Login');
    cy.contains('Register Here'); 
    cy.get('#login-username').type('test666');
    cy.get('#login-password').type('test');
    cy.get('#login-btn').click();

    // logout
    cy.contains('My Account').click();
    cy.contains('Logged into account: test666');
    cy.contains('Logout').click({force: true});
    cy.contains('Login');
  });
  it('can generate schemas and resolvers from postgres URI', () => {
    const testURI = "postgres://mbvnsdqx:Saf3Rk2qSOmYrab1SzA35utIB5s0jxCQ@heffalump.db.elephantsql.com/mbvnsdqx"
    cy.get('#userURI').click();
    cy.get('#userURI').type(testURI);
    cy.get('#convert-btn').click();
    cy.get('#userURI').click().type('{selectall}').type('{backspace}');
    cy.contains(testURI);
  });
});
