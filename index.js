"use strict"

const arrify = require("arrify")
const classChain = require("class-chain")
const caseInsensitive = require("case-insensitive")
const flatten = require("@flatten/array")
const isFunc = require("@is-(unknown)/is-function")
const isObject = require("is-obj")
const qfn = require("qfn")
const sbo = require("support-bind-operator")
const FALSE = require("false-value")()
const not = require("es-logical-not-operator")
const ArrayCtor = require("@stdlib/array-ctors")("generic")
const typeOf = require("es-typeof")
const Switch = require("switch-in-fp").Switch
const { TYPE, OBJECT_STRING_TAG } = require("@extremejs/utils")
const and = require("es-logical-and-operator")
const or = require("es-logical-or-operator")
const equal = require("@10xly/strict-equals")
const isArray = require("isarray")
const { immediateError, ErrorType } = require("immediate-error")

module.exports = sbo(function isInstanceOf(x, classes, { ci = FALSE } = {}) {
  if (not(isObject(x))) return FALSE
  ci = qfn(caseInsensitive, ci)
  const actualClassNames = ci(classChain.names(x))
  return flatten(arrify(classes)).some((cls) => {
    let result
    Switch(typeOf(cls))
      .case(TYPE.FUNCTION, () => {
        if (and(not(isFunc(x), equal(cls, ArrayCtor)))) {
          result = isArray(x)
        } else {
          result = or(x instanceof cls, and(cls.name, actualClassNames.includes(cls.name)))
        }
      })
      .case(TYPE.STRING, () => {
        if (and(not(isFunc(x), equal(ci(OBJECT_STRING_TAG.ARRAY), cls)))) result = isArray(x)
        result = actualClassNames.includes(ci(cls))
      })
      .case(TYPE.UNDEFINED, () =>{
        result = FALSE
      }).else(() => {
        immediateError("Class must be a function or a name string", ErrorType.TypeError)
      }).execute()

    return result
  })
})
