export interface HashService {
  hashPassword(password: string): Promise<string>;

  comparePasswords(
    userPassword: string,
    storedPassword: string,
  ): Promise<boolean>;
}
