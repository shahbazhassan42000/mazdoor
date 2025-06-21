import { ENUMS } from "@/models";

export interface Labor {
  id: string;
  age: number;
  name: string;
  city: string;
  role: ENUMS.Role;
  CNIC: string;
  type: string;
  area: string;
  image: string;
  email: string;
  phone: string;
  rating: number;
  status: ENUMS.Status;
  country: string;
  province: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  startingWage: number;
  profileCompleted: boolean;
}
