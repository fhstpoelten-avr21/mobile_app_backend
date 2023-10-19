import { User } from '../../user/user.entity';

export interface TodoDto {
  id?: string;
  title: string;
  completed: boolean;
  user?: User;
}
