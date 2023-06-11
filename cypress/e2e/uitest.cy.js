describe("Story: Currency Converter Tests", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("https://www.xe.com/currencyconverter/");
    cy.wait(2000);
  });


  it("Task #1: Send 10 GBP to EUR and validate converted amount", () => {

    // Accept cookie
    cy.get("[style='display: flex; justify-content: flex-end;'] button[class='button__BaseButton-sc-1qpsalo-0 haqezJ']")
      .should('be.visible')
      .click();

    // Enter valid amount and currency
    cy.get('[id="amount"]').clear().type("10");
    cy.get('.base-combobox__InputWrapper-iyxb4f-4 > #midmarketFromCurrency').type('GBP');
    cy.get('ul[id="midmarketFromCurrency-listbox"]').find('li[id="midmarketFromCurrency-option-0"]').click();

    // Verify the button on the conversion form has the value "Convert"
    cy.get('[class="currency-converter__SubmitZone-zieln1-3 eIzYlj"] button[class="button__BaseButton-sc-1qpsalo-0 clGTKJ"]').invoke('text')
      .should('eq', 'Convert');

    // Verify amount is converted correctly  
    cy.get('[class="currency-converter__SubmitZone-zieln1-3 eIzYlj"] button[class="button__BaseButton-sc-1qpsalo-0 clGTKJ"]').click();
    cy.get('[class="unit-rates___StyledDiv-sc-1dk593y-0 dEqdnx"] p:nth-child(1)').should('be.visible').then(($conversionRate) => {
      const conversionRateString = $conversionRate.text();
      const startIndex = conversionRateString.indexOf('=') + 1;
      const endIndex = conversionRateString.indexOf('EUR');
      const conversionRateValue = parseFloat(conversionRateString.slice(startIndex, endIndex).trim());
      const expectedResult = (10 * conversionRateValue).toFixed(2);

      cy.get('p[class="result__BigRate-sc-1bsijpp-1 iGrAod"]').then(($result) => {
        const resultValue = parseFloat($result.text()).toFixed(2);
        expect(resultValue).to.equal(expectedResult);

        //Enter alphabet characters into the 'Amount"" field and validate error message
        cy.get('[id="amount"]').type('{selectall}{backspace}').type('abc');
        cy.get('.currency-converter__ErrorText-zieln1-2')
          .invoke('text')
          .should('eq', 'Please enter a valid amount');

        // Verify the "From" dropdown field has the option "INR - Indian Rupee"
        cy.get('.base-combobox__InputWrapper-iyxb4f-4 > #midmarketFromCurrency').type('INR');
        cy.get('ul[id="midmarketFromCurrency-listbox"]').find('li[id="midmarketFromCurrency-option-0"]').click();
        cy.get('.base-combobox__InputWrapper-iyxb4f-4 > #midmarketFromCurrency')
          .should('have.value', 'INR');
      });
    });
  });


  it("Task #2: Sign in and Register with Email and Password", () => {

    // Accept cookie
    cy.get("[style='display: flex; justify-content: flex-end;'] button[class='button__BaseButton-sc-1qpsalo-0 haqezJ']")
      .should('be.visible')
      .click();

    // Go to "Send Money" page
    cy.get('[class="Headerstyles__NavRibbon-sc-18sfhsj-7 bZOpcu"]  a[href="/send-money/"] button').click();

    // Scroll down to the "Sign in and send" button and click it
    cy.get('a[href="https://transfer.xe.com/signup/personal/step1"]>span[class="Buttonstyle__Text-sc-1ec4p0s-1 fGTmXq"]')
      .scrollIntoView({ duration: 'smooth' })
      .should('be.visible')
      .click();

    //Populate the email and password fields and validate "Register Now" button is enabled
    cy.get('input[id="email"]').type("test@test.com");
    cy.get('input[id="password"]').type("Test1234#/,");
    cy.get('button[type="submit"]').should("be.enabled");
  });
});
