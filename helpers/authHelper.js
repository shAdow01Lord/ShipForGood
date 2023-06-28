import bcrypt from 'bcrypt';

export const hashPassword = async(password) =>{ //register
    try{
        const saltRounds =10;
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword
    } catch(error){
        console.log(error);
    }
};

export const comparePassword = async(password,hashedPassword) =>{  //login
    return bcrypt.compare(password,hashedPassword);
}