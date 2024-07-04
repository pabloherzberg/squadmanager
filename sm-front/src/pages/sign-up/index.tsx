'use client';

import { commonColors } from '@/../tailwind.config';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input/Input';
import { H2, SmallText } from '@/components/Typography';
import { useCreateUser } from '@/hooks/auth';
import { useToast } from '@/providers/ToastProvider';
import { useAppSelector } from '@/store/useRedux';
import { validateEmail, validatePassword } from '@/utils/handlers';
import { QueryStatusEnum } from '@/utils/types/index';
import UserIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface LoginData {
  email: string;
  password: string;
  username: string;
  role: string;
  repassword: string;
}

const SignupPage = () => {
  const selector = useAppSelector((state) => state.auth);
  const [inputValues, setInputValues] = useState<LoginData>({
    email: '',
    username: '',
    role: '',
    password: '',
    repassword: '',
  });

  const toast = useToast();
  const router = useRouter();
  const { mutateAsync } = useCreateUser();

  useEffect(() => {
    if (selector.status === QueryStatusEnum.succeeded) {
      router.push('/sign-in');
    } else if (selector.status === QueryStatusEnum.failed) {
      toast.error({ content: 'E-mail ou senha inválidos' });
    }
  }, [selector.status, router]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (
      inputValues.email === '' ||
      inputValues.password === '' ||
      inputValues.repassword === '' ||
      inputValues.username === '' ||
      inputValues.role === ''
    ) {
      toast.error({ content: 'Preencha todos os campos' });
      return;
    }

    if (!validateEmail(inputValues.email)) {
      toast.error({ content: 'Formato de e-mail inválido' });
      return;
    }

    if (!validatePassword(inputValues.password)) {
      toast.error({ content: 'Formato de senha inválida' });
      return;
    }

    if (inputValues.password !== inputValues.repassword) {
      toast.error({ content: 'Senhas não conferem' });
      return;
    }

    mutateAsync({
      Email: inputValues.email,
      Password: inputValues.password,
      Username: inputValues.username,
      Role: inputValues.role,
    });
  };

  return (
    <main className=" bg-gray-50 flex flex-col justify-center  sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <H2 className="mt-6 text-center text-3xl  text-gray-900">
          Crie sua conta
        </H2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              variant="outlined"
              fullWidth
              label="Nome de usuário"
              id="username"
              name="username"
              onChange={(e) =>
                setInputValues({ ...inputValues, username: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UserIcon
                      sx={{
                        color: commonColors.primary.DEFAULT,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="role-label">
                <SmallText>Tipo de usuário</SmallText>
              </InputLabel>
              <Select
                labelId="role-label"
                variant="outlined"
                fullWidth
                label="Tipo de usuário"
                id="role"
                name="role"
                value={inputValues.role}
                onChange={(e) =>
                  setInputValues({
                    ...inputValues,
                    role: e.target.value as string,
                  })
                }
              >
                <MenuItem value="Gerente">Gerente</MenuItem>
                <MenuItem value="Funcionário">Funcionário</MenuItem>
              </Select>
            </FormControl>
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

            <Input
              variant="outlined"
              label="confirme a senha"
              fullWidth
              id="repassword"
              name="repassword"
              type="password"
              autoComplete="repassword"
              onChange={(e) =>
                setInputValues({ ...inputValues, repassword: e.target.value })
              }
            />

            <Button
              isLoading={selector.status === QueryStatusEnum.loading}
              fullWidth
              type="submit"
            >
              Cadastrar
            </Button>
          </form>
          <Link className="mt-6 text-blue-500" href="/sign-in">
            Entrar
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
