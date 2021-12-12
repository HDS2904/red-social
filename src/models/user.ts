import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const rolesDisp = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const userSchema = new Schema ({
    username: {
        type: String,
		unique: true,
        required: [true, 'El username de usuario es necesario']
    },
    firstName: {
        type: String,
		default: null
    },
    lastName: {
		type: String,
		default: null
    },
	image: {
        type: String,
		default: null
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario'],
        lowercase: true,    //minuscula
        trim: true  //caso de otro correo con espacios
    },
    password: {
        type: String,
        required: [true, 'La contraseña debe ser digitada']
    },
    isStaff: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesDisp
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{
    versionKey:false,
    timestamps: true
})

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password
    return userObject;
}

userSchema.pre<IUser>('save', async function(next) {
    const user = this;
    if( !user.isModified('password') ) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password,salt);
    user.password = hash;
    next();
});

userSchema.methods.comparePassword = async function ( password: String ): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
}

export interface IUser extends Document {
    username: String;
    firstName: String;
    lastName: String;
	image: String,
    email: String;
    password: String;
    isStaff: String;
    isActive: Boolean;
    comparePassword: (param: String) => Promise<boolean>
}

export default model<IUser>('User', userSchema);