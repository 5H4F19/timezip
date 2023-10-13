export interface CardProps {
  title: string;
  image: any;
  onPress: () => void;
}

export enum Coins {
  steller = 'Steller',
  qpq = 'Quid Pro Quo',
}
