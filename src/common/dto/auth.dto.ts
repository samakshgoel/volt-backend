import { IsString, IsInt , IsEmail, IsOptional, IsNotEmpty, IsEnum, Length, IsPhoneNumber} from 'class-validator';



enum LOGIN_ENUM {
  'google',
   'password'
}

export class UserSignUpDTO {

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    readonly email :  string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    readonly password? : string;

    @IsPhoneNumber('IN')
    @IsOptional()
    @IsNotEmpty()
    readonly number? : number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(LOGIN_ENUM)
    readonly loginType : string;

}

export class UserSignDTO {

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email :  string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly password? : string;


  @IsString()
  @IsNotEmpty()
  @IsEnum(LOGIN_ENUM)
  readonly loginType : string;
}
