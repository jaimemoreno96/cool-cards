import bcrypt from "bcryptjs";


const SALT = 10;
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};