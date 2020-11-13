module.exports = function (name) {
    this.name = name
    this.position = 0
    this.val = null
    this.type = null
    this.prefix = 'ArgumentError in ' + name + ': Argument #'

    this.utils = {
        checkType: (val, type) => {
            if (Array.isArray(val) && type == 'array') return true
            if (typeof val != type) return false
            return true
        }
    }

    this.add = (val, type) => {
        this.val = val
        this.position++
        this.type = type
        if (!this.utils.checkType(this.val, type)) console.error(this.prefix + this.position + ' Expected type ' + type + ', got `' + typeof this.val + '`')
        return this
    }

    this.minLength = (minLength) => {
        if (this.val.length < minLength) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to have a minimum length of `' + minLength + '`, got `' + this.val.length + '`')
        return this
    }

    this.nest_minLength = (key, minLength) => {
        if (this.val[key].length < minLength) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to have a minimum length of `' + minLength + '`, got `' + this.val[key].length + '`')
        return this
    }

    this.maxLength = (maxLength) => {
        if (this.val.length > maxLength) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to have a maximum length of `' + maxLength + '`, got `' + this.val.length + '`')
        return this
    }

    this.nest_maxLength = (key, maxLength) => {
        if (this.val[key].length > maxLength) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to have a maximum length of `' + maxLength + '`, got `' + this.val[key].length + '`')
        return this
    }

    this.isLength = (length) => {
        if (this.val.length != length) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to have a length of `' + length + '`, got `' + this.val.length + '`')
        return this
    }

    this.nest_isLength = (key, length) => {
        if (this.val[key].length != length) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to have a length of `' + length + '`, got `' + this.val[key].length + '`')
        return this
    }

    this.regex = (regex) => {
        if (!this.val.match(regex)) console.error(this.prefix + this.position + ' did not pass regex validation `' + regex + '`')
        return this
    }

    this.nest_regex = (key, regex) => {
        if (!this.val[key].match(regex)) console.error(this.prefix + this.position + ' key `' + key + '` inside object did not pass regex validation `' + regex + '`')
        return this
    }

    this.min = (min) => {
        if (this.val < min) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to not be smaller than `' + min + '`, got `' + this.val + '`')
        return this
    }

    this.nest_min = (key, amount) => {
        if (this.val[key] < min) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to not be smaller than `' + min + '`, got `' + this.val[key] + '`')
        return this
    }

    this.max = (max) => {
        if (this.val > max) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to not be larger than `' + max + '`, got `' + this.val + '`')
        return this
    }

    this.nest_max = (key, amount) => {
        if (this.val[key] > max) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to not be larger than `' + max + '`, got `' + this.val[key] + '`')
        return this
    }

    this.equal = (amount) => {
        if (this.val != amount) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to be `' + amount + '`, got `' + this.val + '`')
        return this
    }

    this.nest_equal = (key, amount) => {
        if (this.val[key] != amount) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to be `' + amount + '`, got `' + this.val[key] + '`')
        return this
    }

    this.hasKey = (key) => {
        if (!this.val[key]) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to have key `' + key + '`')
        return this
    }

    this.nest_hasKey = (key, childKey) => {
        if (!this.val[key][childKey]) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to have key `' + childKey + '`')
        return this
    }

    this.is = (fn) => {
        if (!fn(this.val)) console.error(this.prefix + this.position + ' Expected ' + typeof this.val + ' to pass custom validation')
        return this
    }

    this.nest_is = (key, fn) => {
        if (!fn(this.val[key])) console.error(this.prefix + this.position + ' Expected key `' + key + '` inside object to pass custom validation')
        return this
    }

    this.type = (type) => {
        if (!this.utils.checkType(this.val, type)) console.error(this.prefix + this.position + ' Expected type ' + type + ', got `' + typeof this.val + '`')
        return this
    }

    this.nest_type = (key, type) => {
        if (!this.utils.checkType(this.val[key], type)) console.error(this.prefix + this.position + ' Expected type of key `' + key + '` inside object to be ' + type + ', got `' + typeof this.val[key] + '`')
        return this
    }

    this.nest = (object) => {
        for (const key in object) {
            for (const checkKey in object[key]) {
                this['nest_' + checkKey](key, object[key][checkKey])
            }
        }
    }
}