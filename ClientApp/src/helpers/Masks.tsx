// 000.000.000-00
export const maskCPF = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
}

// (00) 00000-0000
export  const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})(\d)/, "$1-$2")
}

// 00000-000
export const maskCEP = (value: string) => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2")
}

// 00/00/0000
export const maskDate = (value: string) => {
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1")
}

// 0000-00-00
export const maskDateReverse = (value: string) => {
    return value
        .replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3-$2-$1")
}

// Aceita apenas que letras sejam digitadas
export const maskOnlyLetters = (value: string) => {
    return value.replace(/[0-9!@#¨$%^&*)(+=._-]+/g, "")
}

// Aceita apenas números
export const maskOnlyNumbers = (value: string) => {
    return value.replace(/\D/g, "")
}

// Validação de e-mail
export const emailIsValid = (value: string) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(value);
}