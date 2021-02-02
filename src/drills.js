require('dotenv').config();
const { raw } = require('express');
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});
  
function getItemsWithText(searchTerm){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result);
    });
}

function paginateItems(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then(result => {
      console.log(result);
    });
}

function getItemsAddedAfter(daysAgo){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added', '>',
      knexInstance.raw(`now() - '${daysAgo} days'::INTERVAL`))
    .then(result => {
      console.log(result);
    });
}

function getTotalCostPerCategory(){
  knexInstance
    .select('category')
    .sum('price AS total_price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
    });
}

getTotalCostPerCategory();