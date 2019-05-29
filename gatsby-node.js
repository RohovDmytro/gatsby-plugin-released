const moment = require('moment-timezone');

const getValue = ({ node, options }) => {
  const { fieldName, timezone } = options;
  if (!node.frontmatter) {
    return false;
  }

  if (node.frontmatter.hasOwnProperty(fieldName)) {
    return node.frontmatter[fieldName];
  }

  if (!node.frontmatter.date) {
    return false;
  }

  const dateNode = moment.tz(
    node.frontmatter.date,
    timezone
  );
  const dateNow = moment().tz(timezone);
  const value = dateNow.isSameOrAfter(dateNode);

  return value;
};

exports.onCreateNode = (
  { node, actions },
  optionsFromConfig
) => {
  const TYPES = ['MarkdownRemark', 'Mdx'];

  const options = {
    fieldName: 'released',
    fieldNameNotForced: 'releasedNotForced',
    timezone: 'UTC',
    force: false,
    ...optionsFromConfig
  };
  const { createNodeField } = actions;
  const { fieldName, fieldNameNotForced } = options;

  // Skip modifications for non-markdown files

  if (!TYPES.includes(node.internal.type)) {
    return;
  }

  const value = getValue({ node, options });

  createNodeField({
    node,
    name: fieldName,
    value: options.force === true ? true : value
  });
  createNodeField({
    node,
    name: fieldNameNotForced,
    value
  });
};
