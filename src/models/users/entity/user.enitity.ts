import { UUID } from 'crypto';
import { Table, Column, Model, DataType, PrimaryKey, Default, Unique, NotNull, NotEmpty } from 'sequelize-typescript';

@Table
export class User extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    userId: UUID;

    @Column
    name : string;

    @Unique
    @NotEmpty
    @Column({
        allowNull: false,
    })
    email: string;

    @Column
    password : string;

    @Column
    number : string;

    @Column
    loginType : string;

    
    @Default(false)
    @Column
    emailVerified : boolean

    @Column({field : 'registerationTime'})
    createdAt? : Date
}