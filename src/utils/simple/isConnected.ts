const isConnected = (p: string) => {
  return p.startsWith("nullvalue") ? "Not Connected" : p.split("-name")[1];
};

export default isConnected
