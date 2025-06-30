
import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, PieChart, Target, Zap } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sector: string;
  marketCap: number;
  dividendYield?: number;
  pe?: number;
  roe?: number;
  pl?: number;
  pvp?: number;
  score: number;
  reason: string;
}

const stocksData: Stock[] = [
  {
    symbol: 'PETR4',
    name: 'Petrobras',
    price: 37.85,
    change: 0.75,
    changePercent: 2.02,
    sector: 'Energia',
    marketCap: 493000000000,
    dividendYield: 8.5,
    pe: 4.2,
    roe: 35.8,
    pl: 4.2,
    pvp: 1.1,
    score: 9.2,
    reason: 'Alto dividend yield e P/L baixo'
  },
  {
    symbol: 'VALE3',
    name: 'Vale',
    price: 65.42,
    change: -1.23,
    changePercent: -1.85,
    sector: 'Mineração',
    marketCap: 315000000000,
    dividendYield: 12.3,
    pe: 5.1,
    roe: 28.4,
    pl: 5.1,
    pvp: 1.4,
    score: 8.9,
    reason: 'Dividendos consistentes e posição dominante'
  },
  {
    symbol: 'ITUB4',
    name: 'Itaú Unibanco',
    price: 32.18,
    change: 0.45,
    changePercent: 1.42,
    sector: 'Financeiro',
    marketCap: 315000000000,
    dividendYield: 6.8,
    pe: 8.9,
    roe: 18.5,
    pl: 8.9,
    pvp: 1.6,
    score: 8.7,
    reason: 'Banco sólido com boa rentabilidade'
  },
  {
    symbol: 'BBDC4',
    name: 'Bradesco',
    price: 14.85,
    change: 0.12,
    changePercent: 0.82,
    sector: 'Financeiro',
    marketCap: 145000000000,
    dividendYield: 7.2,
    pe: 9.1,
    roe: 16.8,
    pl: 9.1,
    pvp: 1.3,
    score: 8.5,
    reason: 'Tradição em dividendos e estabilidade'
  },
  {
    symbol: 'WEGE3',
    name: 'WEG',
    price: 42.73,
    change: 1.05,
    changePercent: 2.52,
    sector: 'Industrial',
    marketCap: 89000000000,
    dividendYield: 1.8,
    pe: 18.4,
    roe: 22.1,
    pl: 18.4,
    pvp: 4.1,
    score: 9.1,
    reason: 'Crescimento consistente e inovação'
  },
  {
    symbol: 'MGLU3',
    name: 'Magazine Luiza',
    price: 8.92,
    change: 0.34,
    changePercent: 3.97,
    sector: 'Varejo',
    marketCap: 59000000000,
    dividendYield: 0,
    pe: 25.6,
    roe: 12.4,
    pl: 25.6,
    pvp: 2.8,
    score: 7.8,
    reason: 'Potencial de recuperação e transformação digital'
  },
  {
    symbol: 'ABEV3',
    name: 'Ambev',
    price: 11.67,
    change: -0.08,
    changePercent: -0.68,
    sector: 'Consumo',
    marketCap: 183000000000,
    dividendYield: 4.5,
    pe: 15.2,
    roe: 14.8,
    pl: 15.2,
    pvp: 2.1,
    score: 8.3,
    reason: 'Marca forte e distribuição consolidada'
  },
  {
    symbol: 'SUZB3',
    name: 'Suzano',
    price: 56.89,
    change: 1.87,
    changePercent: 3.40,
    sector: 'Papel e Celulose',
    marketCap: 77000000000,
    dividendYield: 3.2,
    pe: 12.8,
    roe: 19.5,
    pl: 12.8,
    pvp: 2.3,
    score: 8.6,
    reason: 'Líder mundial em celulose'
  }
];

const strategies = {
  'buy-hold': {
    name: 'Buy & Hold',
    description: 'Ações sólidas para investimento de longo prazo',
    icon: Target,
    color: 'bg-blue-500'
  },
  'value': {
    name: 'Value Investing',
    description: 'Ações subvalorizadas com fundamentos sólidos',
    icon: DollarSign,
    color: 'bg-green-500'
  },
  'dividends': {
    name: 'Dividendos',
    description: 'Ações com alto rendimento em dividendos',
    icon: PieChart,
    color: 'bg-purple-500'
  },
  'growth': {
    name: 'Growth Investing',
    description: 'Empresas com alto potencial de crescimento',
    icon: TrendingUp,
    color: 'bg-orange-500'
  },
  'small-caps': {
    name: 'Small Caps',
    description: 'Empresas menores com potencial de valorização',
    icon: Zap,
    color: 'bg-pink-500'
  }
};

