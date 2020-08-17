# Code Challenge - Bruno Charamba

Conforme pedido, segue o .md com informações sobre o desafio pedido. Todas as instruções e demais explicações de arquitetura e decisões sobre o projeto podem ser vistas abaixo.

# Linguagem e Framework

De acordo com as regras do desafio, foi escolhido como linguagem o Javascript, e como framework, o React Native

**Porque o React Native?**

O React fornece um aumento de produtividade e velocidade de desenvolvimento por possuir um design voltado para a reutilização de código, ou componentização, que aliado ao gerenciamento de estados, torna suas aplicações escaláveis e com manutenção facilitada. Tudo isso, aliado à uma comunidade ativa e com uma enorme quantidade de pacotes open sources disponíveis, torna o React Native uma das melhores soluções para o desenvolvimento mobile para ambas as plataformas.

# Ambiente e Code Editor

O projeto foi criado em React Native utilizando o _React Native CLI_, facilitando o setup inicial e instalando automaticamente outras depedências como o _babel_, _eslint_ e outros.
A codificação foi realizada no Visual Studio Code, com algumas extensão para facilitar o trabalho tanto do dev, quanto de um time. Foram utilizados o _prettier_, _eslint_ e outras extensões visuais.

# Arquitetura e Complexidade

Apesar do escopo do projeto ser restrito, a arquitetura foi feita com o intuito de suportar seu crescimento e demonstrar um nível de conhecimento aplicável para projetos mais complexos. O projeto apresenta o uso de módulos como o _Redux_, e _Async Storage_ para a persistência de dados da aplicação.

**Árvore do projeto**

```bash
├── index.js
├── components
│   └── TransactionItem
│       ├── index.js
│       └── styles.css
├── globals
│   ├── index.js
│   └── theme.js
├── index.js
├── screens
│   └── AddTransaction
│   │   ├── index.js
│   │   ├── index.test.js
│   │   └── styles.css
│	└── Transaction
│	    ├── index.js
│   │   ├── index.test.js
│	    └── styles.css
└── store
    ├── index.js
    └── transactions.js
```

A versão simplificada da árvore do projeto, acima pode ser descrita dessa forma:

- **components**: partes reutilizáveis de código
- **screens**: telas da aplicação
- **globals**: parâmetros e funções globais da aplicação
- **store**: arquivos relacionados ao Redux

A estrutura visual do projeto é um _nest_ da tela _Transactions_, que contém um _header_ e um _footer_, e uma _FlatList_ no centro que carrega componentes _TransactionItem_.
A segunda tela do projeto, _AddTransaction_ contém inputs de formulários para a adição de uma transação.

Todas as telas estão encapsuladas com o _React Navigation_, em uma navegação de Pilhas (StackNavigation). Pelo fato da lista de transações poder ser acessada de ambas as telas da aplicação, foi decidido utilizar o _Redux_ para gerenciar os estados. Foi criado uma _reducer_ para armazenar todas as transações durante o uso da aplicação, e o _Async Storage_ sendo sobrescrito toda vez que houver alguma alterações no estado, mantendo assim uma persistência dos dados.

Na tela _AddTransaction_ foi criado um formulário com mais opções de entrada. Além da descrição da transação e valor, foi adicionado o tipo (entrada ou saída), e a categoria da transação, além da data, que pode ser escolhidada pelo usuario.

Na tela _Transactions_, é exibido a listagem de todas as transações registradas e total no final da tela.

Outros plugins utilizados foram:

- **currency.js**: lidar com formatos de moeda
- **moments**: tratamento de datas de forma simples
- **react-redux**: gerenciamento de estados
- **react-native-masked-text**: lidar com formatação de textos
-

Entre outros.

# Configuração

Para rodar a aplicação é necessário que estar com os pré-requisitos do React instalados, para facilitar o _setup_, utilizei o 'React Native CLI'.

Para baixar o projeto do github, é necessário ter o Git instalado no OS.
O projeto pode ser instalado a partir do download do repositório a seguir:

- [https://github.com/brunocharamba/CCTransactionsManager](https://github.com/brunocharamba/CCTransactionsManager)

Ou pode-se baixá-lo via linha de comando:

```bash
git clone https://github.com/brunocharamba/CCTransactionsManager.git
```

Após baixado o projeto, será necessário instalar suas dependências. Estando na raiz do projeto, onde se encontra o arquivo _package.json_:

```bash
# com Yarn:
yarn install
# ou com npm:
npm install
```

Após a instalações das dependências, caso for necessário executar o App em um dispositivo ou emulador de iPhone, será necessário 'linkar' usando PODFILE:

```bash
# somente para iOS:
# entrar na pasta especifíca para ios
cd ios
pod install
```

# Excutando o Projeto

Para executar o projeto, basta navegar de volta para a pasta raiz, executar em um terminal:

```bash
react-native start
```

Para rodar com iOS ou Android

```bash
react-native run-ios
react-native run-android
```
