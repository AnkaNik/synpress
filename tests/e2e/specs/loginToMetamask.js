// Define the test suite "Metamask Extension tests"
describe('Metamask Extension tests', () => {

  // Define the test case "connect to DApp with Metamask extension example"
  it('connect to DApp with Metamask extension example', () => {
    
    // Add a new network to Metamask using the `cy.addMetamaskNetwork()` command
  /*  cy.addMetamaskNetwork({
      networkName: 'Optimism Goerli',
      rpcUrl: 'https://goerli.optimism.io',
      chainId: '420',
      symbol: 'ETH',
      blockExplorer: 'https://goerli-optimism.etherscan.io/',
      isTestnet: true,
    })*/
    
    // Visit the root URL of the DApp
    cy.visit('https://app.stg.rhino.fi');
    //wait until it will be loading
    cy.wait(9000);
    cy.get('#accept-all-cookies').click();
    // Click the "Connect" button on the DApp
    cy.get('#heap-connect-wallet').click();
    cy.get('#metamask').click();
    // Accept the Metamask access request by clicking the "Connect" button in the Metamask popup
    cy.acceptMetamaskAccess().should('be.true');
    cy.get('#authentication-action').click();
    cy.confirmMetamaskSignatureRequest().should('be.true');
    cy.get('#unlock-key-action').click();
    cy.wait(1000);
    cy.confirmMetamaskDataSignatureRequest().should('be.true');

    // deposit
    cy.get('#portfolio-profile-deposit').click( { force: true });
    cy.get('#deposit-input').click().type('0.01');
    cy.get('#heap-deposit').click();
    cy.wait(2000);
    cy.confirmMetamaskDataSignatureRequest().should('be.true');
    cy.wait(9000);
    cy.get('#History').click();
   // cy.get('#table-deposits-history-0-quantity-0').should('have.value','0.01')

    //withdrawal
    cy.get('#header-user-profile').click();
    cy.get('#portfolio-profile-withdraw').click({ force: true });
    cy.get('#withdrawAmount').click().type('0.01');;
    cy.contains('Optimism').click({ force: true });
    cy.get('#continue-withdrawal').click();
    cy.get('#confirm-withdrawal').click();
   // cy.get('#notification').should('be.visible');
    cy.get('#History').click();
    cy.contains('Withdrawals').click({ force: true });
   // cy.get('#table-withdrawals-history-0').should('be.visible');

   cy.get('#bridge-page-link').click();
   //cy.get('#toggle-bridge-widget').click();
   cy.get('#bridge-amount').click().type('0.012');
   cy.get('#chainIn-open').click();
   cy.get('#ETHEREUM').first().click();
   cy.get('#chainOut-open').click();
   cy.get('#ZKEVM').last().click( {force: true});
   cy.get("#bridge-withdraw-amount").click({force: true});
   cy.get('#review-bridge').click();
   cy.get('#bridge-funds').click();
   cy.wait(2000);
   cy.get('#change-network').click();
    cy.wait(2000);
   cy.allowMetamaskToAddAndSwitchNetwork().should('be.true');
   cy.confirmMetamaskDataSignatureRequest().should('be.true');
   cy.wait(9000);
   //cy.get('#try-again-make-another').click();

    //second deposit
    cy.get('#header-user-profile').click();
    cy.get('#portfolio-profile-deposit').click( { force: true });
    cy.get('#deposit-token-select').click();
    cy.get('#ZKEVM').click( { force: true });
    cy.get('[data-index="1"]').click ({ force: true });
    //cy.contains('ETH').click( { force: true });
    cy.wait(100);
    cy.get('#deposit-input').click( { force: true }).type('0.008');
    cy.get('#heap-deposit').click();
    cy.get('#change-network').click();
    cy.wait(2000);
    cy.allowMetamaskToAddAndSwitchNetwork().should('be.true');
    cy.wait(2000);
    cy.confirmMetamaskDataSignatureRequest().should('be.true');
    cy.wait(9000);
    cy.get('#History').click();
    cy.get('#table-deposits-history-0-quantity-0').should('have.value','0.01');
    
     // bridge

  });
})