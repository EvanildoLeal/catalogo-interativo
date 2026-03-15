# Ì≥± Cat√°logo Interativo

Aplicativo mobile desenvolvido em React Native com Expo para cat√°logo de produtos, consumindo a API p√∫blica DummyJSON. O app apresenta produtos organizados por categorias (masculino/feminino) com navega√ß√£o por abas, tela de detalhes e sistema de login simulado.

---

## Ì≥ã √çndice
- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Demonstra√ß√£o das Telas](#demonstra√ß√£o-das-telas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instala√ß√£o e Execu√ß√£o](#instala√ß√£o-e-execu√ß√£o)
- [Desafios e Solu√ß√µes](#desafios-e-solu√ß√µes)
- [Autor](#autor)

---

## ÌæØ Sobre o Projeto

O **Cat√°logo Interativo** √© um projeto acad√™mico desenvolvido para demonstrar conceitos fundamentais do desenvolvimento mobile. O objetivo principal √© criar uma experi√™ncia fluida de navega√ß√£o por categorias de produtos (Masculino/Feminino), consumindo dados reais e proporcionando uma interface amig√°vel.

---

## ‚ú® Funcionalidades

### Ì¥ê Tela de Login
- Valida√ß√£o de campos (username e senha obrigat√≥rios)
- Controle de visibilidade da senha
- Feedback visual com Alert para erros

### Ì≥± Navega√ß√£o por Abas
- Separa√ß√£o intuitiva entre departamentos Masculino e Feminino
- Categorias espec√≠ficas para cada g√™nero

### Ì≥¶ Consumo de API
- Listagem din√¢mica de produtos usando Axios
- Integra√ß√£o com a API p√∫blica DummyJSON

### Ì¥ç Detalhes do Produto
- Galeria de imagens
- Informa√ß√µes t√©cnicas, pre√ßos com desconto
- Avalia√ß√µes e estoque

### ‚ö° Feedback ao Usu√°rio
- Estados de carregamento com ActivityIndicator
- Pull-to-refresh para atualizar listas
- Tratamento de erros com Alert

---

## Ìª†Ô∏è Tecnologias Utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| React Native / Expo | Framework e plataforma principal |
| Axios | Cliente HTTP para requisi√ß√µes √† API |
| Expo Vector Icons | √çcones da interface |
| EAS Build | Ferramenta para gera√ß√£o de APK nativo |

### Ì≥° API Utilizada
- **DummyJSON** (https://dummyjson.com)
  - `/products/category/{categoria}` - Lista produtos por categoria
  - `/products/{id}` - Detalhes do produto

---

## Ì≥± Demonstra√ß√£o das Telas

<div align="center">

### Ì¥ê Tela de Login
<img src="https://github.com/EvanildoLeal/catalogo-interativo/raw/main/assets/screenshots/login.jpg" width="250" alt="Tela de Login">

### Ì±® Tela Principal - Aba Masculino
<img src="https://github.com/EvanildoLeal/catalogo-interativo/raw/main/assets/screenshots/home-masculino.jpg" width="250" alt="Tela Masculino">

### Ì±ó Tela Principal - Aba Feminino
<img src="https://github.com/EvanildoLeal/catalogo-interativo/raw/main/assets/screenshots/home-feminino.jpg" width="250" alt="Tela Feminino">

### Ì±ó Tela de Produtos - Vestidos
<img src="https://github.com/EvanildoLeal/catalogo-interativo/raw/main/assets/screenshots/vestidos.jpg" width="250" alt="Tela Vestidos">

### Ì≥¶ Tela de Produtos - Camisas
<img src="https://github.com/EvanildoLeal/catalogo-interativo/raw/main/assets/screenshots/produtos-camisas.jpg" width="250" alt="Tela Camisas">

</div>

---

## Ì≥Å Estrutura do Projeto
catalogo-interativo/
‚îú‚îÄ‚îÄ assets/
‚îÇ ‚îî‚îÄ‚îÄ screenshots/ # Prints das telas
‚îú‚îÄ‚îÄ App.js # Componente principal
‚îú‚îÄ‚îÄ app.json # Configura√ß√µes do Expo
‚îú‚îÄ‚îÄ package.json # Depend√™ncias e scripts
‚îî‚îÄ‚îÄ README.md # Documenta√ß√£o

---

## Ì∫Ä Instala√ß√£o e Execu√ß√£o

1. **Clone o reposit√≥rio:**
   ```bash
   git clone https://github.com/EvanildoLeal/catalogo-interativo.git
   cd catalogo-interativo
Instale as depend√™ncias:

bash
npm install
Inicie o projeto:

bash
npx expo start
Ì≥≤ Gerar APK (opcional)
bash
eas build:configure
eas build -p android --profile preview
‚ö° Desafios e Solu√ß√µes
Ì¥¥ Incompatibilidade de SDK
Problema: O app n√£o rodava no celular devido √† vers√£o do SDK ser mais nova que a do Expo Go instalado.

‚úÖ Solu√ß√£o: Utilizei o EAS Build para gerar um APK nativo, contornando as limita√ß√µes de vers√£o.

Ìø° Navega√ß√£o Customizada
Problema: Evitar depend√™ncias pesadas em um projeto acad√™mico.

‚úÖ Solu√ß√£o: Implementei um sistema de navega√ß√£o baseado em estados com useState, criando fun√ß√µes navigate, goBack e replace.

Ìø¢ Tratamento de Erros
Problema: Gerenciar estados de carregamento e erros de rede.

‚úÖ Solu√ß√£o: Uso de try/catch com ActivityIndicator para loading e Alert para mensagens de erro.

Ì±®‚ÄçÌ≤ª Autor
Evanildo Leal
https://img.shields.io/badge/GitHub-EvanildoLeal-6B4EFF?style=for-the-badge&logo=github
Ì≥ß Email: evanildo@wfxky.onmicrosoft.com

Ì≥Ñ Licen√ßa
Este projeto est√° sob a licen√ßa MIT.

<div align="center"> <strong>Desenvolvido para a disciplina de Desenvolvimento Mobile</strong><br> Ìø´ Faculdade FECAF | Ì≥Ö Mar√ßo 2026 </div> ```
