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
exports.AddUserIdToPix1639037666018 = void 0;
const typeorm_1 = require("typeorm");
class AddUserIdToPix1639037666018 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.addColumn('pixs', new typeorm_1.TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true,
            }));
            yield queryRunner.createForeignKey('pixs', new typeorm_1.TableForeignKey({
                name: 'PixUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropForeignKey('pixs', 'PixUser');
            yield queryRunner.dropColumn('pixs', 'user_id');
        });
    }
}
exports.AddUserIdToPix1639037666018 = AddUserIdToPix1639037666018;
