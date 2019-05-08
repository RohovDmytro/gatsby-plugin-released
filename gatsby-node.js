const moment = require('moment-timezone')

const getValue = ({ node, options }) => {
  const { fieldName, timezone } = options
  if (!node.frontmatter) {
    return false
  }

  if (node.frontmatter.hasOwnProperty(fieldName)) {
    return node.frontmatter[fieldName]
  }

  if (!node.frontmatter.date) {
    return false
  }

  const dateNode = moment.tz(node.frontmatter.date, timezone)
  const dateNow = moment().tz(timezone)
  const value = dateNow.isSameOrAfter(dateNode)

  return value
}

exports.onCreateNode = ({ node, actions }, optionsFromConfig) => {
  const MD_TYPE = 'MarkdownRemark'
  const options = {
    fieldName: 'released',
    fieldNameNotForced: 'releasedNotForced',
    timezone: 'UTC',
    force: false,
    ...optionsFromConfig,
  }
  const { createNodeField } = actions
  const { fieldName, fieldNameNotForced } = options

  // Skip modifications for non-markdown files
  if (node.internal.type !== MD_TYPE) {
    return
  }

  const value = getValue({ node, options })

  createNodeField({
    node,
    name: fieldName,
    value: options.force === true ? true : value,
  })
  createNodeField({
    node,
    name: fieldNameNotForced,
    value,
  })
}
