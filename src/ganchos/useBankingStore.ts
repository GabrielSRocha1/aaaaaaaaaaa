import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CryptoType = 'BTC' | 'ETH' | 'USDT' | 'BNB' | 'ADA' | 'SOL' | 'XRP' | 'DOGE';

export type Transaction = {
  id: string;
  titulo: string;
  legenda: string;
  quantidade: number;
  tipo: 'credito' | 'debito';
  data: string;
  crypto?: CryptoType;
  precoCrypto?: number;
};

export type CryptoHoldings = {
  [key in CryptoType]?: {
    quantidade: number;
    valorInvestido: number;
    precoAtual: number;
    variacao24h: number;
  };
};

export type BankingState = {
  saldo: number;
  transacoes: Transaction[];
  nomeUsuario: string;
  cryptoHoldings: CryptoHoldings;
};

type BankingContextType = BankingState & {
  setBalance: (valor: number) => void;
  addTransaction: (tx: Transaction) => void;
  updateCryptoPrice: (crypto: CryptoType, preco: number, variacao24h: number) => void;
  addCryptoHolding: (crypto: CryptoType, quantidade: number, valorInvestido: number) => void;
};

const BankingContext = createContext<BankingContextType | undefined>(undefined);

const initialState: BankingState = {
  saldo: 1523.75,
  transacoes: [
    {
      id: '1',
      titulo: 'Depósito de Bitcoin',
      legenda: 'Hoje • 14:20',
      quantidade: 320.0,
      tipo: 'credito',
      data: new Date().toISOString(),
      crypto: 'BTC',
      precoCrypto: 45000,
    },
    {
      id: '2',
      titulo: 'Saque de Ethereum',
      legenda: 'Ontem • 18:45',
      quantidade: -120.5,
      tipo: 'debito',
      data: new Date(Date.now() - 86400000).toISOString(),
      crypto: 'ETH',
      precoCrypto: 2800,
    },
  ],
  nomeUsuario: 'Rocha',
  cryptoHoldings: {
    BTC: {
      quantidade: 0.05,
      valorInvestido: 2250,
      precoAtual: 45000,
      variacao24h: 2.5,
    },
    ETH: {
      quantidade: 2.5,
      valorInvestido: 7000,
      precoAtual: 2800,
      variacao24h: -1.2,
    },
    USDT: {
      quantidade: 1000,
      valorInvestido: 1000,
      precoAtual: 1,
      variacao24h: 0.1,
    },
  },
};

export const BankingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [estado, setState] = useState<BankingState>(initialState);

  const setBalance = (value: number) => {
    setState((prev) => ({ ...prev, saldo: value }));
  };

  const addTransaction = (tx: Transaction) => {
    setState((prev) => ({
      ...prev,
      transacoes: [tx, ...prev.transacoes],
      saldo: prev.saldo + tx.quantidade,
    }));
  };

  const updateCryptoPrice = (crypto: CryptoType, preco: number, variacao24h: number) => {
    setState((prev) => ({
      ...prev,
      cryptoHoldings: {
        ...prev.cryptoHoldings,
        [crypto]: prev.cryptoHoldings[crypto]
          ? {
              ...prev.cryptoHoldings[crypto]!,
              precoAtual: preco,
              variacao24h,
            }
          : undefined,
      },
    }));
  };

  const addCryptoHolding = (crypto: CryptoType, quantidade: number, valorInvestido: number) => {
    setState((prev) => ({
      ...prev,
      cryptoHoldings: {
        ...prev.cryptoHoldings,
        [crypto]: {
          quantidade,
          valorInvestido,
          precoAtual: valorInvestido / quantidade,
          variacao24h: 0,
        },
      },
    }));
  };

  return (
    <BankingContext.Provider
      value={{
        ...estado,
        setBalance,
        addTransaction,
        updateCryptoPrice,
        addCryptoHolding,
      }}
    >
      {children as React.ReactNode}
    </BankingContext.Provider>
  );
};

export const useBankingStore = () => {
  const ctx = useContext(BankingContext);
  if (!ctx) throw new Error('useBankingStore deve ser usado dentro de BankingProvider');
  return ctx;
};

