use anchor_lang::prelude::*;
use anchor_spl::token::{TokenAccount, Token};
use crate::state::nft::NFTData;
use crate::error::ErrorCode;

#[derive(Accounts)]
pub struct BuyNFT<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,
    
    #[account(
        mut,
        constraint = buyer_token_account.owner == buyer.key(),
        constraint = buyer_token_account.mint == nft.mint
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        address = nft.owner
    )]
    /// CHECK: We're just transferring SOL to this account
    pub seller: AccountInfo<'info>,
    
    #[account(
        mut,
        seeds = [b"nft", nft.mint.as_ref()],
        bump
    )]
    pub nft: Account<'info, NFTData>,
    
    #[account(
        mut,
        seeds = [b"escrow", nft.mint.as_ref()],
        bump
    )]
    pub escrow_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn buy_nft(ctx: Context<BuyNFT>) -> Result<()> {
    let nft = &mut ctx.accounts.nft;
    
    // Check if NFT is listed
    if !nft.is_listed {
        return Err(ErrorCode::NotListed.into());
    }

    // Transfer SOL from buyer to seller
    let price = nft.price;
    let cpi_context = CpiContext::new(
        ctx.accounts.system_program.to_account_info(),
        anchor_lang::system_program::Transfer {
            from: ctx.accounts.buyer.to_account_info(),
            to: ctx.accounts.seller.to_account_info(),
        },
    );
    anchor_lang::system_program::transfer(cpi_context, price)?;

    // Transfer NFT from escrow to buyer
    let escrow_bump = *ctx.bumps.get("escrow_token_account").unwrap();
    let escrow_seeds = &[
        b"escrow",
        nft.mint.as_ref(),
        &[escrow_bump],
    ];
    let signer = &[&escrow_seeds[..]];

    let cpi_accounts = anchor_spl::token::Transfer {
        from: ctx.accounts.escrow_token_account.to_account_info(),
        to: ctx.accounts.buyer_token_account.to_account_info(),
        authority: ctx.accounts.escrow_token_account.to_account_info(),
    };
    
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    
    anchor_spl::token::transfer(cpi_ctx, 1)?;

    // Update NFT ownership and listing status
    nft.owner = ctx.accounts.buyer.key();
    nft.is_listed = false;
    nft.price = 0;

    Ok(())
}
