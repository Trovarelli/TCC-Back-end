"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJobMatchField = exports.createCandidatoMatchField = void 0;
const createCandidatoMatchField = (candidato) => {
    const matchField = [];
    for (const key in candidato) {
        if (candidato.hasOwnProperty(key) && key !== 'userId' && key !== 'curriculo' && key !== 'texto' && key !== 'favorito' && key !== '_id') {
            let element = candidato[key];
            if (element && Array.isArray(element)) {
                element.forEach((e) => {
                    const splitedElement = String(e).split(' ');
                    splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`));
                });
            }
            if (element) {
                if (typeof element === 'boolean')
                    element = element ? 'sim' : 'nao';
                if (element === 'F' || element === 'M') {
                    if (element === 'F')
                        matchField.push('genero:feminino');
                    if (element === 'M')
                        matchField.push('genero:masculino');
                }
                else {
                    const splitedElement = String(element).split(' ');
                    splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`));
                }
            }
        }
    }
    const newCandidato = Object.assign(Object.assign({}, candidato), { matchField });
    return newCandidato;
};
exports.createCandidatoMatchField = createCandidatoMatchField;
const createJobMatchField = (job) => {
    const matchField = [];
    for (const key in job) {
        if (job.hasOwnProperty(key) && key !== 'userId' && key !== '_id' && key !== 'empresa' && key !== 'matchField') {
            let element = job[key];
            if (element && Array.isArray(element)) {
                element.forEach((e) => {
                    const splitedElement = String(e).split(' ');
                    splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`));
                });
            }
            if (element) {
                if (typeof element === 'boolean')
                    element = element ? 'sim' : 'nao';
                const splitedElement = String(element).split(' ');
                splitedElement.forEach((s) => matchField.push(`${key}:${s.toLowerCase()}`));
            }
        }
    }
    const newJob = Object.assign(Object.assign({}, job), { matchField });
    return newJob;
};
exports.createJobMatchField = createJobMatchField;
//# sourceMappingURL=makeMatchField.js.map