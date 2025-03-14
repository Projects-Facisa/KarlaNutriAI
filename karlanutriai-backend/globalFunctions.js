export function verifyPassword(password){
    return [password.length >= 8,
        /[a-z]/.test(password), //Se há minusculo
        /[A-Z]/.test(password), //Se há maiusculo
        /\d/.test(password), //Se há digito
        /[@$!%*?&_-]/.test(password), //Se há caractere especial
    ].includes(false);
}

export function isEmail(email){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isBase64(str) {
    const base64Regex = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{2}==)?$/i;
    return base64Regex.test(str);
}