import { getRepository } from 'typeorm';
import md5 from 'crypto-js/md5';
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { User } from '../../entity/User'
import { UserSignIn } from './dtos/user.signin.dtos';
import { UserSignUp } from './dtos/user.signup.dtos';
import AppError from '../../shared/AppError';

export default class UserService {
  async signin(user: UserSignIn){
    const userRepository = getRepository(User);

       const {email, password} = user;
       const passwordHash = md5(password).toString();

       const existUser = await userRepository.findOne({where: {email, password: passwordHash}})

       if(!existUser){
         throw new AppError('User does not exist', 401);
       }

       const { secret, expiresIn } = authConfig.jwt;

       const token = sign({
           firstName: existUser.firstName,
           lastName: existUser.lastName,
           accountNumber: existUser.accountNumber,
           accountDigit: existUser.accountDigit,
           wallet: existUser.wallet
       }, secret, {
           subject: existUser.id,
           expiresIn,
       });

       delete existUser.password; // para funcionar criar @types\express e colocar "strictNullChecks": false, em tsconfig.json
        
       return {accessToken: token}
    }
  

  async signup(user: UserSignUp){
    const userRepository = getRepository(User);

    const existUser = await userRepository.findOne({where: {email: user.email}}) // saber se user existe 

    if(existUser){
      throw new AppError('User already exist', 401);
    }

    const userData = {
      ...user,
      password: md5(user.password).toString(),
      wallet: 5000,
      accountNumber: Math.floor(Math.random() * 999999),
      accountDigit: Math.floor(Math.random() * 99)
  }

  const userCreate =  await userRepository.save(userData);

        const { secret, expiresIn } = authConfig.jwt;
        
        const token = sign({
            firstName: user.firstName,
            lastName: user.lastName,
            accountNumber: userData.accountNumber,
            accountDigit: userData.accountDigit,
            wallet: userData.wallet
        }, secret, {
            subject: userCreate.id,
            expiresIn,
        });

        return {accessToken: token}
  

    
  }
}