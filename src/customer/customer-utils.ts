import { Customer } from "./models/customer.ts";

export function serializeCustomer(customer: Customer): string {
  return Object.values(customer.properties).join(" ");
}
