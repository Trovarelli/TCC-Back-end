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
exports.createCandidateController = exports.getCadidateController = void 0;
const repository_1 = require("../repository");
const getCadidateController = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, repository_1.findCandidates)();
        if (!user)
            return res.status(404).json({ message: "Candidato não encontrado" });
        res.status(200).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: "inválido" });
    }
});
exports.getCadidateController = getCadidateController;
const createCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { curriculum } = req.body;
    const candidate = {
        age: '22',
        curriculum,
        favorite: false,
        generalData: 'ASDJUIOIFBQEUJIPGFRBHQIP  	OURGBQEIPU´JGFHJÁOIFJÓIjf [p    jo´~aNS´FJKOsdnfo´jkSNDFO´JNSdfoj´h n',
        name: 'CIDO'
    };
    try {
        yield (0, repository_1.createCandidate)(candidate);
        res.status(201).json({ message: "candidato criado com sucesso!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Erro no servidor: ${error}` });
    }
});
exports.createCandidateController = createCandidateController;
