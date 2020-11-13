# Validator
 Validate function arguments and general variables

### Examples

```javascript

const validate = require('@danisl99/validator')
const t = new validate('C2 constructor')

t.add('asd', 'string').minLength(5).maxLength(1).regex(/^[A-Za-z]+$/)
t.add(1, 'number').min(2).is(x => x < 0)
t.add({ header: 123 }, 'object').hasKey('header').nest({ header: { is: x => x < 0, type: 'string' } })
```