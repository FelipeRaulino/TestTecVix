export const formatToIOptionMPS = (
  msps: {
    idBrandMaster: number;
    brandName: string;
    deletedAt?: Date | string | null;
  }[],
) => {
  return msps.map((msp) => ({
    id: msp.idBrandMaster,
    value: msp.idBrandMaster,
    label: msp.brandName,
    deletedAt: msp.deletedAt,
  }));
};

export const formatToIOptionVMs = (vms: { idVM: number; vmName: string }[]) => {
  return vms.map((vm) => ({
    id: vm.idVM,
    value: vm.idVM,
    label: vm.vmName,
  }));
};
