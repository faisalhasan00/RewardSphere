/**
 * Utility for money calculations using paise (BigInt) to ensure financial accuracy.
 * Rules:
 * - Store all monetary values in smallest unit (paise/cents).
 * - Avoid floating point calculations.
 * - Always round down cashback amounts.
 */
export class MoneyUtil {
  /**
   * Converts a decimal amount (e.g., 100.50) to BigInt paise (10050).
   */
  static toPaise(amount: number | string | BigInt): bigint {
    if (typeof amount === 'bigint') return amount;
    
    // Using string manipulation to avoid floating point issues during conversion
    const parts = amount.toString().split('.');
    const rupees = BigInt(parts[0] || '0');
    let paise = BigInt(0);
    
    if (parts[1]) {
      const paiseStr = parts[1].padEnd(2, '0').substring(0, 2);
      paise = BigInt(paiseStr);
    }
    
    return rupees * 100n + paise;
  }

  /**
   * Converts BigInt paise (10050) back to decimal number (100.50).
   * Note: Use only for display, not for calculations.
   */
  static toDecimal(paise: bigint): number {
    return Number(paise) / 100;
  }

  /**
   * Formats paise as a currency string (e.g., ₹100.50).
   */
  static format(paise: bigint, currency: string = '₹'): string {
    return `${currency}${this.toDecimal(paise).toFixed(2)}`;
  }

  /**
   * Calculates the user's portion based on the 30% share rule.
   * "Always round down cashback amounts"
   */
  static calculateUserCashback(networkCommissionPaise: bigint): bigint {
    // 30% of commission
    // Formula: (commission * 30) / 100
    // Using integer division automatically floors/rounds down
    return (networkCommissionPaise * 30n) / 100n;
  }

  /**
   * Calculates the platform's portion based on the 70% share rule.
   */
  static calculatePlatformCommission(networkCommissionPaise: bigint): bigint {
    return (networkCommissionPaise * 70n) / 100n;
  }
}
