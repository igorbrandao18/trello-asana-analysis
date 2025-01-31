const getEnvVar = (key: string): string => {
  const value = process.env[key];
  
  if (!value) {
    // Em desenvolvimento, use os valores do .env.local
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Environment variable ${key} is not defined, using development values`);
      switch (key) {
        case 'NEXT_PUBLIC_TRELLO_KEY':
          return '4267f89076c3cb6a0f2fcff634da78db';
        case 'NEXT_PUBLIC_TRELLO_TOKEN':
          return 'ATTAff9c5af13e210fe3c8c2094b9e92849e64a793589c128a272f80c6ad27f74e71053A7D1F';
        case 'NEXT_PUBLIC_ASANA_TOKEN':
          return '2/1209276646303170/1209276648243936:2bcc06e3e5027219f44c97801f598312';
        default:
          return 'development-value';
      }
    }
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  trello: {
    key: '4267f89076c3cb6a0f2fcff634da78db',
    token: 'ATTAff9c5af13e210fe3c8c2094b9e92849e64a793589c128a272f80c6ad27f74e71053A7D1F',
    apiUrl: 'https://api.trello.com/1',
  },
  asana: {
    token: '2/1209276646303170/1209276648243936:2bcc06e3e5027219f44c97801f598312',
    apiUrl: 'https://app.asana.com/api/1.0',
  },
} as const;

export type Env = typeof env; 