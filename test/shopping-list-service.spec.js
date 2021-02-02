const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List service object', function() {
  let db;
  let testItems = [
    {
      id: 1,
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      name: 'First test post!',
      category: 'Snack',
      price: '12.20',
      checked: true
    },
    {
      id: 2,
      date_added: new Date('2100-05-22T16:28:32.615Z'),
      name: 'Second test post!',
      category: 'Lunch',
      price: '12.20',
      checked: true
    },
    {
      id: 3,
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      name: 'Third test post!',
      category: 'Main',
      price: '12.20',
      checked: true
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context('Given "shopping_list" has data', () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems);
    });
    it('getAllItems() resolves all items from "shopping_list" table', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        });
    });
    it('getById() resolves an item by id from \'shopping_list\' table', () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId - 1];
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            checked: thirdTestItem.checked,
            name: thirdTestItem.name,
            category: thirdTestItem.category,
            date_added: thirdTestItem.date_added,
            price: thirdTestItem.price
          });
        });
    });
    it('deleteItem() removes an item by id from \'shopping_list\' table', () => {
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test items array without the "deleted" item
          const expected = testItems.filter(item => item.id !== itemId);
          expect(allItems).to.eql(expected);
        });
    });
    it('updateItem() updates an item from the \'shopping_list\' table', () => {
      const idOfItemToUpdate = 1;
      const newItemData = {
        name: 'updated name',
        checked: true,
        category: 'Main',
        date_added: new Date(),
        price: '12.20'
      };
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          });
        });
    });
  });

  context('Given \'shopping_list\' has no data', () => {
    it('getAllItems() resolves an empty array', () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        });
    });

    it('insertItem() inserts a new item and resolves the new item with an \'id\'', () => {
      const newItem = {
        name: 'Test new name',
        checked: false,
        category: 'Breakfast',
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        price: '200.00'
      };
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            checked: newItem.checked,
            category: newItem.category,
            date_added: newItem.date_added,
            price: newItem.price
          });
        });
    });
  });
});