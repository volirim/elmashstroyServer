import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/shared/public';
import { FeedbackService } from './feedback.service';

@Public()
@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) {}

    @Post()
    send(@Body() feedbackForm: Object): Promise<Object>  {
        return this.feedbackService.sendFeedback(feedbackForm);
    }
}
