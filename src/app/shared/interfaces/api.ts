export interface ApiStatus {
  status: 'idle' | 'pending' | 'ready' | 'fail';
  message: string;
}
