use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Not the owner of this NFT")]
    NotOwner,
    #[msg("NFT is not listed for sale")]
    NotListed,
    #[msg("Invalid token account")]
    InvalidTokenAccount,
}
