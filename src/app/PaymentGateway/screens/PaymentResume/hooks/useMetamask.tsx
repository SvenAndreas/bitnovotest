import { useEffect, useState } from "react";

interface ExtendedWindow {
  ethereum: any;
}
declare global {
  interface Window extends ExtendedWindow {}
}

const useMetamask = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] =
    useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        });
      window.ethereum
        .request({ method: "eth_chainId" })
        .then((chainId: string) => {
          setNetwork(chainId);
        });
    }
  }, []);

  const connectMetamask = async () => {
    if (isMetaMaskInstalled) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });
        setNetwork(chainId);

        if (chainId !== "0xaa36a7") {
          await switchToSepolia();
        }
        return true
      } catch (error) {
        console.error("Error al conectar con MetaMask:", error);
        alert("Error al conectar con MetaMask. Verifica que esté instalada.");
      }
    } else {
      alert("MetaMask no está instalada. Por favor, instala MetaMask.");
      window.open("https://metamask.io/download.html", "_blank");
    }
  };

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xAA36A7" }],
      });
      console.log("Red cambiada a Sepolia");
      alert("Cambio exitoso a Sepolia.");
    } catch (error: any) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xAA36A7",
              chainName: "Ethereum Sepolia",
              nativeCurrency: {
                name: "SepoliaETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.sepolia.org"],
              blockExplorerUrls: ["https://sepolia.etherscan.io"],
            },
          ],
        });
      } else {
        console.error("Error al cambiar a Sepolia:", error);
        alert("No se pudo cambiar a la red Sepolia.");
      }
    }
  };

  const sendTransaction = async (recipient: string, amount: number) => {
    if (!account) {
      console.error("Cuenta no encontrada");
      return;
    }

    try {
      const amountInWei = BigInt(Math.floor(amount) * 1e18);

      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: account,
            to: recipient,
            value: `0x${amountInWei.toString(16)}`,
          },
        ],
      });
      return tx;
    } catch (error) {
      console.error("Error al enviar la transacción:", error);
    }
  };

  return {
    account,
    network,
    isMetaMaskInstalled,
    connectMetamask,
    switchToSepolia,
    sendTransaction,
  };
};

export default useMetamask;
