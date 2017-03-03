let assert = require('assert');
import {describe, it} from "mocha";
import {formatFormErrors} from "../actions/users.actions";

describe('User actions', function() {
  describe('#Format errors with single error', function() {
    it('should return Object with username key and value error message', function() {
        let errors = {"username":["A user with that username already exists."]};
        let formatErrors = {"username": "A user with that username already exists."};
        assert.deepEqual(formatErrors, formatFormErrors(errors))
    })
  });
  describe('#Format errors with multiple errors with same key', function() {
    it('should return Object with key: message and value: error message separate by coma', function() {
        let errors = {"username":["A user with that username already exists.", "Username length should be > 8"]};
        let formatErrors = {"username": "A user with that username already exists., Username length should be > 8"};
        assert.deepEqual(formatErrors, formatFormErrors(errors))
    })
  });
  describe('#Format errors with errors in multiple fields', function() {
    it('should return Object with multiple key that equal to fields with error', function() {
        let errors = {
            "username": ["A user with that username already exists."],
            "email": ["A user with that emil already exists."]
        };
        let formatErrors = {
            "username": "A user with that username already exists.",
            "email": "A user with that emil already exists."
        };
        assert.deepEqual(formatErrors, formatFormErrors(errors))
    })
  });
});
