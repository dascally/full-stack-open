/// <reference types="Cypress" />

const testUser = Cypress.env('user');

beforeEach(() => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  cy.request('POST', 'http://localhost:3003/api/users', testUser);
});

describe('When not logged in', () => {
  beforeEach(() => {
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
});

describe('When logged in', () => {
  beforeEach(() => {
    cy.loginAndVisit(testUser.username, testUser.password);
  });

  it('can create a new blog post', () => {
    const newPost = {
      title: 'A new test blog post!',
      author: 'Test User',
      url: 'http://localhost',
    };

    cy.findByRole('heading', { name: /blog list/i })
      .parent()
      .children('div')
      .its('length')
      .then((length) => {
        cy.findByRole('button', { name: /create new post/i }).click();
        cy.findByLabelText(/title/i).type(newPost.title);
        cy.findByLabelText(/author/i).type(newPost.author);
        cy.findByLabelText(/url/i).type(newPost.url);
        cy.findByRole('button', { name: /create new post/i }).click();

        cy.findByRole('heading', { name: /blog list/i })
          .parent()
          .contains(newPost.title);
        cy.findByRole('heading', { name: /blog list/i })
          .parent()
          .children('div')
          .should('have.length', length + 1);
      });
  });
});
