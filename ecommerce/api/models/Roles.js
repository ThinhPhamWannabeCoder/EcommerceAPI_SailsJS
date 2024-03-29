/**
 * Roles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type: 'string',
      unique: true,
      required: true,
    },
    desc:{
      type: 'string',
      allowNull: true,
    },
    users:{
      collection: 'users',
      via: 'roles',
      // through: 'users-roles'

    }

  },

};

