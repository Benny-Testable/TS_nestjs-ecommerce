import { JwtService } from '@nestjs/jwt';

export const generateMockToken = async (module: TestingModule, user: User) => {
  const jwtService = module.get(JwtService);
  return jwtService.signAsync(
    {
      email: user.email,
      id: user.id,
    },
  );
};
