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
exports.findUserByEmail = exports.findUserById = exports.createUser = void 0;
const models_1 = require("../models");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, company } = user;
    const userModel = new models_1.User({
        name, email, password, company
    });
    return models_1.User.create(userModel);
});
exports.createUser = createUser;
const findUserById = (id, exclude) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findById(id, exclude);
});
exports.findUserById = findUserById;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return models_1.User.findOne({ email });
});
exports.findUserByEmail = findUserByEmail;
