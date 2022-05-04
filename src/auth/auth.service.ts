import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserDTO, User } from 'src/models/User';
import { utils } from 'src/shared/utils';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    private readonly authorisedUsers: Map<string, IUserDTO> = new Map();
    
    private generateToken(): string {
        const payload = this.authorisedUsers.size + Math.random();
        return utils.md5(String(payload));
    }

    async login(loginDTO: {login: string, password: string}): Promise<{token: string}> {
        loginDTO.password = utils.md5(loginDTO.password);
        const user = await this.usersRepository.find(loginDTO);
        if (user.length === 0) {
            throw new ForbiddenException('Invalid login or password');
        }
        const token = this.generateToken();
        this.authorisedUsers.set(token, user[0]);
        return {token};
    }

    isAuthorised(token): boolean {
        return this.authorisedUsers.has(token);
    }
}
