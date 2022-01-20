describe('My First Test', () => {
    it('Visits the Recipe App', () => {
        cy.visit('http://localhost:3000/')
    })

    it("Checks for Recipe Name Input", () => {
        cy.contains("Recipe Name")
    })
    it("Checks for Recipe Instructions", () => {
        cy.contains("Recipe Instructions")
    })
    it("Checks for Ingredients", () => {
        cy.contains("Ingredients")
    })
    it("Creates a recipe", () => {
        cy.get("#recipeName").type("Testing123")
        // cy.get("#recipeInstructions").type("Testing Instructions")
        // cy.get("#recipeIngredients").type("Testing Ingredients")
        // cy.get("#addIngredientsButton").click()
        // cy.get("#addRecipeButton").click()
        // cy.wait(1500)
        // cy.request("http://localhost:3001/recipes").then(res => {
        //     expect(res.body.filter(function (item) {
        //         return item.name === "Testing123"
        //     }).length).to.not.eq(0)
        // })
    })
    it("Tests if gluten free checkbox is working", () => {
        cy.get("#recipeName").type("glutenFreeTest")
        // cy.get("#recipeInstructions").type("Testing Instructions")
        // cy.get("#recipeIngredients").type("Testing Ingredients")
        // cy.get("#addIngredientsButton").click()
        // cy.get("#glutenFreeCheckbox").click()
        // cy.get("#addRecipeButton").click()
        // cy.wait(1500)
        // cy.request("http://localhost:3001/recipes").then(res => {
        //     console.log(res, "data")
        //     expect(res.body.find(item => item.name === "glutenFreeTest").isGlutenFree).to.eq(1)
        // })
    })
    it("Checks the edit functionality", () => {
        cy.get("#showAllRecipesButton").click()
        cy.get("#expandglutenFreeTest").click()
        cy.get("#editButton-glutenFreeTest").click()
        cy.get("#editRecipeNameglutenFreeTest").type("1")
        cy.get("#editRecipeInstructionsglutenFreeTest").type("1")
        cy.get("#saveEditglutenFreeTest").click()
        cy.wait(1000)
        cy.contains("glutenFreeTest1")
        cy.get("#expandglutenFreeTest1").click()
        cy.contains("Testing Instructions1")
    })

    it("Delete functionality works", () => {
        cy.request("http://localhost:3001/recipes").then(res => {
            const previousLength = res.body.filter(item => item.name === "glutenFreeTest").length
            cy.get("#showAllRecipesButton").click()
            cy.get("#expandglutenFreeTest").click()
            cy.get("#deleteButtonglutenFreeTest").click()
            cy.request("http://localhost:3001/recipes").then(res => {
                const newLength = res.body.filter(item => item.name === "glutenFreeTest").length
                expect(newLength).to.eq(previousLength - 1)
            })
        })
    })

})