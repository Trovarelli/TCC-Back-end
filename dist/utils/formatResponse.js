"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processResume = void 0;
const fs = require('fs');
const pdf = require('pdf-parse');
// Função para processar o currículo em base64 e extrair informações
function processResume(base64Resume) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Converter a base64 para buffer
            const buffer = Buffer.from(base64Resume, 'base64');
            // Parse do PDF
            const data = yield pdf(buffer);
            // Extrair o texto do currículo
            const resumeText = data.text;
            // Extrair nome e idade (exemplo simplificado)
            const nameRegex = /Nome:\s+([^\n]+)/;
            const ageRegex = /Idade:\s+([0-9]+)/;
            const nameMatch = resumeText.match(nameRegex);
            const ageMatch = resumeText.match(ageRegex);
            const name = nameMatch ? nameMatch[1] : 'Nome não encontrado';
            const age = ageMatch ? parseInt(ageMatch[1], 10) : 'Idade não encontrada';
            // Extrair o restante do texto como dados gerais
            const generalData = resumeText;
            // Montar o objeto com as informações
            const resumeInfo = {
                name: name,
                age: age,
                generalData: generalData,
            };
            // Retornar o objeto com as informações
            return resumeInfo;
        }
        catch (error) {
            console.error('Erro ao processar o currículo:', error);
            return null;
        }
    });
}
exports.processResume = processResume;
