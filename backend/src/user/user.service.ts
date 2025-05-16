import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Bcrypt } from 'src/lib/bcrypt';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    if (createUserInput.password) {
      const hashedPassword = await Bcrypt.hash(createUserInput.password);
      createUserInput.password = hashedPassword;
    }
    const createdCat = new this.userModel(createUserInput);
    return createdCat.save();
  }

  async userCreateOrLogin(name: string, email: string): Promise<GetUserDto> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return new GetUserDto(
        user.id || user._id,
        user.name,
        user.email,
        user.createdAt,
        user.updatedAt,
      );
    } else {
      const user = await this.userModel.create({ name, email });
      return new GetUserDto(
        user.id || user._id,
        user.name,
        user.email,
        user.createdAt,
        user.updatedAt,
      );
    }
  }

  async findAll() {
    const users = await this.userModel.find({});
    return users;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('User was not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.userModel.findByIdAndUpdate(id, updateUserInput, {
      new: true,
    });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
