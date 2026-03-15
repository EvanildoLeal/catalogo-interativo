#  Catálogo Interativo

Aplicativo mobile desenvolvido em React Native com Expo para catálogo de produtos, consumindo a API pública DummyJSON. O app apresenta produtos organizados por categorias (masculino/feminino) com navegação por abas, tela de detalhes e sistema de login simulado.

---

## Índice
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Execução](#instalação-e-execução)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Demonstração das Telas](#demonstração-das-telas)
- [Desafios e Soluções](#desafios-e-soluções)
- [Autor](#autor)

---

## Sobre o Projeto

O **Catálogo Interativo** é um aplicativo desenvolvido como trabalho acadêmico para demonstrar conceitos fundamentais do desenvolvimento mobile com React Native. O objetivo principal é criar uma experiência fluida de navegação por categorias de produtos, consumindo dados de uma API real e proporcionando uma interface amigável para o usuário.

O app simula um e-commerce, permitindo que o usuário visualize produtos das categorias masculina e feminina, com informações detalhadas como preço, desconto, descrição e imagens.

---

## ✨ Funcionalidades

### ✅ Tela de Login
- Validação de campos (username e senha obrigatórios)
- Opção para mostrar/ocultar a senha
- Armazenamento temporário do usuário com useState
- Feedback visual com Alert para erros

### ✅ Tela Principal com Tabs
- Navegação por abas (Masculino / Feminino)
- Categorias Masculinas: Camisas, Tênis, Relógios
- Categorias Femininas: Bolsas, Vestidos, Jóias, Sapatos, Relógios
- Interface com cards e ícones intuitivos

### ✅ Tela de Lista de Produtos
- Consumo da API DummyJSON com Axios
- Exibição de produtos em grid de 2 colunas
- Preços com desconto destacados
- Porcentagem de desconto em badge vermelho
- Pull to refresh para atualizar a lista
- Loading states com ActivityIndicator
- Tratamento de erros com Alert

### ✅ Tela de Detalhes do Produto
- Exibição de nome, marca e descrição
- Avaliação do produto (rating)
- Preço original e com desconto
- Badge de porcentagem de desconto
- Informações de estoque
- Galeria de imagens (scroll horizontal)
- Tags e informações adicionais

### ✅ Logout
- Botão de sair disponível em todas as telas
- Retorno à tela de login
- Limpeza dos dados do usuário

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| React Native | 0.72+ | Framework principal |
| Expo | ~50.0.0 | Plataforma de desenvolvimento |
| Axios | 1.6.0+ | Cliente HTTP para requisições |
| Expo Vector Icons | ~13.0.0 | Ícones personalizados |
| React Native Safe Area Context | ^4.7.0 | Gerenciamento de áreas seguras |
| React Native Screens | ~3.29.0 | Otimização de navegação |
| EAS Build | ^7.0.0 | Geração de APK nativo |

###  API Utilizada
- **DummyJSON** (https://dummyjson.com)
  - Endpoints:
    - `/products/category/{categoria}` - Lista produtos por categoria
    - `/products/{id}` - Detalhes do produto

---

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Git** (opcional, para clonar o repositório)

Para testar no celular:
- **Expo Go** (Android ou iOS) - para desenvolvimento
- **OU** APK gerado pelo EAS Build

---

## Instalação e Execução

### 1. Clone o repositório
```bash
git clone https://github.com/EvanildoLeal/catalogo-interativo.git
cd catalogo-interativo
2. Instale as dependências
bash
npm install
# ou
yarn install
3. Execute o projeto
bash
npx expo start
# ou
npm start
4. Abra no seu dispositivo
Opção A (Expo Go): Escaneie o QR Code com o app Expo Go

Opção B (Emulador): Pressione 'a' para Android ou 'i' para iOS

Opção C (Navegador): Pressione 'w' para abrir no navegador

5. Gerar APK (opcional - para instalação direta)
bash
# Configure o EAS Build (apenas na primeira vez)
eas build:configure

# Gere o APK de preview
eas build -p android --profile preview
��� Estrutura do Projeto
text
catalogo-interativo/
├── .expo/                  # Configurações do Expo
├── assets/                 # Imagens e fontes
│   └── screenshots/        # Prints das telas
=======
��� Catálogo InterativoAplicativo mobile desenvolvido em React Native com Expo para catálogo de produtos, consumindo a API pública DummyJSON.��� ÍndiceSobre o ProjetoFuncionalidadesTecnologias UtilizadasDemonstração das TelasEstrutura do ProjetoInstalação e ExecuçãoAutorSobre o ProjetoO Catálogo Interativo é um projeto acadêmico que simula um e-commerce funcional, permitindo a navegação por categorias, visualização de detalhes técnicos de produtos e simulação de fluxo de autenticação.✨ FuncionalidadesLogin Simulado: Validação de campos e controle de visibilidade de senha.Navegação por Abas: Separação entre departamentos Masculino e Feminino.Consumo de API: Listagem dinâmica usando Axios.Detalhes do Produto: Galeria de imagens, preços com desconto e avaliações.Feedback Visual: Estados de carregamento (Loading) e tratamento de erros.��� Demonstração das TelasAbaixo, você pode conferir as principais telas do aplicativo:LoginHome MasculinoHome Feminino<img src="assets/screenshots/login.jpg" width="250" alt="Tela de Login"><img src="assets/screenshots/home-masculino.jpg" width="250" alt="Home Masculino"><img src="assets/screenshots/home-feminino.jpg" width="250" alt="Home Feminino">Detalhes (Vestidos)Lista (Camisas)<img src="assets/screenshots/vestidos.jpg" width="250" alt="Detalhes de Vestidos"><img src="assets/screenshots/produtos-camisas.jpg" width="250" alt="Lista de Camisas">��� Estrutura do ProjetoPara que as imagens apareçam, a estrutura de pastas deve seguir este padrão:catalogo-interativo/
├── assets/
│   └── screenshots/
>>>>>>> cb8fb7d (minhas alterações)
│       ├── login.jpg
│       ├── home-masculino.jpg
│       ├── home-feminino.jpg
│       ├── produtos-camisas.jpg
│       └── vestidos.jpg
<<<<<<< HEAD
├── node_modules/           # Dependências
├── .gitignore              # Arquivos ignorados pelo Git
├── App.js                   # Componente principal
├── app.json                # Configurações do Expo
├── eas.json                # Configurações do EAS Build
├── index.js                # Ponto de entrada
├── package.json            # Dependências e scripts
└── README.md               # Documentação
## 📱 Demonstração das Telas

### 🔐 Tela de Login
| Tela | Descrição |
|------|-----------|
| ![Tela de Login](https://github.com/EvanildoLeal/catalogo-interativo/blob/main/assets/screenshots/login.jpg?raw=true) | **Funcionalidades:**<br>• Campos de username e senha<br>• Botão para mostrar/ocultar senha<br>• Validação com Alert<br>• Header roxo personalizado |

### 👨 Tela Principal - Aba Masculino
| Tela | Descrição |
|------|-----------|
| ![Tela Masculino](https://github.com/EvanildoLeal/catalogo-interativo/blob/main/assets/screenshots/home-masculino.jpg?raw=true) | **Categorias:**<br>• Camisas<br>• Tênis<br>• Relógios<br>• Botão de logout |

### 👗 Tela Principal - Aba Feminino
| Tela | Descrição |
|------|-----------|
| ![Tela Feminino](https://github.com/EvanildoLeal/catalogo-interativo/blob/main/assets/screenshots/home-feminino.jpg?raw=true) | **Categorias:**<br>• Bolsas<br>• Vestidos<br>• Jóias<br>• Sapatos<br>• Relógios |

### 👗 Tela de Produtos - Vestidos
| Tela | Descrição |
|------|-----------|
| ![Tela Vestidos](https://github.com/EvanildoLeal/catalogo-interativo/blob/main/assets/screenshots/vestidos.jpg?raw=true) | **Produtos da categoria Vestidos:**<br>• Exibição em grid de 2 colunas<br>• Preços com descontos<br>• Badges de porcentagem |

### 📦 Tela de Produtos - Camisas
| Tela | Descrição |
|------|-----------|
| ![Tela Camisas](https://github.com/EvanildoLeal/catalogo-interativo/blob/main/assets/screenshots/produtos-camisas.jpg?raw=true) | **Produtos exibidos:**<br>• Blue & Black Check Shirt - R$ 25,39 (15% off)<br>• Gigabyte Aorus Tshirt - R$ 24,76 (1% off)<br>• Man Plaid Shirt - R$ 28,17 (20% off)<br>• Man Short Sleeve - R$ 18,62 (7% off) |
⚡ Desafios e Soluções
Desafio 1: Incompatibilidade com Expo Go
Problema: O app não rodava no celular devido à versão do SDK ser mais nova que a do Expo Go instalado.

Solução: Configurei o EAS Build para gerar um APK nativo, permitindo a instalação direta no dispositivo sem depender do Expo Go.

bash
eas build:configure
eas build -p android --profile preview
Desafio 2: Consumo de API e tratamento de erros
Problema: Gerenciar estados de carregamento, erros de rede e feedback visual para o usuário.

Solução: Utilizei Axios com try/catch, estados de loading com useState e ActivityIndicator, além de Alert para mensagens de erro.

javascript
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);

try {
  const response = await api.get(`/products/category/${categoria}`);
  setProdutos(response.data.products);
} catch (error) {
  Alert.alert('Erro', 'Não foi possível carregar os produtos');
} finally {
  setLoading(false);
}
Desafio 3: Navegação sem bibliotecas externas
Problema: Implementar navegação entre telas sem usar React Navigation.

Solução: Criei um sistema de navegação baseado em estado com funções navigate, goBack e replace.

javascript
const [currentScreen, setCurrentScreen] = useState({ screen: 'Home', params: null });

const navigation = {
  navigate: (screen, params) => setCurrentScreen({ screen, params }),
  goBack: () => setCurrentScreen({ screen: 'Home', params: null }),
  replace: (screen) => { if (screen === 'Login') setUser(null); }
};
��� Como Testar
Credenciais de teste (qualquer valor funciona)
Username: qualquer texto (ex: evanildo.alu.fecaf.com.br)

Senha: qualquer texto (mínimo 1 caractere)

Fluxo completo para testar
Abra o app

Digite username e senha → clique em Entrar

Na tela principal, alterne entre as abas Masculino e Feminino

Clique em uma categoria (ex: Camisas)

Veja a lista de produtos

Clique em um produto para ver detalhes

Use o botão ← para voltar

Clique no ícone ��� para fazer logout

���‍��� Autor
Evanildo Leal
https://img.shields.io/badge/GitHub-EvanildoLeal-6B4EFF?style=for-the-badge&logo=github
��� Email: evanildo@wfxky.onmicrosoft.com

��� Licença
Este projeto está sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

Desenvolvido como trabalho acadêmico para a disciplina de Desenvolvimento Mobile
��� Faculdade FECAF | ��� Março 2026

text
=======
├── App.js
└── README.md
��� Tecnologias UtilizadasReact Native / ExpoAxios (Requisições HTTP)Lucide React / Expo Icons (Interface)EAS Build (Distribuição Android)��� Instalação e ExecuçãoClone o repositório:git clone [https://github.com/EvanildoLeal/catalogo-interativo.git](https://github.com/EvanildoLeal/catalogo-interativo.git)
Instale as dependências:npm install
Inicie o projeto:npx expo start
��� AutorEvanildo Leal <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">Desenvolvido para a disciplina de Desenvolvimento Mobile - Faculdade FECAF (2026)
>>>>>>> cb8fb7d (minhas alterações)
