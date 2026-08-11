import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^bg-[a-z]+-\d+$/, { message: 'Color must be a valid Tailwind background class like bg-blue-500' })
  color: string;
}
