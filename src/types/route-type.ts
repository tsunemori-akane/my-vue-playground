import { defineComponent } from "vue";
import type { RouteRecordRaw, RouteMeta } from "vue-router";

type Recordable<T = any> = Record<string, T>;
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import("vue")>)
  | (() => Promise<T>);

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  name: string;
  meta: RouteMeta;
  redirect: string;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
  hideMenu?: boolean;
}

export interface Menu {
  name: string;
  icon?: string;
  path: string;
  disabled?: boolean;
  children?: Menu[];
  // roles?: RoleEnum[];
  meta?: Partial<RouteMeta>;
  // tag?: MenuTag;
  hideMenu?: boolean;
}
