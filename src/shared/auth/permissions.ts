import type { UserSummary } from "../types/user";

export const canAssignAsset = (role: UserSummary["role"]) =>
  ["ADMIN", "MANAGERS"].includes(role);

export const canDisposeAsset = (role: UserSummary["role"]) =>
  ["ADMIN", "FINANCE"].includes(role);

export const canTransferAsset = (role: UserSummary["role"]) =>
  ["ADMIN", "FINANCE", "MANAGERS"].includes(role);

export const canEditAsset = (role: UserSummary["role"]) =>
  ["ADMIN", "FINANCE"].includes(role);
