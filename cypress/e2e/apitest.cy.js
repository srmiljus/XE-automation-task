/// <reference types = "Cypress" />

describe("API Tests", () => {

  //Verify response status is 200 OK and all the "title" and "body" fields have content and none of the fileds contains word "zombie"
  it("Task #1: GET Method", () => {
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/")
      .then((response) => {
        expect(response.status).to.eq(200);

        const jsonData = response.body;

        for (let i = 0; i < jsonData.length; i++) {
          expect(jsonData[i].title).to.not.be.empty;
          expect(jsonData[i].body).to.not.be.empty;
          expect(jsonData[i].title.includes("zombie")).to.be.false;
          expect(jsonData[i].body.includes("zombie")).to.be.false;
        }
      });
  });

  ///Verify response status is 200 OK and response message that the topping is "bacon, cheese, mushroom" and does't contain "chicken"
  it("Task #2: POST Method", () => {
    const requestBody = {
      student: "Tim Allen",
      email_address: "tim@homeimprovement.com",
      phone: "(408) 8674530",
      current_grade: "B+",
      topping: ["bacon", "cheese", "mushroom"],
    };

    cy.request("POST", "https://httpbin.org/post", requestBody)
      .then((response) => {
        const jsonData = response.body.json;

        expect(jsonData.topping).to.deep.equal(["bacon", "cheese", "mushroom"]);
        expect(jsonData.topping).to.not.include("chicken");
      });
  });
});