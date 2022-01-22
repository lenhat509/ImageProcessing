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
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const images = express_1.default.Router();
images.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const filename = query.filename;
    const width = parseInt(query.width);
    const height = parseInt(query.height);
    const myPath = `images/full/${filename}.jpg`;
    if (fs_1.default.existsSync(myPath)) {
        const newFile = `images/thumb/${filename}_${width}_${height}.jpg`;
        if (!fs_1.default.existsSync(newFile)) {
            yield (0, sharp_1.default)(myPath)
                .resize(width, height)
                .toFile(newFile);
            res.sendFile(path_1.default.resolve(newFile));
        }
        else {
            res.sendFile(path_1.default.resolve(newFile));
        }
    }
    else {
        res.sendStatus(404);
    }
}));
exports.default = images;
