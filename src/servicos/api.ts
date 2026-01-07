import axios from 'axios';
import { CryptoType } from '../ganchos/useBankingStore';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

// Mapeamento de símbolos para IDs do CoinGecko
const cryptoIds: Record<CryptoType, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  BNB: 'binancecoin',
  ADA: 'cardano',
  SOL: 'solana',
  XRP: 'ripple',
  DOGE: 'dogecoin',
};

export type CryptoPriceData = {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  last_updated: string;
};

// Criar instância do axios com configuração padrão
const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

// Interceptor para tratar erros
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro de resposta do servidor (4xx, 5xx)
      console.error('Erro da API:', error.response.status, error.response.data);
      if (error.response.status === 404) {
        console.warn('Endpoint não encontrado (404). Verifique a URL da API.');
      }
    } else if (error.request) {
      // Erro de requisição (sem resposta)
      console.error('Sem resposta da API:', error.request);
    } else {
      // Erro ao configurar a requisição
      console.error('Erro na configuração:', error.message);
    }
    return Promise.reject(error);
  }
);

export const cryptoApi = {
  // Buscar preços de múltiplas criptomoedas
  getCryptoPrices: async (cryptos: CryptoType[]): Promise<Record<CryptoType, CryptoPriceData>> => {
    try {
      if (!cryptos || cryptos.length === 0) {
        return {} as Record<CryptoType, CryptoPriceData>;
      }

      const ids = cryptos.map((crypto) => cryptoIds[crypto]).join(',');
      
      // Buscar dados completos
      const fullResponse = await apiClient.get(
        `${COINGECKO_API_URL}/coins/markets?ids=${ids}&vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );

      if (!fullResponse.data || fullResponse.data.length === 0) {
        console.warn('Nenhum dado retornado da API CoinGecko');
        return {} as Record<CryptoType, CryptoPriceData>;
      }

      const result: Partial<Record<CryptoType, CryptoPriceData>> = {};
      fullResponse.data.forEach((coin: CryptoPriceData) => {
        const crypto = Object.keys(cryptoIds).find(
          (key) => cryptoIds[key as CryptoType] === coin.id
        ) as CryptoType;
        if (crypto) {
          result[crypto] = coin;
        }
      });

      return result as Record<CryptoType, CryptoPriceData>;
    } catch (error: any) {
      console.error('Erro ao buscar preços de criptomoedas:', error?.message || error);
      // Retornar objeto vazio em vez de lançar erro para não quebrar o app
      return {} as Record<CryptoType, CryptoPriceData>;
    }
  },

  // Buscar preço de uma criptomoeda específica
  getCryptoPrice: async (crypto: CryptoType): Promise<CryptoPriceData | null> => {
    try {
      const id = cryptoIds[crypto];
      if (!id) {
        console.warn(`ID não encontrado para ${crypto}`);
        return null;
      }

      const response = await apiClient.get(
        `${COINGECKO_API_URL}/coins/markets?ids=${id}&vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );
      
      if (!response.data || response.data.length === 0) {
        console.warn(`Nenhum dado retornado para ${crypto}`);
        return null;
      }
      
      return response.data[0];
    } catch (error: any) {
      console.error(`Erro ao buscar preço de ${crypto}:`, error?.message || error);
      // Retornar null em vez de lançar erro
      return null;
    }
  },

  // Buscar histórico de preços (últimas 24h)
  getCryptoHistory: async (crypto: CryptoType, days: number = 1) => {
    try {
      const id = cryptoIds[crypto];
      if (!id) {
        console.warn(`ID não encontrado para ${crypto}`);
        return null;
      }

      const response = await apiClient.get(
        `${COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );
      return response.data || null;
    } catch (error: any) {
      console.error(`Erro ao buscar histórico de ${crypto}:`, error?.message || error);
      return null;
    }
  },
};

// Converter USD para BRL (taxa fixa, idealmente usar uma API real)
export const convertUSDtoBRL = (usd: number): number => {
  const exchangeRate = 5.0; // Taxa aproximada, idealmente buscar de uma API
  return usd * exchangeRate;
};
