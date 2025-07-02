import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserRole } from "src/enums/user-role.enum";

//timestamps criar data de criação de update automaticamente(createAt/updateAt)
@Schema({timestamps: true})
export class User {

    @Prop({required:true})
    nomeDeUsuario: string;

    @Prop({unique:true, required:true})
    email: string;

    @Prop({required:true})
    senha: string;

    //abreviação de enumeration, limitar um campo a um conjuto fixo de valores
    @Prop({enum:UserRole, default:UserRole.USER})
    role: UserRole;

    @Prop({default:false})
    isBanned: boolean;

    @Prop()
    bio?: string;

    @Prop()
    avatar?: string;

}

export const UserSchema = SchemaFactory.createForClass(User);