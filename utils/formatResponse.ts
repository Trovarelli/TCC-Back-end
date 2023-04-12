export const checkGender = (gender: 'M' | 'F' | 'O') => {
    switch (gender) {
        case 'F':
            return 'a'
        case 'O':
            return 'e'
        default:
            return 'o(a)'
    }
}