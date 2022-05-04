/* eslint-disable prettier/prettier */
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUpdateUser, IUserDTO, User } from 'src/models/User';
import { utils } from 'src/shared/utils';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

     constructor(
          @InjectRepository(User)
          private usersRepository: Repository<User>,
          private readonly mailerService: MailerService
     ){}

     async save(userDTO: IUserDTO): Promise<IUserDTO> {
          const emailUniq = (await this.usersRepository.find({email: userDTO.email})).length
          if (emailUniq > 0) {
               throw new BadRequestException('This email is already registered');
          }
          const loginUniq = (await this.usersRepository.find({login: userDTO.login})).length
          if (loginUniq > 0) {
               throw new BadRequestException('This login is already registered');
          }

          const password = utils.randomString(10);
          const user: User = {...userDTO, password: utils.md5(password) };
          const response = await this.usersRepository.save(user);
          
          this.mailerService.sendMail({
               to: user.email,
               text: `Здравствуйте, ${user.name}, ваш пароль: "${password}"`,
               subject: 'Пароль от сайта'
          });
          
          console.log(password);
          delete response['password'];
          return response; 
     }

     async findAll(): Promise<IUserDTO[]> {
          const users = await this.usersRepository.find();
          return users.map(user => {
                    delete user.password;
                    return user
               });
     }

     async update(user: IUpdateUser): Promise<IUserDTO> {
          if(user.password) {
               user.password = utils.md5(user.password);
          }
          const response = await this.usersRepository.save(user);
          delete response['password'];
          return response; 
          
     }
      
     async remove(login: string): Promise<void> {
          await this.usersRepository.delete({ login });
     }
}
