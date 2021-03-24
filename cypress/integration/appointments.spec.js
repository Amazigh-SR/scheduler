describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {
    cy.get("[alt='Add']").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    //Decided to choose a different interviewer (instead of using Sylvia) to make the test less fragile
    //Otherwise the query is not pointing at the same show card
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    cy.get("[alt='Edit']").first().click({ force: true });
    cy.get("[data-testid=student-name-input]").clear().type("Saïd Redouane");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Saïd Redouane");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {});
});
