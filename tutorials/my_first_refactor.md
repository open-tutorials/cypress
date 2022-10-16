Hello everybody!

<code-diff>

    <left>
```js
it('should do check copyrights', () => {

  cy.get('body > div > footer p')
    .should('have.text', 'Все права защищены');

});
```
    </left>
    <right>
```js
it('should do check copyrights', () => {

  cy.get('footer [data-cy=copyright]')
    .should('have.text', 'Все права защищены');

});
```
    </right>

</code-diff>

***