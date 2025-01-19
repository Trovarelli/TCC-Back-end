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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askGeralQuestions = void 0;
const openai_1 = __importDefault(require("openai"));
function askGeralQuestions(curriculo, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const openai = new openai_1.default({
            apiKey: key
        });
        const prompt = `
    Analyze the following resume and extract the requested information. Structure the response as a JSON object. If a field is not found, use the default values or leave it empty as indicated.

    Resume:
    ${curriculo}

    Respond with JSON only (strict format):
    {
      "name": string (The person's name, or empty if not provided),
      "age": number (Age in years. If provided as a date of birth, calculate the age up to the current year. Use 0 if not provided),
      "email": string (The person's email, or empty if not found),
      "experience": string[] (An array of professional experiences, or empty if none found),
      "phone": string[] (An array of phone numbers, or empty if none found),
      "gender": string ("M" for male, "F" for female, or empty if not specified),
      "profession": string (The person's profession, or empty if not provided),
      "traits": string[] (An array of personal traits or soft skills, such as resilient, competitive, etc., or empty if none found),
      "pcd": boolean (True if the person is identified as having a disability, false otherwise),
      "education": string[] (An array of educational qualifications, or empty if none found),
      "skills": string[] (An array of technical skills, or empty if none found),
      "lgbtq": boolean (True if the person identifies as LGBTQIA+, false otherwise),
      "professionalLevel": "intern" | "junior" | "mid" | "senior" (Determine based on the total years of experience in technology: 0-1 year = "intern", 1-2 years = "junior", 2-5 years = "mid", 5+ years = "senior")
    }
  `;
        const chatCompletion = yield openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt.trim() }],
            model: 'gpt-3.5-turbo',
        });
        return formatResponse((chatCompletion.choices[0].message.content) || '');
    });
}
exports.askGeralQuestions = askGeralQuestions;
const formatResponse = (response) => {
    try {
        return JSON.parse(response);
    }
    catch (_a) {
        const jsonStart = response.indexOf("{");
        const jsonEnd = response.lastIndexOf("}");
        if (jsonStart !== -1 && jsonEnd !== -1) {
            const formattedResponse = response.slice(jsonStart, jsonEnd + 1);
            return JSON.parse(formattedResponse);
        }
        throw new Error('Não foi possível extrair as informações do curriculo, por favor, tente novamente.');
    }
};
//# sourceMappingURL=askGeralQuestions.js.map