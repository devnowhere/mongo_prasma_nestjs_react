use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Token, Mint};
use std::mem::size_of;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod nft_marketplace {
    use super::*;

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

        // Transfer ownership of mint to program
        token::mint_to(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::MintTo {
                    mint: ctx.accounts.mint.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    authority: ctx.accounts.owner.to_account_info(),
                },
            ),
            1,
        )?;

        Ok(())
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
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.token_account.to_account_info(),
                    to: ctx.accounts.escrow_token_account.to_account_info(),
                    authority: ctx.accounts.owner.to_account_info(),
                },
            ),
            1,
        )?;

        Ok(())
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

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.escrow_token_account.to_account_info(),
                    to: ctx.accounts.buyer_token_account.to_account_info(),
                    authority: ctx.accounts.escrow_token_account.to_account_info(),
                },
                signer,
            ),
            1,
        )?;

        // Update NFT ownership and listing status
        nft.owner = ctx.accounts.buyer.key();
        nft.is_listed = false;
        nft.price = 0;

        Ok(())
    }
}

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

#[error_code]
pub enum ErrorCode {
    #[msg("Not the owner of this NFT")]
    NotOwner,
    #[msg("NFT is not listed for sale")]
    NotListed,
    #[msg("Invalid token account")]
    InvalidTokenAccount,
}
