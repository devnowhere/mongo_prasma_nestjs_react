use anchor_lang::prelude::*;

#[account]
pub struct Marketplace {
    pub authority: Pubkey,
    pub fee_account: Pubkey,
    pub fee_basis_points: u16,
    pub treasury_mint: Pubkey,
    pub bump: u8,
}
