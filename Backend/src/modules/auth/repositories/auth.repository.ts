import { PrismaClient, User } from '@prisma/client';
import { BaseRepository } from '../../../core/base/BaseRepository';

export class AuthRepository extends BaseRepository<User> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async findByReferralCode(code: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { referralCode: code } });
  }

  async incrementLoginAttempts(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error('User not found');

    const attempts = user.loginAttempts + 1;
    let lockUntil = user.lockUntil;

    if (attempts >= 5) {
      lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock
    }

    return this.prisma.user.update({
      where: { id },
      data: { loginAttempts: attempts, lockUntil },
    });
  }

  async resetLoginAttempts(id: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { loginAttempts: 0, lockUntil: null },
    });
  }
}
