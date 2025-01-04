import { Module } from '@nestjs/common';
import { PlayListController } from './play-list.controller';
import { PlayListService } from './play-list.service';
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [PlayListController],
  providers: [PlayListService],
  imports: [AuthModule]
})
export class PlayListModule {}
