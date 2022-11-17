import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/service/auth.service';
import { Like, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User, UserRole } from '../models/user.interface';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from 'src/mail/service/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      // tap((e) => console.log(e)
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.role = UserRole.USER;
        newUser.confirmToken = uuidv4();
        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            if (
              this.mailService.sendUserConfirmation(
                newUser.confirmToken,
                newUser.name,
                newUser.email,
              )
            ) {
              const { password, ...result } = user;
              return result;
            }
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }
  // async create() {
  //   await this.mailService.sendUserConfirmation();
  // }

  findOne(id: number): Observable<User | string> {
    return from(
      this.userRepository.findOne({
        where: { id: id },
        relations: ['blogEntries'],
      }),
    ).pipe(
      map((user: User) => {
        if (user) {
          const { password, ...result } = user;
          return result;
        }
      }),
    );
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }

  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
      map((usersPageable: Pagination<User>) => {
        usersPageable.items.forEach(function (v) {
          delete v.password;
        });
        return usersPageable;
      }),
    );
  }

  paginateFilterByUsername(
    options: IPaginationOptions,
    user: User,
  ): Observable<Pagination<User>> {
    return from(
      this.userRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { id: 'ASC' },
        select: ['id', 'name', 'username', 'email', 'role'],
        relations: ['blogEntries'],
        where: [{ username: Like(`%${user.username}%`) }],
      }),
    ).pipe(
      map(([users, totalUsers]) => {
        const usersPageable: Pagination<User> = {
          items: users,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalUsers / Number(options.limit),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: users.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalUsers,
            totalPages: Math.ceil(totalUsers / Number(options.limit)),
          },
        };
        return usersPageable;
      }),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }

  updateOne(id: number, user: User): Observable<any> {
    // delete user.email;
    delete user.password;
    delete user.role;
    console.log(id, user);

    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  async confirmAccount(id: number, user: User) {
    console.log(user);
    const currentUser = await this.userRepository.findOne({
      where: { id: id },
    });
    if (
      currentUser.confirmToken == user.confirmToken &&
      currentUser.isConfirmed == 0
    ) {
      const confirmAcc = await this.userRepository.update(id, {
        isConfirmed: 1,
      });
      if (confirmAcc) {
        return true;
      }
    } else if (currentUser.isConfirmed == 1) {
      throw new HttpException(
        'This account is already confirmed',
        HttpStatus.FORBIDDEN,
      );
    } else {
      throw new HttpException('Error', HttpStatus.FORBIDDEN);
    }
  }

  updateRoleOfUser(id: number, user: User): Observable<any> {
    return from(this.userRepository.update(id, user));
  }

  updatePassword(id, user) {
    return this.validateUserPasswords(id, user.oldPassword).pipe(
      switchMap((match) => {
        if (match) {
          return from(this.authService.hashPassword(user.newPassword)).pipe(
            map((hash) => {
              return this.userRepository.update(id, { password: hash });
            }),
          );
        } else {
          throw new HttpException('Not found', HttpStatus.FORBIDDEN);
        }
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  login(user: User): Observable<Object> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService.generateJWT(user).pipe(
            map((access_token: string) => {
              return { access_token, user };
            }),
          );
        } else {
          return 'Wrong credentials';
        }
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: { email: email },
        select: [
          'id',
          'password',
          'name',
          'username',
          'email',
          'role',
          'profileImage',
        ],
        relations: ['subscription'],
      }),
    ).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              const { password, ...result } = user;
              return result;
            } else {
              throw new HttpException('Not found', HttpStatus.FORBIDDEN);
            }
          }),
        ),
      ),
    );
  }

  validateUserPasswords(id: number, password: string): Observable<any> {
    return from(
      this.userRepository.findOne({
        where: { id: id },
        select: ['password'],
      }),
    ).pipe(
      switchMap((user) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            return match;
            // if (match) {
            //   // const { password, ...result } = user;
            //   return user;
            // } else {
            //   throw new HttpException('Not found', HttpStatus.FORBIDDEN);
            // }
          }),
        ),
      ),
    );
  }

  findByEmail(email: string): Observable<User> {
    return from(this.userRepository.findOneBy({ email }));
  }
}
