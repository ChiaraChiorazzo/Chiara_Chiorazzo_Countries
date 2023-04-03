
export function validate(obj) {
    const regexName= /^[a-zA-Z ]+$/

    let objErrors = {
    }
    if (!obj.name) {
        objErrors.name = "Name is required"
    } else if (obj.name.length < 3) {
        objErrors.name = "The name must have at least 3 or more characteres"
    } else if (obj.name.length > 25) {
        objErrors.name = "The name can't have more than 15 characteres"
    }else if (!regexName.test(obj.name)) {
        objErrors.name = "The name cannot contain  special characters or numbers"
    }

    if (!obj.dificulty) {
        objErrors.dificulty = "Difficulty must be between 1 and 5"
    }
    if (!obj.duration) {
        objErrors.duration = "Duration is required"
    } else if (obj.duration > 24 || obj.duration < 0) {
        objErrors.duration = "Duration should be between 1 and 24 hours"
    }
    if (!obj.season) {
        objErrors.season = "Season in required"
    }
   
    if (!obj.country.length) {
        objErrors.country = "You must choose at least one country"
    }
    return objErrors
}