use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Token};
use crate::state::nft::NFTData;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct ListNFT<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        mut,
        seeds = [b"nft", nft.mint.as_ref()],
        bump
    )]
    pub nft: Account<'info, NFTData>,
    
    #[account(
        mut,
        constraint = token_account.owner == owner.key(),
        constraint = token_account.mint == nft.mint
    )]
    pub token_account: Account<'info, TokenAccount>,
    
    #[account(
        init_if_needed,
        payer = owner,
        token::mint = nft.mint,
        token::authority = escrow_token_account,
        seeds = [b"escrow", nft.mint.as_ref()],
        bump
    )]
    pub escrow_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn list_nft(ctx: Context<ListNFT>, price: u64) -> Result<()> {
    // Check owner
    let nft = &mut ctx.accounts.nft;
    if nft.owner != ctx.accounts.owner.key() {
        return Err(ErrorCode::NotOwner.into());
    }

    // Check if token account has the NFT
    let token_account = &ctx.accounts.token_account;
    if token_account.amount != 1 {
        return Err(ErrorCode::InvalidTokenAccount.into());
    }

    // Update NFT listing status
    nft.is_listed = true;
    nft.price = price;

    // Lock the NFT in the escrow
    let cpi_accounts = anchor_spl::token::Transfer {
        from: ctx.accounts.token_account.to_account_info(),
        to: ctx.accounts.escrow_token_account.to_account_info(),
        authority: ctx.accounts.owner.to_account_info(),
    };
    
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    anchor_spl::token::transfer(cpi_ctx, 1)?;

    Ok(())
}
