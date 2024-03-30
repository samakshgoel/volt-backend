import { UUID } from "crypto";
import { Model, Table, Column, PrimaryKey, Default, DataType } from "sequelize-typescript";


@Table({timestamps : false})
export class ProductCategoryAssociation extends Model {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    productCategoryAssociationId: UUID;

    @Column({ allowNull: false })
    categoryId: UUID;

    @Column({ allowNull: false })
    productId: UUID;

    @Default(true)
    @Column
    associationStatus : boolean

}

