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

  describe("When there's a blog post", () => {
    beforeEach(() => {
      cy.window().then((window) => {
        const jwt = JSON.parse(window.localStorage.getItem('user')).token;

        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          auth: { bearer: jwt },
          body: {
            title: 'Title of a newer post',
            author: 'Test User',
            url: 'http://localhost/post-url',
          },
        });
      });

      cy.visit('/');
    });

    it('can like a blog post', () => {
      cy.findByRole('button', { name: /show/i })
        .click()
        .parent()
        .parent()
        .findByText(/Likes: \d+/i)
        .then(($elt) => {
          const likesBefore = +$elt[0].textContent.match(/Likes: (\d+)/i)[1];

          cy.findByRole('button', { name: /Like/i })
            .click()
            .parent()
            .contains(`Likes: ${likesBefore + 1}`);
        });
    });

    it('allows user to delete a blog post they created', () => {
      cy.findByRole('button', { name: /show/i })
        .click()
        .parent()
        .parent()
        .findByRole('button', { name: /remove/i })
        .click();
      cy.findByRole('heading', { name: /blog list/i })
        .parent()
        .should('not.contain', 'Title of a newer post');
    });
  });
});
