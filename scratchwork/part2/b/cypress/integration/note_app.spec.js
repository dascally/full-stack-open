describe('Note app', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Ebidaj Paleu',
      username: 'Ebidaj',
      password: 'badger',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('opens the front page', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app; Department of Computer Science, University of Helsinki; 2022'
    );
  });

  it('can open the login form', () => {
    cy.contains('Login').click();
  });

  it('allows user login', () => {
    cy.contains('Login').click();
    cy.get('#username').type('Ebidaj');
    cy.get('#password').type('badger');
    cy.get('#login-button').click();

    cy.contains('Ebidaj Paleu is logged in');
  });

  it('fails login when using the wrong password', () => {
    cy.contains('Login').click();
    cy.get('#username').type('Ebidaj');
    cy.get('#password').type('wrong-password');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Invalid credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Ebidaj Paleu is logged in.');
  });

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Ebidaj', password: 'badger' });
    });

    it('can create a new note', () => {
      cy.contains('New note').click();
      cy.get('input').type('A note created by cypress');
      cy.contains('Save').click();
      cy.contains('A note created by cypress');
    });

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'Another note added by cypress',
          important: false,
        });
      });

      it('can make a note important', () => {
        cy.contains('Another note added by cypress')
          .parent()
          .find('button')
          .as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });

    describe('and several notes exist', () => {
      beforeEach(() => {
        cy.createNote({ content: 'First note', important: false });
        cy.createNote({ content: 'Second note', important: false });
        cy.createNote({ content: 'Third note', important: false });
      });

      it('can make one of the notes important', () => {
        cy.contains('Second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make not important');
      });
    });
  });
});
