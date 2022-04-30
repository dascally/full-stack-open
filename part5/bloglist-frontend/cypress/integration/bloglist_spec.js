/// <reference types="Cypress" />

const testUser = Cypress.env('user');

beforeEach(() => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  cy.request('POST', 'http://localhost:3003/api/users', testUser);
  cy.visit('/');
});

it('shows login form', () => {
  cy.findByLabelText(/username/i).should('exist');
  cy.findByLabelText(/password/i).should('exist');
  cy.findByRole('button', { name: /login/i }).should('exist');
});

describe('Login', () => {
  it('succeeds with correct credentials', () => {
    cy.findByLabelText(/username/i).type(testUser.username);
    cy.findByLabelText(/password/i).type(testUser.password);
    cy.findByRole('button', { name: /login/i }).click();

    cy.contains(`${testUser.name} is logged in.`).should('exist');
  });

  it('fails with incorrect credentials', () => {
    cy.findByLabelText(/username/i).type(testUser.username);
    cy.findByLabelText(/password/i).type('wrong password');
    cy.findByRole('button', { name: /login/i }).click();

    cy.contains(/invalid credentials/i);
  });
});
