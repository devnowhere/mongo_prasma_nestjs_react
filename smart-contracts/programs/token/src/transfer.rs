use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

pub fn transfer(ctx: Context<TransferToken>, amount: u64) -> Result<()> {
    let cpi_accounts = token::Transfer {
        from: ctx.accounts.from.to_account_info(),
        to: ctx.accounts.to.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };
    
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    
    token::transfer(cpi_ctx, amount)?;
    
    Ok(())
}

#[derive(Accounts)]
pub struct TransferToken<'info> {
    #[account(
        mut,
        constraint = from.owner == authority.key()
    )]
    pub from: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = to.mint == from.mint
    )]
    pub to: Account<'info, TokenAccount>,
    
    pub authority: Signer<'info>,
    pub token_program: Program<'info, Token>,
}
