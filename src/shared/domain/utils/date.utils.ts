export class DateUtils {
  static formatToIso(date: Date): string {
    return date.toISOString();
  }

  static fromIso(isoString: string): Date {
    return new Date(isoString);
  }

  static calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}
