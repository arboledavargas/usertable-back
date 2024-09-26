import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';

const createPrisma = () => {
    return new PrismaClient().$extends(withAccelerate());
};

export type PrismaClientType = ReturnType<typeof createPrisma>;

let _prisma: PrismaClientType | undefined;

const getPrisma = () => {
    if (!_prisma) {
        _prisma = createPrisma();
    }
    return _prisma;
};

export const prisma = getPrisma();