const Index = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const filteredStocks = useMemo(() => {
    if (!selectedStrategy) return [];

    let filtered = [...stocksData];
    
    switch (selectedStrategy) {
      case 'dividends':
        filtered = filtered
          .filter(stock => stock.dividendYield && stock.dividendYield > 5)
          .sort((a, b) => (b.dividendYield || 0) - (a.dividendYield || 0));
        break;
      case 'value':
        filtered = filtered
          .filter(stock => stock.pe && stock.pe < 15 && stock.pvp && stock.pvp < 2)
          .sort((a, b) => (a.pe || 0) - (b.pe || 0));
        break;
      case 'growth':
        filtered = filtered
          .filter(stock => stock.roe && stock.roe > 15)
          .sort((a, b) => (b.roe || 0) - (a.roe || 0));
        break;
      case 'small-caps':
        filtered = filtered
          .filter(stock => stock.marketCap < 100000000000)
          .sort((a, b) => b.changePercent - a.changePercent);
        break;
      default:
        filtered = filtered.sort((a, b) => b.score - a.score);
    }
    
    return filtered.slice(0, 6);
  }, [selectedStrategy]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatMarketCap = (value: number) => {
    const billions = value / 1000000000;
    return `R$ ${billions.toFixed(1)}B`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="gradient-finance text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-float">
            <BarChart3 className="w-16 h-16 mx-auto mb-6 text-white/90" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Seletor de Ações BOVESPA
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Descubra as melhores oportunidades de investimento baseadas na sua estratégia preferida
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        {/* Strategy Selection */}
        <Card className="mb-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Escolha sua Estratégia de Investimento
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Selecione o método que melhor se alinha com seus objetivos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {Object.entries(strategies).map(([key, strategy]) => {
                const IconComponent = strategy.icon;
                return (
                  <Button
                    key={key}
                    variant={selectedStrategy === key ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center gap-3 transition-all duration-300 hover:scale-105 ${
                      selectedStrategy === key 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                        : 'hover:bg-blue-50 border-2 hover:border-blue-200'
                    }`}
                    onClick={() => {
                      setSelectedStrategy(key);
                      handleAnalyze();
                    }}
                  >
                    <IconComponent className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-semibold text-sm">{strategy.name}</div>
                      <div className="text-xs opacity-80 mt-1">{strategy.description}</div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {selectedStrategy && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Recomendações para {strategies[selectedStrategy as keyof typeof strategies].name}
              </h2>
              {isAnalyzing && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Analisando...</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStocks.map((stock, index) => (
                <Card 
                  key={stock.symbol} 
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-bold text-gray-800">
                          {stock.symbol}
                        </CardTitle>
                        <CardDescription className="text-sm font-medium text-gray-600">
                          {stock.name}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0"
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="w-fit text-xs">
                      {stock.sector}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-800">
                        {formatCurrency(stock.price)}
                      </span>
                      <div className={`flex items-center gap-1 ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? 
                          <TrendingUp className="w-4 h-4" /> : 
                          <TrendingDown className="w-4 h-4" />
                        }
                        <span className="font-semibold">
                          {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <div className="text-gray-500 text-xs">Market Cap</div>
                        <div className="font-semibold text-gray-800">
                          {formatMarketCap(stock.marketCap)}
                        </div>
                      </div>
                      
                      {stock.dividendYield && (
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <div className="text-gray-500 text-xs">Div. Yield</div>
                          <div className="font-semibold text-green-600">
                            {stock.dividendYield.toFixed(1)}%
                          </div>
                        </div>
                      )}
                      
                      {stock.pe && (
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <div className="text-gray-500 text-xs">P/L</div>
                          <div className="font-semibold text-gray-800">
                            {stock.pe.toFixed(1)}x
                          </div>
                        </div>
                      )}
                      
                      {stock.roe && (
                        <div className="bg-gray-50 p-2 rounded-lg">
                          <div className="text-gray-500 text-xs">ROE</div>
                          <div className="font-semibold text-blue-600">
                            {stock.roe.toFixed(1)}%
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Score de Recomendação</span>
                        <span className="text-sm font-bold text-blue-600">
                          {stock.score.toFixed(1)}/10
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${stock.score * 10}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-2 italic">
                        {stock.reason}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!selectedStrategy && (
          <div className="text-center py-16">
            <div className="animate-pulse-slow">
              <PieChart className="w-24 h-24 mx-auto text-gray-400 mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              Selecione uma Estratégia
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Escolha uma das estratégias acima para ver as melhores recomendações de ações da BOVESPA
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 Seletor de Ações BOVESPA. Dados simulados para fins demonstrativos.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            ⚠️ Este não é um conselho de investimento. Sempre consulte um profissional qualificado.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
