import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
          userId: 1,
          username: 'admin',
          password: bcrypt.hashSync('password123'), // In a real-world scenario, store hashed passwords
        },
      ];
    
      async findByUsername(username: string): Promise<User | undefined> {
        return this.users.find((user) => user.username === username);
      }
    
      async findById(userId: number): Promise<User | undefined> {
        return this.users.find((user) => user.userId === userId);
      }
}
