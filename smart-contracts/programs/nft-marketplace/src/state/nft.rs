use anchor_lang::prelude::*;

#[account]
pub struct NFTData {
    pub owner: Pubkey,
    pub mint: Pubkey,
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
    pub is_listed: bool,
    pub price: u64,
    pub creator: Pubkey,
}
