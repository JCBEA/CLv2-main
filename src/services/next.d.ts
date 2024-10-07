// types/next.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
  export interface NextApiRequest {
    user?: {
      id: string;
      username: string;
    };
  }
}
