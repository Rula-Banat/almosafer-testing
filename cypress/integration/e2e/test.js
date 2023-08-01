//const { it } = require("mocha");
Cypress.on('uncaught:exception', (err,runnable) => {
    return false
})

describe('Automated test', () => {
    it('Assertions', () => {
        cy.visit('https://www.almosafer.com/en')
        //Check default language
        cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', 'العربية')

        //Check default currency
        cy.get('button[data-testid="Header__CurrencySelector"]').should('contain', 'SAR')

        //Check contact number
        cy.get('a[class="sc-dRFtgE efKwyg"]').should('contain', '+966554400000')

        //Check if Qitaf logo exists in footer
        cy.get('footer')
            .within(() => {
                cy.get('svg[data-testid="Footer__QitafLogo"]').should('exist')
            })
        cy.get('svg[data-testid="Footer__QitafLogo"]').should('be.visible')

        //Check hotels tab in NOT selected
        cy.get('#uncontrolled-tab-example-tab-hotels').should('have.attr', 'aria-selected', 'false')

    });

    it('Default flight dates', () => {
        cy.visit('https://www.almosafer.com/en')

        //Check flight depature is today + 1 day
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        let day = tomorrow.getDate()
        let monthIndex = tomorrow.getMonth()
        day = (day < 10 ? '0' + day : day) //convert date day to 2 digits format
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]

        cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-hcnlBt').should('have.text', day)
        cy.get('[data-testid="FlightSearchBox__FromDateButton"] > .sc-cFlXAS').should('have.text', monthNames[monthIndex])

        //Check flight return is today + 2 days
        const afterTomorrow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
        let returnDay = afterTomorrow.getDate()
        let returnMonthIndex = afterTomorrow.getMonth()
        returnDay = (returnDay < 10 ? '0' + returnDay : returnDay) //convert date day to 2 digits format

        cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-hcnlBt').should('have.text', returnDay)
        cy.get('[data-testid="FlightSearchBox__ToDateButton"] > .sc-cFlXAS').should('have.text', monthNames[returnMonthIndex])

    });

    it.only('Choose language randomly then check hotels in a random city and random room criteria', () => {
        const links = ['https://www.almosafer.com/en', 'https://www.almosafer.com/ar']
        let randomIndex = Math.floor(Math.random() * links.length)
        cy.visit(links[randomIndex])
        const englishCities = ['Dubai','Jeddah','Riyadh']
        const arabicCities = ['دبي','جدة']
        let englishRandomIndex = Math.floor(Math.random() * englishCities.length)
        let arabicRandomIndex = Math.floor(Math.random() * arabicCities.length)
        cy.url().then((url) => {
            if (url.includes('/en')) {
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', 'العربية')
                cy.get('#uncontrolled-tab-example-tab-hotels').click()
                cy.get('input[data-testid="AutoCompleteInput"]').type(englishCities[englishRandomIndex])
                cy.get('[data-testid="AutoCompleteResultItem0"] > .sc-12clos8-5').click()
            } else if (url.includes('/ar')) {
                cy.get('[data-testid="Header__LanguageSwitch"]').should('contain', 'English')
                cy.get('#uncontrolled-tab-example-tab-hotels').click()
                cy.get('input[data-testid="AutoCompleteInput"]').type(arabicCities[arabicRandomIndex])
                cy.get('[data-testid="AutoCompleteResultItem0"] > .sc-12clos8-5').click()
            }
        })

    });

    it('', () => {
       
    });

    it('', () => {
        cy.visit('https://www.almosafer.com/en')
    
        cy.get('.sc-dDojKJ').find('price__value')
    });
});