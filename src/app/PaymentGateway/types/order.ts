export type Order = {
    payment_uri: string;
    identifier: string;
    web_url: string;
    address: string;
    tag_memo: string;
    input_currency: string;
    expected_input_amount: number;
    rate: number;
    notes: string | null;
    reference: string | null;
    fiat: string;
    language: string;
};
  