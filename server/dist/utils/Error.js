"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbbidenResourceMutation = exports.ResourceNotFound = exports.ResourceAlreadyExist = void 0;
class ResourceAlreadyExist extends Error {
}
exports.ResourceAlreadyExist = ResourceAlreadyExist;
class ResourceNotFound extends Error {
}
exports.ResourceNotFound = ResourceNotFound;
class ForbbidenResourceMutation extends Error {
}
exports.ForbbidenResourceMutation = ForbbidenResourceMutation;
