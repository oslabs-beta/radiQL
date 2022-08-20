
describe('empty spec', () => {
  it('can login and logout', () => {
    //login
    cy.visit('http://localhost:8080/');
    cy.wait(5000);
    cy.contains('Login').click();
    cy.contains('Login');
    cy.contains('Register?'); 
    cy.get('#login-username').type('test666');
    cy.get('#login-password').type('test');
    cy.get('#login-btn').click();

    //logout
    cy.contains('My Account').click();
    cy.contains('Logged into account: test666');
    cy.contains('Logout').click({force: true});
    cy.contains('Login');
  });
})