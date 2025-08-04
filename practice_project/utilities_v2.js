(function() {
  let _ = function(element) {
    let u = {
      first() {
        return element[0];
      },

      last() {
        return element[element.length - 1];
      },

      without(...values) {
        return element.filter(val => !values.includes(val));
      },

      lastIndexOf(value) {
        let index = -1;
        for (let i = element.length - 1; i >= 0; i -= 1) {
          if (element[i] === value) {
            index = i;
            break;
          }
        }

        return index;
      },

      sample(quantity) {
        let copy = element.slice();
        let get = function() {
          let idx = Math.floor(Math.random() * copy.length);
          let value = copy.splice(idx, 1)[0];
          return value;
        }

        if (!quantity) {
          return get();
        }

        let result = [];
        for (let count = 0; count < quantity; count += 1) {
          result.push(get());
        }

        return result;
      },

      findWhere(props) {
        for (let obj of element) {
          if (Object.keys(props).every(key => props[key] === obj[key])) {
            return obj;
          }
        }
      },

      where(props) {
        let result = [];

        for (let obj of element) {
          if (Object.keys(props).every(key => props[key] === obj[key])) {
            result.push(obj);
          }
        }

        return result;
      },

      pluck(key) {
        let values = [];

        element.forEach(obj => {
          if (key in obj) {
            values.push(obj[key]);
          }
        });

        return values;
      },

      keys() {
        return Object.keys(element);
      },

      values() {
        return Object.values(element);
      },

      pick(...keys) {
        let result = {};

        keys.forEach(key => {
          if (key in element) {
            result[key] = element[key];
          }
        });

        return result;
      },

      omit(...keys) {
        let result = {};

        Object.keys(element).forEach(key => {
          if (!keys.includes(key)) {
            result[key] = element[key];
          }
        });

        return result;
      },

      has(prop) {
        return prop in element;
      },

    };

    ['isElement', 'isArray', 'isObject', 'isFunction',
      'isBoolean', 'isString', 'isNumber'].forEach(method => {

      u[method] = function() {return _[method](element) };
    });

    return u;
  }

  _.extend = function(modifiedObj, ...objects) {
    for (let idx = objects.length -1; idx >= 0; idx -= 1) {
      let objBefore = idx > 0 ? objects[idx - 1] : modifiedObj;
      for (let key in objects[idx]) {
        objBefore[key] = objects[idx][key];
      }
    }

    return modifiedObj;
  };

  _.range = function(start, stop) {
      if (!stop) {
        [start, stop] = [0, start];
      }

      let result = [];
      for (; start < stop; start += 1) {
        result.push(start);
      }

      return result;
    };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  };

  _.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  _.isObject = function(obj) {
    return obj !== null &&
      (typeof obj === 'object' || typeof obj === 'function');
  };

  _.isFunction = function(obj) {
    return typeof obj === 'function';
  };

  _.isBoolean = function(value) {
    return typeof value === 'boolean' || value instanceof Boolean;
  };

  _.isString = function(value) {
    return toString.call(value) === '[object String]';
  };

  _.isNumber = function(value) {
    return toString.call(value) === '[object Number]';
  };

  window._ = _;
})();