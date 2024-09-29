import { PrismaClient } from "@prisma/client";

const createPrisma = () => {
    return new PrismaClient();
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