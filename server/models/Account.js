"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const AccountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    accessToken: {
        type: String,
        required: true,
    },
    itemId: {
        type: String,
        required: true
    },
    institutionId: {
        type: String,
        required: true
    },
    institutionName: {
        type: String
    },
    accountName: {
        type: String
    },
    accountType: {
        type: String
    },
    accountSubType: {
        type: String
    }
});
exports.Account = mongoose_1.default.model('account', AccountSchema);
