module.exports = function (name) {
    this.name = name
    this.position = 0
    this.val = null
    this.type = null
    this.prefix = 'Argument error in `' + name + '`: Argument #'
    this.stack = {};

    this.checkType = (val, type) => {
        if (Array.isArray(val) && type == 'array') return true
        if (typeof val != type) return false
        return true
    }

    this.add = (val, type, optional) => {
        this.val = val
        this.position++
        this.stack[this.position] = []
        this.type = type
        if (optional) {
            if (val != undefined) {
                if (!this.checkType(this.val, type)) this.stack[this.position].push('Expected type ' + type + ', got `' + typeof this.val + '`')
            }
        } else {
            if (!this.checkType(this.val, type)) this.stack[this.position].push('Expected type ' + type + ', got `' + typeof this.val + '`')
        }
        return this
    }


    this.minLength = (minLength) => {
        if (this.val.length < minLength) this.stack[this.position].push('Expected ' + typeof this.val + ' to have a minimum length of `' + minLength + '`, got `' + this.val.length + '`')
        return this
    }

    this.nest_minLength = (key, minLength) => {
        if (this.val[key].length < minLength) this.stack[this.position].push('Expected key `' + key + '` inside object to have a minimum length of `' + minLength + '`, got `' + this.val[key].length + '`')
        return this
    }

    this.maxLength = (maxLength) => {
        if (this.val.length > maxLength) this.stack[this.position].push('Expected ' + typeof this.val + ' to have a maximum length of `' + maxLength + '`, got `' + this.val.length + '`')
        return this
    }

    this.nest_maxLength = (key, maxLength) => {
        if (this.val[key].length > maxLength) this.stack[this.position].push('Expected key `' + key + '` inside object to have a maximum length of `' + maxLength + '`, got `' + this.val[key].length + '`')
        return this
    }

    this.isLength = (length) => {
        if (this.val.length != length) this.stack[this.position].push('Expected ' + typeof this.val + ' to have a length of `' + length + '`, got `' + this.val.length + '`')
        return this
    }

    this.nest_isLength = (key, length) => {
        if (this.val[key].length != length) this.stack[this.position].push('Expected key `' + key + '` inside object to have a length of `' + length + '`, got `' + this.val[key].length + '`')
        return this
    }

    this.regex = (regex) => {
        if (!this.val.match(regex)) this.stack[this.position].push('did not pass regex validation `' + regex + '`')
        return this
    }

    this.nest_regex = (key, regex) => {
        if (!this.val[key].match(regex)) this.stack[this.position].push('key `' + key + '` inside object did not pass regex validation `' + regex + '`')
        return this
    }

    this.min = (min) => {
        if (this.val < min) this.stack[this.position].push('Expected ' + typeof this.val + ' to not be smaller than `' + min + '`, got `' + this.val + '`')
        return this
    }

    this.nest_min = (key, min) => {
        if (this.val[key] < min) this.stack[this.position].push('Expected key `' + key + '` inside object to not be smaller than `' + min + '`, got `' + this.val[key] + '`')
        return this
    }

    this.max = (max) => {
        if (this.val > max) this.stack[this.position].push('Expected ' + typeof this.val + ' to not be larger than `' + max + '`, got `' + this.val + '`')
        return this
    }

    this.nest_max = (key, max) => {
        if (this.val[key] > max) this.stack[this.position].push('Expected key `' + key + '` inside object to not be larger than `' + max + '`, got `' + this.val[key] + '`')
        return this
    }

    this.equal = (amount) => {
        if (this.val != amount) this.stack[this.position].push('Expected ' + typeof this.val + ' to be `' + amount + '`, got `' + this.val + '`')
        return this
    }

    this.nest_equal = (key, amount) => {
        if (this.val[key] != amount) this.stack[this.position].push('Expected key `' + key + '` inside object to be `' + amount + '`, got `' + this.val[key] + '`')
        return this
    }

    this.hasKey = (key) => {
        if (!this.val[key]) this.stack[this.position].push('Expected ' + typeof this.val + ' to have key `' + key + '`')
        return this
    }

    this.nest_hasKey = (key, childKey) => {
        if (!this.val[key][childKey]) this.stack[this.position].push('Expected key `' + key + '` inside object to have key `' + childKey + '`')
        return this
    }

    this.is = (fn) => {
        if (!fn(this.val)) this.stack[this.position].push('Expected ' + typeof this.val + ' to pass custom validation')
        return this
    }

    this.nest_is = (key, fn) => {
        if (!fn(this.val[key])) this.stack[this.position].push('Expected key `' + key + '` inside object to pass custom validation')
        return this
    }

    this.type = (type) => {
        if (!this.checkType(this.val, type)) this.stack[this.position].push('Expected type ' + type + ', got `' + typeof this.val + '`')
        return this
    }

    this.nest_type = (key, type) => {
        if (!this.checkType(this.val[key], type)) this.stack[this.position].push('Expected type of key `' + key + '` inside object to be ' + type + ', got `' + typeof this.val[key] + '`')
        return this
    }

    this.nest = (object) => {
        for (const key in object) {
            for (const checkKey in object[key]) {
                this['nest_' + checkKey](key, object[key][checkKey])
            }
        }
        return this
    }

    this.out = (cb) => {
        for (const position in this.stack) {
            if (this.stack[position].length > 0) cb(this.prefix + position, this.stack[position])
        }
    }
}