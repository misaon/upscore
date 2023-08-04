describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-cy="navigation__dashboard"]').click();
    cy.get('[data-cy="navigation__monitored-resources"]').click();
    cy.get('[data-cy="navigation__alarms"]').click();
  });
});
