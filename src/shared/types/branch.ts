export type BranchResponse = {
  id: string;
  name: string;
  code: string;
  state: string;
  address: string;
  location?: string;
};

export type BranchCreateRequest = {
  name: string;
  code: string;
  state: string;
  location?: string;
  address: string;
};
