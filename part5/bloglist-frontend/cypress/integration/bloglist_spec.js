/// <reference types="Cypress" />

beforeEach(() => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  cy.visit('/');
});

it('shows login form', () => {
  cy.findByLabelText(/username/i).should('exist');
  cy.findByLabelText(/password/i).should('exist');
  cy.findByRole('button', { name: /login/i }).should('exist');
});
