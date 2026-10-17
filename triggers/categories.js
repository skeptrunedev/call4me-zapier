'use strict';

// Hidden trigger that feeds the Category dropdown.
const perform = async (z, bundle) => {
  const response = await z.request({ url: 'https://call4.me/api/requirements' });
  return response.data.categories.map((category) => ({
    id: category.slug,
    ...category,
  }));
};

module.exports = {
  key: 'categories',
  noun: 'Category',
  display: {
    label: 'List Call Categories',
    description: 'Lists the kinds of call call4me places, for dropdowns.',
    hidden: true,
  },
  operation: {
    perform,
    sample: {
      id: 'restaurant',
      slug: 'restaurant',
      name: 'Restaurant reservation',
      examples: 'book, change, or cancel a table',
    },
  },
};
