'use client';

import { commonColors } from '@/../tailwind.config';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input/Input';
import { H2 } from '@/components/Typography';
import { useFetchAuth } from '@/hooks/auth/index';
import { useToast } from '@/providers/ToastProvider';
import { paths } from '@/store/paths';
import { useAppSelector } from '@/store/useRedux';
import { QueryStatusEnum } from '@/utils/types/index';
import EmailIcon from '@mui/icons-material/Email';
import { InputAdornment, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const auth = useAppSelector((state) => state.auth);
  const { mutateAsync } = useFetchAuth();
  const [inputValues, setInputValues] = useState<LoginData>({
    email: '',
    password: '',
  });
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (auth.token) {
      router.replace(
        auth.user?.role === 'Gerente' ? paths.squads : paths.employee
      );
    }
  }, [router, auth.token, auth.status]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValues.email === '' || inputValues.password === '') {
      toast.error({ content: 'Preencha os campos' });
      return;
    }

    try {
      await mutateAsync({
        Email: inputValues.email,
        Password: inputValues.password,
      });

      if (auth.status === QueryStatusEnum.failed) {
        toast.error({ content: 'E-mail ou senha inválidos' });
      }
    } catch (error) {
      toast.error({ content: 'Erro ao fazer login' });
    }
  };

  return (
    <main className="bg-gray-50 flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <H2 className="mt-6 text-center text-3xl  text-gray-900">
          Entre na sua conta
        </H2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6 mt-2">
            <Input
              variant="outlined"
              fullWidth
              label="E-mail"
              id="email"
              name="email"
              onChange={(e) =>
                setInputValues({ ...inputValues, email: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      sx={{
                        color: commonColors.primary.DEFAULT,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <Input
              variant="outlined"
              label="Senha"
              fullWidth
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              onChange={(e) =>
                setInputValues({ ...inputValues, password: e.target.value })
              }
            />

            <Button
              isLoading={auth.status === QueryStatusEnum.loading}
              className="font-bold"
              fullWidth
              type="submit"
            >
              Entrar
            </Button>
          </form>
          <Link href="/sign-up">Cadastrar</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
