import { diagnosesData } from "../data";
import { NewEntry, NewPatientEntry } from "../type";
import { dateParser, genderParser, stringParser} from "../util/typeGuard";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Missing payload')
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        const dateOfBirth = dateParser(object.dateOfBirth)
        const ssn = stringParser(object.ssn)
        const gender = genderParser(object.gender)
        const occupation = stringParser(object.occupation)
        const name = stringParser(object.name)
        return ({name, dateOfBirth, ssn, gender, occupation})
    }
    throw new Error('Missing parameters')
}

export const toNewEntry = (object: unknown): NewEntry | undefined => {
    if (!object || typeof object !== 'object') {
        throw new Error('Missing payload')
    }
    if ('type' in object && 'date' in object && 'specialist' in object && 'description' in object) {
        const date = dateParser(object.date)
        const description = stringParser(object.description)
        const specialist = stringParser(object.specialist)
        const type = object.type

        switch (type) {
            case 'Hospital':
                if ('code' in object && 'dischargeDate' in object && 'dischargeCriteria' in object) {
                    const dischargeDate = stringParser(object.dischargeDate)
                    const dischargeCriteria = stringParser(object.dischargeCriteria)
                    const diagnosesCodes = stringParser(object.code).split(', ')
                    const discharge = {date: dischargeDate, criteria: dischargeCriteria}
                    if (diagnosesCodes && diagnosesCodes.map(a => diagnosesData.map(a => a.code).includes(a)).includes(false)) {
                        throw new Error('Invalid diagnoses code')
                    }
                    return {type, date, description, specialist, discharge, diagnosesCodes}
                }
                break;
            case 'OccupationalHealthcare':
                if ('employerName' in object && 'sickLeaveStart' in object && 'sickLeaveEnd' in object && 'code' in object) {
                    const employerName = stringParser(object.employerName)
                    const sickLeaveStart = dateParser(object.sickLeaveStart)
                    const sickLeaveEnd = dateParser(object.sickLeaveEnd)
                    const sickLeave = {startDate: sickLeaveStart, endDate: sickLeaveEnd}
                    const diagnosesCodes = object.code ? stringParser(object.code).split(', ') : undefined
                    if (diagnosesCodes && diagnosesCodes.map(a => diagnosesData.map(a => a.code).includes(a)).includes(false)) {
                        throw new Error('Invalid diagnoses code')
                    }
                    return {type, date, description, specialist, employerName, sickLeave, diagnosesCodes}
                }
                break;
            case 'HealthCheck':
                if ('healthCheckRating' in object){
                    const healthCheckRating = object.healthCheckRating ? Number(object.healthCheckRating) : undefined
                    return {type, date, description, specialist, healthCheckRating}
                }
                break;
            default: 
                throw new Error('Wrong type')            
        }
        throw new Error('Wrong type')
    }
}