const {test, expect} = require('@playwright/test')

test.only('login' , async({page})=> {


    //browser page open
    await page.goto("https://www.saucedemo.com/");
    await page.screenshot({path:'loginpage.png'})

    const username = "standard_user"
    const password = "secret_sauce"
    
    //getting title 
    const title = await page.title();
    console.log(title);
    expect(title).toMatch("Swag Labs");

    //entering credentials
    await page.locator("#user-name").fill(username);
    await page.locator("#password").fill(password);
     await page.screenshot({path:'Credentials.png'})
    await page.locator("#login-button").click();

    //loading
     await page.waitForSelector(".inventory_list");
      await page.screenshot({path:'products.png'})
    
      //productpage
    const products =  page.locator(".inventory_item");
    const neededProduct = products.nth(2);
    const verifyProduct = neededProduct.locator(".inventory_item_name");
    const verifyProductText = await verifyProduct.innerText();

    
    //adding to cart
    await neededProduct.locator('button').click();
    await page.screenshot({path:'addedcart.png'})

    //going to cart 
    await page.locator(".shopping_cart_badge").click();
    await page.screenshot({path:'cartPage.png'})

    //verifying the product
    await expect(page.locator(".inventory_item_name")).toHaveText(verifyProductText);
    
    //checkout
    await page.locator("#checkout").click();
    await page.locator("#first-name").fill("Hema");
    await page.locator("#last-name").fill("S")
    await page.locator("#postal-code").fill("600123");
    await page.locator("#continue").click();

    //printing order id
    console.log(await page.locator('[data-test="payment-info-value"]').textContent());
    await page.screenshot({path:'orderScreenshot.png'})

    //completing the payment
    await page.locator("#finish").click();

    //OrderPlaced
    console.log(await page.locator(".complete-header").textContent());
    await page.screenshot({path:'Completion.png'})














})