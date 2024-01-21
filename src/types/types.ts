export enum ActiveType {
  NONE = "NONE",
  FOUNDER = "FOUNDER",
  INVESTOR = "INVESTOR",
}

export type MetadataType = {
  active: ActiveType;
  investor: boolean;
  founder: boolean;
};
