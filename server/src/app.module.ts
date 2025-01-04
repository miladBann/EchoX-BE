import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { PlayListModule } from './play-list/play-list.module';
import { KeysModule } from './keys/keys.module';
import { InfoModule } from './info/info.module';
import { StreamModule } from './stream/stream.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [SearchModule, PlayListModule, KeysModule, InfoModule, StreamModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
