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
const typeorm_1 = require("typeorm");
const pix_1 = require("../../utils/pix");
const User_1 = require("../../entity/User");
const Pix_1 = require("../../entity/Pix");
const AppError_1 = __importDefault(require("../../shared/AppError"));
class PixService {
    request(value, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixRepository = (0, typeorm_1.getRepository)(Pix_1.Pix);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const currentUser = yield userRepository.findOne({ where: { id: user.id } });
            const requestData = {
                requestingUser: currentUser,
                value,
                status: 'open',
            };
            const register = yield pixRepository.save(requestData);
            const key = (0, pix_1.encodeKey)(user.id || '', value, register.id);
            return key;
        });
    }
    pay(key, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyDecoded = (0, pix_1.decodeKey)(key);
            if (keyDecoded.userId === user.id) {
                throw new AppError_1.default("Não é possivel receber o PIX do mesmo usuário", 401);
            }
            const pixRepository = (0, typeorm_1.getRepository)(Pix_1.Pix);
            const userRepository = (0, typeorm_1.getRepository)(User_1.User);
            const requestingUser = yield userRepository.findOne({ where: { id: keyDecoded.userId } });
            const payingUser = yield userRepository.findOne({ where: { id: user.id } });
            if ((payingUser === null || payingUser === void 0 ? void 0 : payingUser.wallet) && payingUser.wallet < Number(keyDecoded.value)) {
                throw new AppError_1.default('Não há saldo suficiente para fazer o pagamento', 401);
            }
            if (!requestingUser || !payingUser) {
                throw new AppError_1.default('Não encontramos os clientes da transação, gere uma nova chave', 401);
            }
            requestingUser.wallet = Number(requestingUser === null || requestingUser === void 0 ? void 0 : requestingUser.wallet) + Number(keyDecoded.value);
            yield userRepository.save(requestingUser);
            payingUser.wallet = Number(payingUser === null || payingUser === void 0 ? void 0 : payingUser.wallet) - Number(keyDecoded.value);
            yield userRepository.save(payingUser);
            const pixTransaction = yield pixRepository.findOne({ where: { id: keyDecoded.registerId, status: 'open' } });
            if (!pixTransaction) {
                throw new AppError_1.default('Chave inválida par pagamento', 401);
            }
            pixTransaction.status = 'close';
            pixTransaction.payingUser = payingUser;
            yield pixRepository.save(pixTransaction);
            return { msg: 'Pagamento efetudo com sucesso' };
        });
    }
    transactions(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const pixRepository = (0, typeorm_1.getRepository)(Pix_1.Pix);
            const pixReceived = yield (yield pixRepository.find({ where: { requestingUser: user.id, status: 'close' }, relations: ['payingUser'] }));
            const pixPaying = yield pixRepository.find({ where: { payingUser: user.id, status: 'close' }, relations: ['requestingUser'] });
            const received = pixReceived.map(transaction => ({
                value: transaction.value,
                user: {
                    firstname: transaction.payingUser.firstName,
                    lastName: transaction.payingUser.lastName,
                },
                updated_at: transaction.updated_at,
                type: 'received'
            }));
            const paying = pixPaying.map(transaction => ({
                value: transaction.value,
                user: {
                    firstname: transaction.requestingUser.firstName,
                    lastName: transaction.requestingUser.lastName,
                },
                updated_at: transaction.updated_at,
                type: 'paid'
            }));
            const allTransactions = received.concat(paying);
            allTransactions.sort(function (a, b) {
                const dateA = new Date(a.updated_at).getTime();
                const dateB = new Date(b.updated_at).getTime();
                return dateA < dateB ? 1 : -1;
            });
            return allTransactions;
        });
    }
}
exports.default = PixService;
