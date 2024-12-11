export interface IProduct {
  id: number;
  imageURL: string;
  name: string;
  type: IType;
  price: number;
  currency: ICurrency;
  color: string;
  gender: IGender;
  quantity: number;
}

export enum ICurrency {
  Inr = "INR",
}

export enum IGender {
  Men = "Men",
  Women = "Women",
}

export enum IType {
  Basic = "Basic",
  Hoodie = "Hoodie",
  Polo = "Polo",
}

export interface IFilters {
  gender: string[];
  color: string[];
  price: string[];
  type: string[];
}
