import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class ControllerController {
  constructor(private userService: UserService) {}

  @Post('register')
  // eslint-disable-next-line @typescript-eslint/ban-types
  create(@Body() user: User): Observable<Object> {
    console.log(user);
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
    // return this.userService.create();
  }

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/ban-types
  login(@Body() user: User): Observable<Object> {
    // return this.userService.login(user).pipe(
    //   map((jwt: string) => {
    //     return { access_token: jwt };
    //   }),
    return this.userService.login(user);
    // );
  }

  @Get(':id')
  findOne(@Param() params): Observable<User | string> {
    return this.userService.findOne(params.id);
  }

  // @hasRoles(UserRole.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('username') username: string,
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    if (username === null || username === undefined) {
      return this.userService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/users',
      });
    } else {
      return this.userService.paginateFilterByUsername(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:3000/api/users',
        },
        { username },
      );
    }
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.userService.deleteOne(Number(id));
  }

  // @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @Put('confirm-profile/:id')
  confirmAccount(@Param('id') id: string, @Body() user: User): any {
    return this.userService.confirmAccount(Number(id), user);
  }

  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put('reset-password/:id')
  updatePassword(@Param() params, @Body() user) {
    return this.userService.updatePassword(Number(params.id), user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Observable<User> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  // eslint-disable-next-line @typescript-eslint/ban-types
  uploadFile(@UploadedFile() file, @Request() req) {
    const user: User = req.user;
    // console.log(user);
    // console.log(file);
    return this.userService
      .updateOne(user.id, { profileImage: file.filename })
      .pipe(
        tap((user: User) => console.log(user)),
        map((user: User) => ({ profileImage: user.profileImage })),
      );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Observable<Object> {
    // console.log(imagename);
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
    );
  }
}
