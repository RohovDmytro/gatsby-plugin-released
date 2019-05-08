A plugin that let you exclide posts from production.

## How to use

1. Add plugin to `gatsby-node.js`

```javascript
module.exports = {
  plugins: [
    /*
        ...
    */
    'gatsby-plugin-released',
  ],
}
```

2. Update your GraphQL queries

3) Update your component code

## Options

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-released',
      options: {
        fieldName: 'released',
        fieldNameNotForced: 'releasedNotForced',
        force: true,
      },
    },
  ],
}
```
