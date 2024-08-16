import { Gender } from "../type"

const isString = (a: unknown): a is string => {
    return (typeof a === 'string' || a instanceof String)
}

const isGender = (a: string): a is Gender => {
    return Object.values(Gender).map(a => a.toString()).includes(a)
}

const isDate = (a: string) => {
    return Boolean(Date.parse(a))
}

const isDischarge = (a: unknown): a is object => {
    if ('date' in (a as object) && 'criteria' in (a as object)) return true
    return false
}


// PARSERS
export const genderParser = (a: unknown) => {
    if (isString(a) && isGender(a)) {
        return a
    }
    throw new Error('Gender is not in the correct format')
}

export const dateParser = (a: unknown) => {
    if (isString(a) && isDate(a)) {
        return a
    }
    throw new Error('Date is not in the correct format')
}

export const stringParser = (a: unknown) => {
    if (isString(a)) {
        return a
    }
    throw new Error('Some parameters are not in the correct format')
}

export const dischargeParser = (a: unknown) => {
    if (isDischarge(a)) {
        return a
    }
    throw new Error('Ssn is not in the correct format')
}


