export interface Transaction {
  signature: string;
  blockTime: number;
  slot: number;
  fee: number;
  status: 'confirmed' | 'failed';
}
