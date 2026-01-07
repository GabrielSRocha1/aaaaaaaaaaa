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

export const cryptoApi = {
  // Buscar preços de múltiplas criptomoedas
  getCryptoPrices: async (cryptos: CryptoType[]): Promise<Record<CryptoType, CryptoPriceData>> => {
    try {
      const ids = cryptos.map((crypto) => cryptoIds[crypto]).join(',');
      const response = await axios.get(
        `${COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true&include_last_updated_at=true`
      );

      // Buscar dados completos
      const fullResponse = await axios.get(
        `${COINGECKO_API_URL}/coins/markets?ids=${ids}&vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );

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
    } catch (error) {
      console.error('Erro ao buscar preços de criptomoedas:', error);
      throw error;
    }
  },

  // Buscar preço de uma criptomoeda específica
  getCryptoPrice: async (crypto: CryptoType): Promise<CryptoPriceData> => {
    try {
      const id = cryptoIds[crypto];
      const response = await axios.get(
        `${COINGECKO_API_URL}/coins/markets?ids=${id}&vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
      );
      return response.data[0];
    } catch (error) {
      console.error(`Erro ao buscar preço de ${crypto}:`, error);
      throw error;
    }
  },

  // Buscar histórico de preços (últimas 24h)
  getCryptoHistory: async (crypto: CryptoType, days: number = 1) => {
    try {
      const id = cryptoIds[crypto];
      const response = await axios.get(
        `${COINGECKO_API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar histórico de ${crypto}:`, error);
      throw error;
    }
  },
};

// Converter USD para BRL (taxa fixa, idealmente usar uma API real)
export const convertUSDtoBRL = (usd: number): number => {
  const exchangeRate = 5.0; // Taxa aproximada, idealmente buscar de uma API
  return usd * exchangeRate;
};

