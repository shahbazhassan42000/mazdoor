import { PaymentMethod, MobileAccount } from "@/models/enums";
import { Labor } from "./labor.interface";

export interface Admin extends Labor {
  cvv: string;
  state: string;
  linkedin: string;
  cardName: string;
  cardExpiry: string;
  cardNumber: string;
  mobAccName: MobileAccount;
  mobAccNumber: string;
  paymentMethod: PaymentMethod;
}
