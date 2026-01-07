# Crypto Banking App

Um aplicativo React Native para gerenciar transações de criptomoedas, visualizar preços em tempo real, realizar saques e depósitos.

## Funcionalidades

- 🏠 **Tela Inicial**: Visualize seu portfólio completo de criptomoedas com preços em tempo real
- 📊 **Extrato**: Veja todas as suas transações com filtros por tipo
- 💸 **Depósitos e Saques**: Faça transações de criptomoedas facilmente
- 💳 **Cartões**: Gerencie seus cartões de criptomoedas
- 👤 **Perfil**: Acesse configurações da conta
- 🔒 **Autenticação Biométrica**: Login seguro com Face ID ou impressão digital
- ⚡ **Preços em Tempo Real**: Integração com CoinGecko API para preços atualizados

## Tecnologias

- React Native
- Expo
- TypeScript
- NativeWind (Tailwind CSS para React Native)
- React Navigation
- Expo Local Authentication
- Axios

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
```

3. Execute no dispositivo/emulador:
```bash
npm run android  # Android
npm run ios      # iOS
```

## Estrutura do Projeto

```
src/
├── ativos/           # Ícones e assets
├── componentes/      # Componentes reutilizáveis
├── ganchos/         # Hooks (useBankingStore)
├── navegação/       # Navegação do app
├── telas/           # Telas do aplicativo
│   ├── aut/        # Autenticação
│   ├── página inicial/  # Telas principais
│   └── transferência/   # Telas de transferência
├── serviços/        # APIs e serviços
└── tema/           # Configurações de tema
```

## Configuração

O app usa NativeWind para estilização. As cores do tema estão definidas em `src/tema/cores.ts` e `tailwind.config.js`.

## API

O app utiliza a CoinGecko API para buscar preços de criptomoedas em tempo real. As criptomoedas suportadas incluem:
- Bitcoin (BTC)
- Ethereum (ETH)
- Tether (USDT)
- Binance Coin (BNB)
- Cardano (ADA)
- Solana (SOL)
- Ripple (XRP)
- Dogecoin (DOGE)

## Estado Global

O estado do aplicativo é gerenciado através do Context API no arquivo `src/ganchos/useBankingStore.ts`. Este hook gerencia:
- Saldo do usuário
- Transações
- Holdings de criptomoedas
- Preços atualizados

## Licença

Este projeto é apenas para fins educacionais.

