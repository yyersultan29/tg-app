import type { MenuEntity } from "../../menu/entities";

export interface CartEntity extends MenuEntity {
  quantity: number;
}
