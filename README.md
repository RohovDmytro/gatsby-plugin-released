A plugin that let you exclide posts from production.

## How it works

This plugin add a new field called `released`. If your build happens before `date` of your post the `released` value will set to `false`.

## How to use

### 1. Add plugin to `gatsby-node.js`

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

### 2. Update your GraphQL queries

You may want to exclude drafts from a build step in file `gatsby-node.js` and respect the `released` value from blog pages such as `index.js.`

In both cases the query will look something like this. Pay attention to a filter property.

```javascript
const query = graphql(
  `
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fields: { released: { eq: true } } }
      ) {
        edges {
          node {
            id
          }
        }
      }
    }
  `
)
```

### 3. Update your component code

This step is totally up to yours component tree. The key point is to request necessary fields via GraphQL query.

```javascript
const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { released: { eq: true } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            released
            releasedNotForced
          }
        }
      }
    }
  }
```

## Options

```javascript
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-released',
      options: {
        fieldName: 'released',
        fieldNameNotForced: 'releasedNotForced',
        timezone: 'UTC',
        force: process.env.NODE_ENV === development,
      },
    },
  ],
}
```

### `fieldName` and `fieldNameNotForced`

Use to overried the default field name.

### `force`

In case you want to display posts in development mode you can use `force` option.

### `timezone`

Set another timezone that will be respected at build time to calculate `released` value.
