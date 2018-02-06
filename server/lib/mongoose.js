const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

module.exports.createModel = (modelName, schema, ...staticMethods) => {
    return mongoose.model(
        modelName,
        addStaticMethodsToSchema(schema, staticMethods)
    );
};


const addStaticMethodsToSchema = (schema, staticMethods) => {
    const reducer = (accumulator, method) => {
        accumulator.statics[method.name] = method;
        return accumulator;
    };

    staticMethods.length && staticMethods.reduce(reducer, schema);

    return schema;
};

module.exports.findOneOrCreateGithub = async function findOneOrCreateGithub (criteria, document) {
  try {
      const data = await this.findOne(criteria);

      const insertDocument = (doc) => {
          const objectToSave = new this(githubModelToUserModel(doc));

          return objectToSave
              .save()
              .then((savedData) => savedData )
              .catch((error) => Promise.reject(error));
      };

      return data ? data : insertDocument(document);
  } catch (exception) {
      return Promise.reject(exception);
  }
}

function githubModelToUserModel(githubUser) {
    const user = {
        github: {
            id: githubUser.id,
            username: githubUser.username,
            login: githubUser._json.login
        }
    };
    return user;
}

module.exports.createOneOrErrorLocal = async function createOneOrErrorLocal (criteria, document) {
    try {
        const data = await this.findOne(criteria);
  
        const insertDocument = (doc) => {
            const objectToSave = new this(localModelToUserModel(doc));
  
            return objectToSave
                .save()
                .then((savedData) => savedData )
                .catch((error) => Promise.reject(error));
        };
  
        return data 
            ? new Error('That email is already taken.')
            : insertDocument(document);
    } catch (exception) {
        return Promise.reject(exception);
    }
}

function localModelToUserModel(localUser) {
    const user = {
        local: {
            email: localUser.email,
            password: localUser.password
        }
    };
    return user;
}

module.exports.findOneAndLoginLocal = async function findOneAndLoginLocal(criteria, document) {
    try {
        const user = await this.findOne(criteria);
        if (!user)
          return new Error('No user found.');

        if (!user.comparePassword(document.password))
        return new Error('Wrong password');

        return user;
    } catch (exception) {
        return Promise.reject(exception);
    }
}
