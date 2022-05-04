import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly mailerService: MailerService,
    ) {}

    async sendFeedback(feedbackForm: Object): Promise<Object> {
        const users = await this.usersRepository.find();
        let message = 'Новое сообщение:\n'; 
          for (const [key, value] of Object.entries(feedbackForm)) {
            message += `${key}: ${value}\n`;
        }
        users.map(user=> {
            this.mailerService.sendMail({
                to: user.email,
                text: message,
                subject: "Обратная Связь",
            });
        });
        return feedbackForm;
    }
}
