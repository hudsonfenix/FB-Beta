
export type Freight = {
  id: number;
  code: string;
  company: {
    name: string;
    logoUrl: string;
    activeSince: string;
    reviews: {
      count: number;
      since: string;
      comments: { author: string; text: string; rating: number }[];
    };
  };
  origin: string;
  destination: string;
  vehicle: string;
  price: string;
  isVip: boolean;
  postedAt: Date;
  details: {
    bodywork: string;
    species: string;
    product: string;
    loadType: string;
    weight: string;
    needsTarp: boolean;
    toll: boolean;
    downPayment: string;
    tracking: boolean;
    agency: boolean;
    km: number;
    addedAt: string;
    paymentMethods: string;
    observations: string;
  }
};

export const freights: Freight[] = [
  {
    id: 1,
    code: '#PAMT-A6BA',
    company: {
      name: 'RODOVITA TRANSPORTES',
      logoUrl: 'https://placehold.co/120x40.png',
      activeSince: '2 anos e 9 meses',
      reviews: {
        count: 2,
        since: '23/02/2024',
        comments: [
            { author: 'Carlos S.', text: 'Pagamento em dia, tudo certo.', rating: 5 },
            { author: 'Mariana L.', text: 'A carga estava pronta no horário combinado.', rating: 4 },
        ]
      }
    },
    origin: 'Barcarena/PA',
    destination: 'Confresa/MT',
    vehicle: 'Carreta, Carreta LS, Vanderléia, Bitrem, Rodotrem',
    price: 'R$ 210,00 P/ TON C/ PED',
    isVip: true,
    postedAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    details: {
      bodywork: 'Graneleiro',
      species: 'Big Bag',
      product: 'FERTILIZANTE',
      loadType: 'COMPLETA',
      weight: '250 toneladas',
      needsTarp: true,
      toll: true,
      downPayment: '80%',
      tracking: false,
      agency: false,
      km: 1266,
      addedAt: '26 min',
      paymentMethods: 'PIX',
      observations: 'Fazenda Ouro Fino do Xingu / Santa Cruz do Xingu MT Roteiro: 26 KM antes de chegar na cidade Santa Cruz do Xingu/MT entra a direita +50 KM até na sede. CHAMA NO WHATSAPP - MANDO LOCALIZAÇÃO.',
    }
  },
  {
    id: 2,
    code: '#PRRS-B7CD',
    company: {
      name: 'TRANSPORTES SUL',
      logoUrl: 'https://placehold.co/120x40.png',
      activeSince: '1 ano e 2 meses',
      reviews: {
        count: 5,
        since: '15/01/2024',
        comments: [
            { author: 'João P.', text: 'Empresa séria.', rating: 5 },
        ]
      }
    },
    origin: 'Curitiba, PR',
    destination: 'Porto Alegre, RS',
    vehicle: 'Truck',
    price: 'R$ 1.800,00',
    isVip: false,
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    details: {
      bodywork: 'Baú',
      species: 'Paletizado',
      product: 'ELETRÔNICOS',
      loadType: 'COMPLETA',
      weight: '14 toneladas',
      needsTarp: false,
      toll: false,
      downPayment: '50%',
      tracking: true,
      agency: false,
      km: 710,
      addedAt: '1 hora',
      paymentMethods: 'Boleto',
      observations: 'Coleta na filial de Curitiba. Entrega no centro de distribuição de Porto Alegre.',
    }
  },
  {
    id: 3,
    code: '#MGBA-C8DE',
    company: {
      name: 'MINAS BAHIA LOG',
      logoUrl: 'https://placehold.co/120x40.png',
      activeSince: '5 anos',
      reviews: {
        count: 12,
        since: '10/06/2023',
        comments: [
            { author: 'Ana R.', text: 'Sempre tem carga boa.', rating: 5 },
            { author: 'Pedro H.', text: 'Bom de negociar.', rating: 4 },
        ]
      }
    },
    origin: 'Belo Horizonte, MG',
    destination: 'Salvador, BA',
    vehicle: 'Bitrem',
    price: 'R$ 4.200,00',
    isVip: true,
    postedAt: new Date(Date.now() - 90 * 60 * 1000), // 90 minutes ago (unlocked)
    details: {
      bodywork: 'Graneleiro',
      species: 'Saca',
      product: 'CAFÉ',
      loadType: 'COMPLETA',
      weight: '35 toneladas',
      needsTarp: true,
      toll: true,
      downPayment: '70%',
      tracking: true,
      agency: true,
      km: 1380,
      addedAt: '3 horas',
      paymentMethods: 'PIX, Boleto',
      observations: 'Carga com seguro. Necessário agendamento para descarga.',
    }
  },
  {
    id: 4,
    code: '#GODF-D9EF',
    company: {
      name: 'CENTRAL CARGAS',
      logoUrl: 'https://placehold.co/120x40.png',
      activeSince: '3 anos',
      reviews: {
        count: 8,
        since: '01/01/2023',
        comments: []
      }
    },
    origin: 'Goiânia, GO',
    destination: 'Brasília, DF',
    vehicle: 'Toco',
    price: 'R$ 800,00',
    isVip: false,
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    details: {
      bodywork: 'Sider',
      species: 'Caixas',
      product: 'MERCADORIA DIVERSA',
      loadType: 'FRACIONADA',
      weight: '5 toneladas',
      needsTarp: false,
      toll: false,
      downPayment: '100% na entrega',
      tracking: false,
      agency: false,
      km: 209,
      addedAt: '5 horas',
      paymentMethods: 'Dinheiro',
      observations: 'Entrega em 3 pontos diferentes em Brasília.'
    }
  },
  {
    id: 5,
    code: '#PECE-E1FG',
    company: {
      name: 'NORDESTE LOGÍSTICA',
      logoUrl: 'https://placehold.co/120x40.png',
      activeSince: '4 anos',
      reviews: {
        count: 15,
        since: '01/01/2023',
        comments: []
      }
    },
    origin: 'Recife, PE',
    destination: 'Fortaleza, CE',
    vehicle: 'Carreta LS',
    price: 'R$ 3.100,00',
    isVip: false,
    postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    details: {
      bodywork: 'Baú Frigorifico',
      species: 'Congelados',
      product: 'ALIMENTOS',
      loadType: 'COMPLETA',
      weight: '24 toneladas',
      needsTarp: false,
      toll: true,
      downPayment: '60%',
      tracking: true,
      agency: false,
      km: 800,
      addedAt: '1 dia',
      paymentMethods: 'Boleto',
      observations: 'Manter temperatura em -18°C.'
    }
  },
  {
    id: 6,
    code: '#AMPA-F2GH',
    company: {
      name: 'AMAZON TRANSPORTES',
      logoUrl: 'https://placehold.co/120x40.png',
      activeSince: '2 anos',
      reviews: {
        count: 4,
        since: '01/01/2023',
        comments: []
      }
    },
    origin: 'Manaus, AM',
    destination: 'Belém, PA',
    vehicle: 'Vanderleia',
    price: 'R$ 5.500,00',
    isVip: true,
    postedAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    details: {
      bodywork: 'Plataforma',
      species: 'Container',
      product: 'DIVERSOS',
      loadType: 'COMPLETA',
      weight: '28 toneladas',
      needsTarp: false,
      toll: true,
      downPayment: '50%',
      tracking: true,
      agency: true,
      km: 2100,
      addedAt: '2 dias',
      paymentMethods: 'PIX',
      observations: 'Transporte intermodal (rodoviário e fluvial). Inclui custo de balsa.'
    }
  },
];
