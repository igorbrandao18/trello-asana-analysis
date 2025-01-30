export const env = {
  trello: {
    key: process.env.NEXT_PUBLIC_TRELLO_KEY!,
    token: process.env.NEXT_PUBLIC_TRELLO_TOKEN!,
  },
  asana: {
    token: process.env.NEXT_PUBLIC_ASANA_TOKEN!,
  },
} as const; 