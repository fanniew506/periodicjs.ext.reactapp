'use strict';
const periodic = require('periodicjs');
const pluralize = require('pluralize');
const path = require('path');

/**
 * if return a path always prefixed with a '/' 
 */
function getManifestPathPrefix(prefix) {
  return periodic.utilities.routing.manifest_prefix(prefix);
}

function getDataPrefix(options) {
  const { adminRoute, schemaName, dataRoute = 'contentdata', } = options;
  return `${(periodic.utilities.routing.route_prefix(path.join(adminRoute,dataRoute,pluralize(schemaName))))}?format=json`;
}

function getDataRoute(options) {
  const { adminRoute, schemaName, dataRoute = 'contentdata', } = options;
  return `${(periodic.utilities.routing.route_prefix(path.join(adminRoute, dataRoute, pluralize(schemaName))))}`;
}

function getIndexLabel(schemaName) {
  return `${schemaName}_index`;
}

function getDetailLabel(schemaName) {
  return `${schemaName}_detail`;
}

function getContainerPath(options) {
  const { adminRoute, schemaName, } = options;
  return `${adminRoute}data/${pluralize(schemaName)}`;
}

function getSchemaEntity(options) {
  let { label, schema, } = options;
  let entity = label;
  if (schema[label] && Array.isArray(schema[label]) && schema[label].length && schema[label][0].ref) {
    entity = schema[label][0].ref;
  } else if (schema[label] && schema[label].ref) {
    entity = schema[label].ref;
  }
  return entity;
}

module.exports = {
  getManifestPathPrefix,
  getDataPrefix,
  getDataRoute,
  getIndexLabel,
  getDetailLabel,
  getContainerPath,
  getSchemaEntity,
};