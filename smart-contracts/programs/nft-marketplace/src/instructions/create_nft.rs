use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Token, Mint};
use crate::state::nft::NFTData;
use std::mem::size_of;

#[derive(Accounts)]
pub struct CreateNFT<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    
    #[account(
        init,
        payer = owner,
        space = 8 + size_of::<NFTData>(),
        seeds = [b"nft", mint.key().as_ref()],
        bump
    )]
    pub nft: Account<'info, NFTData>,
    
    pub mint: Account<'info, Mint>,
    
    #[account(
        mut,
        constraint = token_account.owner == owner.key(),
        constraint = token_account.mint == mint.key()
    )]
    pub token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn create_nft(
    ctx: Context<CreateNFT>,
    name: String,
    symbol: String,
    uri: String,
    seller_fee_basis_points: u16,
) -> Result<()> {
    // Initialize NFT data
    let nft = &mut ctx.accounts.nft;
    nft.owner = ctx.accounts.owner.key();
    nft.mint = ctx.accounts.mint.key();
    nft.name = name;
    nft.symbol = symbol;
    nft.uri = uri;
    nft.seller_fee_basis_points = seller_fee_basis_points;
    nft.is_listed = false;
    nft.price = 0;
    nft.creator = ctx.accounts.owner.key();

    // Mint the NFT token to owner
    let cpi_accounts = anchor_spl::token::MintTo {
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.token_account.to_account_info(),
        authority: ctx.accounts.owner.to_account_info(),
    };
    
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    anchor_spl::token::mint_to(cpi_ctx, 1)?;

    Ok(())
}
