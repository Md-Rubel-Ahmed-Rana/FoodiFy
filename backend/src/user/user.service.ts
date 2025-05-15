import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { Bcrypt } from 'src/lib/bcrypt';

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

  async findAll() {
    const users = await this.userModel.find({});
    return users;
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
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
