const isConnected = (p: string) => {
  return p.startsWith("nullvalue") ? "Not Connected" : p;
};

export default isConnected
