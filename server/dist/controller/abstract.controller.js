"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
class AbstractController {
    _addMetaData(data) {
        return {
            numberOfResults: data.length,
            accessedOn: new Date(),
            data: data
        };
    }
}
exports.AbstractController = AbstractController;
