export function hashPassword(password) {
    let hash = 0
    for (let i = 0; i < password.length; i++) {
        let chr = password.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }

    return hash
}
