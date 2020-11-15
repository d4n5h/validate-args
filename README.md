# Validator
 Validate function arguments and general variables

### Example

```javascript

const validate = require('arguments-validate')

function test() {
    const v = new validate('Test function')
    v.add(obj, 'object').hasKey('header').nest({ header: { type: 'object' } })
        .add(cb, 'function', true) // Optional argument
        .out((pre, errors) => console.error(pre, errors))
    }
}

test({body:123},'123')
```