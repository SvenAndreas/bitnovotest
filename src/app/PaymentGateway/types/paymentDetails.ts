export type Transaction = {
    confirmed: boolean;
    currency: string;
    amount: number;
    tx_hash: string;
    block: number;
    created_at: string;
  }


enum Status {
    NR = "NR",
    PE = "PE",
    AC = "AC",
    IA = "IA",
    CO = "CO", 
    CA = "CA",
    EX = "EX", 
    OC = "OC",
    RF = "RF",
    FA = "FA",
    DE = "DE",
    CM = "CM", 
  }

  
 export type PaymentDetails = {
    identifier: string;
    reference: string | null;
    created_at: string;
    edited_at: string;
    status: Status;
    fiat_amount: number;
    crypto_amount: number;
    unconfirmed_amount: number;
    confirmed_amount: number;
    currency_id: string;
    merchant_device_id: number;
    merchant_device: string;
    address: string;
    tag_memo: string;
    url_ko: string | null;
    url_ok: string | null;
    url_standby: string | null;
    expired_time: string;
    good_fee: boolean;
    notes: string | null;
    rbf: boolean;
    safe: boolean;
    fiat: string;
    language: string;
    percentage: number;
    received_amount: number;
    balance_based: string;
    internal_data: string | null;
    transactions: Transaction[];
  }
  