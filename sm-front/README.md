
# SquadManager

## Introdução
O SquadManager é uma aplicação web para gerenciamento de squads e tarefas. Ele permite criar, editar e excluir squads e tarefas, além de oferecer funcionalidades de autenticação e autorização.

## Instalação

### Requisitos
- Node.js >= 14
- npm >= 6

### Passos para Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/pabloherzberg/squadmanager.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd squadmanager
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Iniciar o Projeto
Para iniciar o projeto em ambiente de desenvolvimento:
```bash
npm run dev
```
O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto
```plaintext
src/
|-- components/
|   |-- AddMemberForm.tsx
|   |-- Column.tsx
|   |-- DraggableCard.tsx
|-- hooks/
|   |-- tasks.ts
|   |-- useColumns.ts
|-- pages/
|   |-- index.tsx
|   |-- squad/
|       |-- [id].tsx
|-- store/
|   |-- slices/
|       |-- authSlice.ts
|       |-- taskSlice.ts
|   |-- store.ts
```

### Descrição dos Diretórios
- **components/**: Contém os componentes reutilizáveis da aplicação.
- **hooks/**: Custom hooks para lógica reutilizável.
- **pages/**: Páginas principais da aplicação conforme estrutura do Next.js.
- **store/**: Configuração e slices do Redux.

## Componentes

### AddMemberForm
Formulário para adicionar novos membros ao squad.
```tsx
const AddMemberForm: React.FC = () => {
  // lógica e JSX
};
export default AddMemberForm;
```

## Gerenciamento de Estado

### Configuração do Redux
O Redux é configurado utilizando o Redux Toolkit para simplificar o gerenciamento de estado.

#### authSlice.ts
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface, QueryStatusEnum } from '@/utils/types';

type AuthState = {
  user?: UserInterface;
  token?: string;
  status: QueryStatusEnum;
  error?: string | null;
};

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  status: QueryStatusEnum.idle,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = undefined;
      state.token = undefined;
      state.status = QueryStatusEnum.idle;
      state.error = null;
      localStorage.removeItem('token');
    },
    loadUserFromToken(state, action: PayloadAction<{ user: UserInterface; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = QueryStatusEnum.succeeded;
    },
    setAuthStatus(state, action: PayloadAction<QueryStatusEnum>) {
      state.status = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<UserInterface>) {
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { logout, loadUserFromToken, setAuthStatus, setAuthError, setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
```

#### taskSlice.ts
```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/utils/types';

type TaskState = {
  tasks: Task[];
};

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.taskid === action.payload.taskid);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
```

### Configuração da Store
```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

## Estilos
- **Tailwind CSS**: Utiliza Tailwind CSS para estilização baseada em utilitários.
- **CSS-in-JS**: Possível uso de CSS-in-JS para estilização específica de componentes.

## Autenticação e Autorização
- **Fluxo de Autenticação**: Gerenciamento de tokens JWT para autenticação.
- **Controle de Acesso**: Acesso baseado em funções para diferentes recursos da aplicação.

## Deploy
- **Ambiente de Produção**: Instruções para realizar o deploy em ambientes de produção.
- **Configurações**: Variáveis de ambiente e outras configurações necessárias para o deploy.

### Exemplo de Deploy
Para realizar o deploy em um servidor de produção, execute:
```bash
npm run build
npm start
```
