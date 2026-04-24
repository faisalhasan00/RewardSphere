import { PrismaClient, UserRole, ConversionStatus, WithdrawalStatus } from '@prisma/client';

export class AdminRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Platform statistics overview.
   */
  async getDashboardStats() {
    const [counts, revenue] = await Promise.all([
      // Counts
      this.prisma.$transaction([
        this.prisma.user.count(),
        this.prisma.click.count(),
        this.prisma.conversion.count(),
        this.prisma.withdrawal.count({ where: { status: WithdrawalStatus.PENDING } })
      ]),
      // Revenue (Sum of total network commission)
      this.prisma.conversion.aggregate({
        where: { status: { in: [ConversionStatus.CONFIRMED, ConversionStatus.CREDITED] } },
        _sum: { networkCommission: true }
      })
    ]);

    return {
      totalUsers: counts[0],
      totalClicks: counts[1],
      totalConversions: counts[2],
      pendingWithdrawals: counts[3],
      totalRevenue: revenue._sum?.networkCommission || 0n
    };
  }

  /**
   * Filtered user list for management.
   */
  async getUsers(skip: number = 0, take: number = 20) {
    const [total, items] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          wallet: true
        }
      })
    ]);
    return { total, items };
  }
}
