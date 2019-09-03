const MAP: any = {
  0x8b30: 'frag',
  0x8b31: 'vert'
};

export default (glType: number): string => {
  return MAP[glType] || '';
};
