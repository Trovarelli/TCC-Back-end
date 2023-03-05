"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGender = void 0;
const checkGender = (gender) => {
    switch (gender) {
        case 'F':
            return 'a';
        case 'O':
            return 'e';
        default:
            return 'o';
    }
};
exports.checkGender = checkGender;
