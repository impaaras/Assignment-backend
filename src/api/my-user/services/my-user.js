'use strict';

/**
 * my-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::my-user.my-user');
