describe('Landing page of signup form', () => {
  it('should correctly display the signup form', () => {
    cy.visit('/');
    cy.get('app-signup-form').should('exist');
  });

  it('should succesfully complete the signup process', () => {
    cy.visit('/');
    cy.get('#fedex-first-name').type('John');
    cy.get('#fedex-last-name').type('Doe');
    cy.get('#fedex-email').type('john@fedex.com');
    cy.get('#fedex-password').type('MyStrongPW123');
    cy.get('#fedex-password-repeat').type('MyStrongPW123');
    cy.get('#fedex-signupform').submit();
    cy.get('#registration-done-title').should('exist');
  });
});
